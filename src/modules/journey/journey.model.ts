import { HydratedDocument, Model, Schema, model } from 'mongoose'
import { JourneyData } from '@/modules/journey/journey.types'

export interface JourneyMongo extends JourneyData {
  createdAt: Date
  updatedAt: Date
}

export type JourneyDocument = HydratedDocument<JourneyMongo>
export type JourneyModelType = Model<JourneyMongo>

const journeySchema = new Schema<JourneyMongo>(
  {
    idClient: { type: Number, default: null, index: true },
    referenceDate: { type: String, default: null },
    register: { type: Number, default: null, index: true },
    driverName: { type: String, default: null },
    vehiclePlate: { type: String, default: null, index: true },
    fleet: { type: String, default: null },
    restIntervalSeconds: { type: Number, default: null },
    startDateTime: { type: Date, default: null, index: true },
    endDateTime: { type: Date, default: null },
    totalTimeSeconds: { type: Number, default: null },
    totalDrivingTimeSeconds: { type: Number, default: null },
    maxContinuousDrivingTimeSeconds: { type: Number, default: null },
    stoppedTimeSeconds: { type: Number, default: null },
    mealTimeSeconds: { type: Number, default: null },
    status: {
      type: String,
      enum: ['OPEN', 'FINISHED'],
      required: true,
      index: true
    },
    source: {
      type: String,
      enum: ['SIGHRA_OPEN', 'SIGHRA_FINISHED'],
      required: true
    },
    rawData: { type: Schema.Types.Mixed, default: null }
  },
  {
    collection: 'Journey',
    timestamps: true,
    versionKey: false
  }
)

journeySchema.index(
  { register: 1, startDateTime: 1 },
  {
    unique: true,
    partialFilterExpression: {
      register: { $type: 'number' },
      startDateTime: { $type: 'date' }
    }
  }
)

export const JourneyModel = model<JourneyMongo, JourneyModelType>('Journey', journeySchema)
