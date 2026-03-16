import cron from 'node-cron'
import { env } from '@/config/env'
import { JourneyService } from '@/modules/journey/journey.service'

export function startJourneySyncJob(): void {
  const journeyService = new JourneyService()

  const runSync = async () => {
    try {
      console.log('[job] Journey sync started')
      const result = await journeyService.syncAllJourneys()
      console.log('[job] Journey sync finished', result)
    } catch (error) {
      console.error('[job] Journey sync failed', error)
    }
  }

  // executa imediatamente ao subir o serviço
  runSync()

  // agenda execução a cada 4 horas
  cron.schedule(env.syncCron, runSync)

  console.log(`[job] Journey sync scheduled with cron: ${env.syncCron}`)
}