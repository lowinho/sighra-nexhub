export interface SimulatedDriver {
  register:    number
  name:        string
  plate:       string
  idClient:    number
}

export interface SimulatedJourneyState {
  register:               number
  startDateTime:          string  // "DD/MM/YYYY HH:mm:ss"
  endDateTime:            string | null
  status:                 'OPEN' | 'FINISHED'
  idClient:               number
  // Duração planejada — usada para calcular o endDateTime no fechamento
  plannedDurationSeconds?: number
  // Tempos serializados como campos planos para evitar problemas de cast
  t_total?:    number
  t_driving?:  number
  t_cont?:     number
  t_stopped?:  number
  t_meal?:     number
  t_interval?: number
}

export interface SimulationState {
  // Ponteiro de tempo simulado — avança a cada tick
  simulatedNow:     string // ISO string
  // Jornadas que estão abertas no momento simulado
  openJourneys:     SimulatedJourneyState[]
  // Jornadas finalizadas no ciclo atual
  finishedJourneys: SimulatedJourneyState[]
  // Tick counter — quantas vezes o serviço foi chamado
  tick:             number
}