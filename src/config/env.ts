import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT || 7000),
  nodeEnv: process.env.NODE_ENV || 'development',
  // syncCron: process.env.SYNC_CRON || '0 */4 * * *',
  syncCron: process.env.SYNC_CRON || '*/2 * * * *',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/api_project',
  mongoUser: process.env.MONGO_USER || 'root',
  mongoPassword: process.env.MONGO_PASSWORD || 'rootpassword',
  mongoDb: process.env.MONGO_DB || 'api_project'
}
