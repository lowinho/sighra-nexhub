// simulation.state-manager.ts
import fs   from 'fs/promises'
import path from 'path'
import { SimulationState, SimulatedJourneyState } from './simulation.types'
import {
  DRIVERS, fmtBR, fullDatePtBR,
  generateJourneyTimes, JourneyTimes, randomProfile,
  randInt, pickRandom,
} from './simulation.helpers'
import { SighraJourneyPayload } from '@/integrations/sighra/sighra.types'

const OPEN_SLOTS       = 50
const FINISHED_HISTORY = 100
const MAX_START_OFFSET_MS = Math.min(6 * 60 * 60 * 1000, 23 * 60 * 60 * 1000)
const MAX_ELAPSED_SECONDS = 24 * 60 * 60 // 86400s

const STATE_FILE = path.resolve(process.cwd(), 'simulation', 'simulation_state.json')

export class SimulationStateManager {

  // ── I/O ───────────────────────────────────────────────────────────────────

  private async loadState(): Promise<SimulationState> {
    try {
      const raw = await fs.readFile(STATE_FILE, 'utf-8')
      return JSON.parse(raw) as SimulationState
    } catch {
      return this.initialState()
    }
  }

  private async saveState(state: SimulationState): Promise<void> {
    await fs.mkdir(path.dirname(STATE_FILE), { recursive: true })
    await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
  }

  private initialState(): SimulationState {
    return {
      simulatedNow:     new Date().toISOString(),
      openJourneys:     [],
      finishedJourneys: [],
      tick:             0,
    }
  }

  async reset(): Promise<void> {
    await this.saveState(this.initialState())
    console.log('[Simulation] Estado resetado')
  }

  // ── Tick ──────────────────────────────────────────────────────────────────

  async tick(): Promise<{ open: SighraJourneyPayload[]; finished: SighraJourneyPayload[] }> {
    const state = await this.loadState()
    const now   = new Date() // sempre tempo real

    // ── 1. Verifica quais jornadas abertas devem fechar ───────────────────────
    const stillOpen:   SimulatedJourneyState[] = []
    const nowFinished: SimulatedJourneyState[] = []

    for (const j of state.openJourneys) {
      const start    = this.parseBRDate(j.startDateTime)
      const duration = j.plannedDurationSeconds ?? 28800
      const endMs    = start ? start.getTime() + duration * 1000 : Infinity

      if (start && endMs <= now.getTime()) {
        nowFinished.push({
          ...j,
          endDateTime: fmtBR(new Date(endMs)),
          status:      'FINISHED',
        })
      } else {
        stillOpen.push(j)
      }
    }

    // ── 2. Abre novos slots ───────────────────────────────────────────────────
    const busyRegisters = new Set(stillOpen.map((j) => j.register))
    const available     = DRIVERS.filter((d) => !busyRegisters.has(d.register))
    const slotsNeeded   = Math.max(0, OPEN_SLOTS - stillOpen.length)
    const toOpen        = pickRandom(available, Math.min(slotsNeeded, available.length))

    const newOpen: SimulatedJourneyState[] = toOpen.map((driver) => {
      const profile  = randomProfile()
      const times    = generateJourneyTimes(profile)
      const offsetMs = randInt(0, MAX_START_OFFSET_MS)
      const startDt  = new Date(now.getTime() - offsetMs)

      return {
        register:               driver.register,
        startDateTime:          fmtBR(startDt),
        endDateTime:            null,
        status:                 'OPEN' as const,
        idClient:               driver.idClient,
        plannedDurationSeconds: times.totalTimeSeconds,
        t_total:    times.totalTimeSeconds,
        t_driving:  times.totalDrivingTimeSeconds,
        t_cont:     times.maxContinuousDrivingTimeSeconds,
        t_stopped:  times.stoppedTimeSeconds,
        t_meal:     times.mealTimeSeconds,
        t_interval: times.restIntervalSeconds,
      }
    })

    const allOpen: SimulatedJourneyState[] = [...stillOpen, ...newOpen]

    // ── 3. Monta payloads ─────────────────────────────────────────────────────
    const openPayloads     = this.toOpenPayloads(allOpen, now)
    const allFinished      = [...state.finishedJourneys, ...nowFinished]
    const finishedPayloads = this.toFinishedPayloads(allFinished, now)

    // ── 4. Persiste ───────────────────────────────────────────────────────────
    await this.saveState({
      simulatedNow:     now.toISOString(),
      openJourneys:     allOpen,
      finishedJourneys: allFinished.slice(-FINISHED_HISTORY),
      tick:             state.tick + 1,
    })

    console.log(
      `[Simulation] tick=${state.tick + 1} | now=${now.toISOString()} | ` +
      `open=${allOpen.length} | closedThisTick=${nowFinished.length} | finished=${allFinished.length}`
    )

    return { open: openPayloads, finished: finishedPayloads }
  }

  // ── Helpers de tempos ─────────────────────────────────────────────────────

  private readTimes(j: SimulatedJourneyState): JourneyTimes {
    if (
      j.t_total    !== undefined &&
      j.t_driving  !== undefined &&
      j.t_cont     !== undefined &&
      j.t_stopped  !== undefined &&
      j.t_meal     !== undefined &&
      j.t_interval !== undefined
    ) {
      return {
        totalTimeSeconds:                j.t_total,
        totalDrivingTimeSeconds:         j.t_driving,
        maxContinuousDrivingTimeSeconds: j.t_cont,
        stoppedTimeSeconds:              j.t_stopped,
        mealTimeSeconds:                 j.t_meal,
        restIntervalSeconds:             j.t_interval,
      }
    }
    return generateJourneyTimes(randomProfile())
  }

  // ── Payload: abertas ──────────────────────────────────────────────────────

  private toOpenPayloads(
    journeys: SimulatedJourneyState[],
    now: Date,
  ): SighraJourneyPayload[] {
    return journeys.map((j) => {
      const driver = DRIVERS.find((d) => d.register === j.register)!
      const start  = this.parseBRDate(j.startDateTime)
      const times  = this.readTimes(j)

      const elapsedSeconds = start
        ? Math.min(
            Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000)),
            MAX_ELAPSED_SECONDS
          )
        : 0

      const ratio   = Math.min(elapsedSeconds / Math.max(times.totalTimeSeconds, 1), 1)
      const driving = Math.floor(times.totalDrivingTimeSeconds         * ratio)
      const stopped = Math.floor(times.stoppedTimeSeconds              * ratio)
      const meal    = Math.floor(times.mealTimeSeconds                 * ratio)
      const cont    = Math.floor(times.maxContinuousDrivingTimeSeconds * ratio)

      return {
        idCliente:                 j.idClient,
        Data_Referencia:           fullDatePtBR(start ?? now),
        Registro:                  driver.register,
        Motorista:                 driver.name,
        Placa:                     driver.plate,
        Frota:                     null,
        Intersticio:               times.restIntervalSeconds,
        Data_hora_Inicio_Macro:    j.startDateTime,
        Data_hora_Fim_Macro:       undefined,
        Tempo_Total:               elapsedSeconds,
        Tempo_Total_Dirigido:      driving,
        Tempo_Maximo_Direcao_Cont: cont,
        Tempo_Parado:              stopped,
        Refeicao_Tempo:            meal,
      }
    })
  }

  // ── Payload: finalizadas ──────────────────────────────────────────────────

  private toFinishedPayloads(
    journeys: SimulatedJourneyState[],
    now: Date,
  ): SighraJourneyPayload[] {
    return journeys.map((j) => {
      const driver = DRIVERS.find((d) => d.register === j.register)!
      const start  = this.parseBRDate(j.startDateTime)
      const end    = j.endDateTime ? this.parseBRDate(j.endDateTime) : null
      const times  = this.readTimes(j)

      const total = (start && end)
        ? Math.floor((end.getTime() - start.getTime()) / 1000)
        : times.totalTimeSeconds

      return {
        idCliente:                 j.idClient,
        Data_Referencia:           fullDatePtBR(start ?? now),
        Registro:                  driver.register,
        Motorista:                 driver.name,
        Placa:                     driver.plate,
        Frota:                     null,
        Intersticio:               times.restIntervalSeconds,
        Data_hora_Inicio_Macro:    j.startDateTime,
        Data_hora_Fim_Macro:       j.endDateTime ?? undefined,
        Tempo_Total:               total,
        Tempo_Total_Dirigido:      times.totalDrivingTimeSeconds,
        Tempo_Maximo_Direcao_Cont: times.maxContinuousDrivingTimeSeconds,
        Tempo_Parado:              times.stoppedTimeSeconds,
        Refeicao_Tempo:            times.mealTimeSeconds,
      }
    })
  }

  // ── parseBRDate ───────────────────────────────────────────────────────────

  private parseBRDate(value: string): Date | null {
    const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/)
    if (!m) return null
    return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], +m[6]))
  }
}