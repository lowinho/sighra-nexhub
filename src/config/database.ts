import mongoose from 'mongoose'
import { env } from '@/config/env'

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.mongoUri, {
    dbName: env.mongoDb
  })

  console.log('[database] Mongo connected')
}
