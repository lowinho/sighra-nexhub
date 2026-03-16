import { Request, Response } from 'express'
import { JourneyService } from '@/modules/journey/journey.service'

export class JourneyController {
  constructor(private readonly journeyService = new JourneyService()) {}

  health = async (_request: Request, response: Response): Promise<Response> => {
    return response.status(200).json({ status: 'ok' })
  }

  list = async (_request: Request, response: Response): Promise<Response> => {
    const journeys = await this.journeyService.listJourneys()
    return response.status(200).json(journeys)
  }

  sync = async (_request: Request, response: Response): Promise<Response> => {
    try {
      console.log('[sync] Journey sync started')
      const result = await this.journeyService.syncAllJourneys()
      console.log('[sync] Journey sync finished', result)
      return response.status(200).json({ message: 'Sync concluído', result })
    } catch (error) {
      console.error('[sync] Journey sync failed', error)
      return response.status(500).json({ message: 'Erro ao sincronizar jornadas' })
    }
  }
}