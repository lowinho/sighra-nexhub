import { app } from '@/app'
import { env } from '@/config/env'
import { connectDatabase } from '@/config/database'
import { startJourneySyncJob } from './jobs/journey-sync.job'


async function bootstrap(): Promise<void> {
  await connectDatabase()

  // startJourneySyncJob()

 app.listen(env.port, '0.0.0.0', () => {
    console.log(`[server] Running on port ${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error('[server] Fatal error', error)
  process.exit(1)
})