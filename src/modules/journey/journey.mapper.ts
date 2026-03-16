import { SighraJourneyPayload } from '@/integrations/sighra/sighra.types'
import { JourneyData, JourneyStatus } from '@/modules/journey/journey.types'

function toNullableString(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null
  return String(value)
}

function toNullableNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

function parseBrazilianDateTime(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/)
  if (!match) return null

  const [, day, month, year, hour, minute, second] = match
  const utcDate = new Date(Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  ))

  return Number.isNaN(utcDate.getTime()) ? null : utcDate
}

export function mapSighraJourney(payload: SighraJourneyPayload, status: JourneyStatus): JourneyData {
  return {
    idClient: toNullableNumber(payload.idCliente),
    referenceDate: toNullableString(payload.Data_Referencia),
    register: toNullableNumber(payload.Registro),
    driverName: toNullableString(payload.Motorista),
    vehiclePlate: toNullableString(payload.Placa),
    fleet: toNullableString(payload.Frota),
    restIntervalSeconds: toNullableNumber(payload.Intersticio),
    startDateTime: parseBrazilianDateTime(payload.Data_hora_Inicio_Macro),
    endDateTime: parseBrazilianDateTime(payload.Data_hora_Fim_Macro),
    totalTimeSeconds: toNullableNumber(payload.Tempo_Total),
    totalDrivingTimeSeconds: toNullableNumber(payload.Tempo_Total_Dirigido),
    maxContinuousDrivingTimeSeconds: toNullableNumber(payload.Tempo_Maximo_Direcao_Cont),
    stoppedTimeSeconds: toNullableNumber(payload.Tempo_Parado),
    mealTimeSeconds: toNullableNumber(payload.Refeicao_Tempo),
    status,
    source: status === 'OPEN' ? 'SIGHRA_OPEN' : 'SIGHRA_FINISHED',
    rawData: payload ?? null
  }
}
