// mock.sighra-client.ts
import { SighraJourneyPayload }    from '@/integrations/sighra/sighra.types'
import { SimulationStateManager }  from './simulation.state-manager'

export class MockSighraClient {
  private readonly stateManager = new SimulationStateManager()

  // Cache de curtíssima duração — apenas para agrupar o Promise.all paralelo
  private tickCache:          { open: SighraJourneyPayload[]; finished: SighraJourneyPayload[] } | null = null
  private tickCacheTimestamp: number = 0
  private readonly CACHE_TTL_MS = 500 // 500ms — agrupa só chamadas paralelas

  private async getTickData() {
    const now = Date.now()
    if (!this.tickCache || now - this.tickCacheTimestamp > this.CACHE_TTL_MS) {
      this.tickCache          = await this.stateManager.tick()
      this.tickCacheTimestamp = now
    }
    return this.tickCache
  }

  async getOpenJourneys(): Promise<SighraJourneyPayload[]> {
    const { open } = await this.getTickData()
    return open
  }

  async getFinishedJourneys(): Promise<SighraJourneyPayload[]> {
    const { finished } = await this.getTickData()
    return finished
  }

  async reset(): Promise<void> {
    this.tickCache = null
    await this.stateManager.reset()
  }
}