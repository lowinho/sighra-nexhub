import fs from 'fs/promises'
import path from 'path'
import { SighraJourneyPayload } from '@/integrations/sighra/sighra.types'

export class SighraClient {
  private async readMockFile(fileName: string): Promise<SighraJourneyPayload[]> {
    const filePath = path.resolve(process.cwd(), 'mocks', fileName)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(fileContent)

    if (Array.isArray(parsed)) return parsed as SighraJourneyPayload[]
    if (Array.isArray(parsed?.data)) return parsed.data as SighraJourneyPayload[]

    return []
  }

  async getOpenJourneys(): Promise<SighraJourneyPayload[]> {
    return this.readMockFile('mock_jornadas_em_aberto.json')
  }

  async getFinishedJourneys(): Promise<SighraJourneyPayload[]> {
    return this.readMockFile('mock_jornadas_finalizadas.json')
  }
}
