// import { SighraClient } from '@/integrations/sighra/sighra.client'
import { createSighraClient } from '@/simulation/sighra-client.factory'

import { mapSighraJourney } from '@/modules/journey/journey.mapper'
import { JourneyRepository } from '@/modules/journey/journey.repository'


export interface SyncJourneysResult {
  openProcessed: number
  finishedProcessed: number
  totalProcessed: number
}

export class JourneyService {
  constructor(
    // private readonly sighraClient = new SighraClient(),
    private readonly sighraClient = createSighraClient(),
    private readonly journeyRepository = new JourneyRepository()
  ) {}

  async syncOpenJourneys(): Promise<number> {
    const openJourneys = await this.sighraClient.getOpenJourneys()

    for (const journey of openJourneys) {
      const mappedJourney = mapSighraJourney(journey, 'OPEN')
      await this.journeyRepository.upsertJourney(mappedJourney)
    }

    return openJourneys.length
  }

  async syncFinishedJourneys(): Promise<number> {
    const finishedJourneys = await this.sighraClient.getFinishedJourneys()

    for (const journey of finishedJourneys) {
      const mappedJourney = mapSighraJourney(journey, 'FINISHED')
      await this.journeyRepository.upsertJourney(mappedJourney)
    }

    return finishedJourneys.length
  }

  async syncAllJourneys(): Promise<SyncJourneysResult> {
    const [openProcessed, finishedProcessed] = await Promise.all([
      this.syncOpenJourneys(),
      this.syncFinishedJourneys()
    ])

    return {
      openProcessed,
      finishedProcessed,
      totalProcessed: openProcessed + finishedProcessed
    }
  }

  async listJourneys() {
    return this.journeyRepository.findAll()
  }
}
