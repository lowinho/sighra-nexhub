export interface SighraJourneyPayload {
  idCliente?: number | string | null
  Data_Referencia?: string | null
  Registro?: number | string | null
  Motorista?: string | null
  Placa?: string | null
  Frota?: string | null
  Intersticio?: number | string | null
  Data_hora_Inicio_Macro?: string | null
  Data_hora_Fim_Macro?: string | null
  Tempo_Total?: number | string | null
  Tempo_Total_Dirigido?: number | string | null
  Tempo_Maximo_Direcao_Cont?: number | string | null
  Tempo_Parado?: number | string | null
  Refeicao_Tempo?: number | string | null
  [key: string]: unknown
}
