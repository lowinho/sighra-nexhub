import { FilterQuery } from 'mongoose'
import { JourneyModel, JourneyMongo } from '@/modules/journey/journey.model'
import { JourneyData } from '@/modules/journey/journey.types'

export class JourneyRepository {
  async upsertJourney(journey: JourneyData): Promise<void> {
    if (journey.register === null || journey.startDateTime === null) {
      return
    }

    const filter: FilterQuery<JourneyMongo> = {
      register: journey.register,
      startDateTime: journey.startDateTime
    }

    await JourneyModel.updateOne(
      filter,
      {
        $set: journey
      },
      {
        upsert: true
      }
    )
  }

  async findAll(): Promise<JourneyMongo[]> {
    return JourneyModel.find().sort({ startDateTime: -1, createdAt: -1 }).lean()
  }
}
