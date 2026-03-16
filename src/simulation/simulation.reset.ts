// simulation.reset.ts
import 'dotenv/config'
import mongoose               from 'mongoose'
import { SimulationStateManager } from './simulation.state-manager'

async function main() {
  const resetDb = process.argv.includes('--db')

  const manager = new SimulationStateManager()
  await manager.reset()
  console.log('[Reset] simulation_state.json apagado.')

  if (resetDb) {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      console.error('[Reset] MONGODB_URI não definida no .env')
      process.exit(1)
    }

    await mongoose.connect(uri)
    const db = mongoose.connection.db
    if (!db) {
      console.error('[Reset] Conexão com banco falhou.')
      process.exit(1)
    }

    const result = await db.collection('Journey').deleteMany({})
    console.log(`[Reset] ${result.deletedCount} jornadas removidas do banco.`)
    await mongoose.disconnect()
  }

  console.log('[Reset] Concluído.')
}

main().catch((err) => {
  console.error('[Reset] Erro:', err)
  process.exit(1)
})