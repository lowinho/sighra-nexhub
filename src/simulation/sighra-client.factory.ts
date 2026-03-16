// sighra-client.factory.ts
import { SighraClient }     from '@/integrations/sighra/sighra.client'
import { MockSighraClient } from './mock.sighra-client'

export function createSighraClient(): SighraClient | MockSighraClient {
  const useMock = process.env.USE_MOCK === 'true'
  if (useMock) {
    console.log('[Simulation] USE_MOCK=true → usando MockSighraClient')
    return new MockSighraClient()
  }
  return new SighraClient()
}