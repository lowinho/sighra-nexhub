export type JourneyStatus = 'OPEN' | 'FINISHED'

export interface JourneyData {
  idClient: number | null
  referenceDate: string | null
  register: number | null
  driverName: string | null
  vehiclePlate: string | null
  fleet: string | null
  restIntervalSeconds: number | null
  startDateTime: Date | null
  endDateTime: Date | null
  totalTimeSeconds: number | null
  totalDrivingTimeSeconds: number | null
  maxContinuousDrivingTimeSeconds: number | null
  stoppedTimeSeconds: number | null
  mealTimeSeconds: number | null
  status: JourneyStatus
  source: 'SIGHRA_OPEN' | 'SIGHRA_FINISHED'
  rawData: Record<string, unknown> | null
}
