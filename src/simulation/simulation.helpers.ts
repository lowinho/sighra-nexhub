import { SimulatedDriver } from './simulation.types'

// ─── Catálogo fixo de motoristas ──────────────────────────────────────────────
// 60 motoristas distribuídos entre 3 clientes.
// Com OPEN_SLOTS=50 e histórico de 100 finalizadas, cada tick gera ~100 registros.

export const DRIVERS: SimulatedDriver[] = [
  // ── idClient 10100 (20 motoristas) ────────────────────────────────────────
  { register: 63986, name: 'ADELSON NERES DA SILVA',            plate: 'GIG-1883', idClient: 10100 },
  { register: 12939, name: 'ADEMILSON LABES FERREIRA',          plate: 'GIG-1883', idClient: 10100 },
  { register: 34666, name: 'ADRIANO BARBOSA MARTINS',           plate: 'GIG-1884', idClient: 10100 },
  { register: 29270, name: 'ADRIANO MARQUES',                   plate: 'GIG-1884', idClient: 10100 },
  { register: 33869, name: 'ALAN CARDEK PERES RODRIGUES FILHO', plate: 'GIG-1885', idClient: 10100 },
  { register: 22131, name: 'ALEANDRO JUNIOR DE FRANCISCO',      plate: 'GIG-1885', idClient: 10100 },
  { register: 11201, name: 'ANDERSON SILVA PEREIRA',            plate: 'GIG-1886', idClient: 10100 },
  { register: 11202, name: 'ANTONIO CARLOS BRAGA',              plate: 'GIG-1886', idClient: 10100 },
  { register: 11203, name: 'BENEDITO SOUZA FILHO',              plate: 'GIG-1887', idClient: 10100 },
  { register: 11204, name: 'CARLOS HENRIQUE FARIA',             plate: 'GIG-1887', idClient: 10100 },
  { register: 11205, name: 'CLAUDINHO FERRAZ TOSTA',            plate: 'GIG-1888', idClient: 10100 },
  { register: 11206, name: 'DANIEL AUGUSTO PRADO',              plate: 'GIG-1888', idClient: 10100 },
  { register: 11207, name: 'DAVI LUCAS MOREIRA',                plate: 'GIG-1889', idClient: 10100 },
  { register: 11208, name: 'DENILSON ARAUJO CAMPOS',            plate: 'GIG-1889', idClient: 10100 },
  { register: 11209, name: 'EDIVALDO SOUZA SANTOS',             plate: 'GIG-1890', idClient: 10100 },
  { register: 11210, name: 'ELIAS COSTA RODRIGUES',             plate: 'GIG-1890', idClient: 10100 },
  { register: 11211, name: 'FABIANO VIEIRA MELO',               plate: 'GIG-1891', idClient: 10100 },
  { register: 11212, name: 'FLAVIO JOSE NASCIMENTO',            plate: 'GIG-1891', idClient: 10100 },
  { register: 11213, name: 'GILBERTO ANDRADE LIMA',             plate: 'GIG-1892', idClient: 10100 },
  { register: 11214, name: 'GUSTAVO HENRIQUE ALVES',            plate: 'GIG-1892', idClient: 10100 },

  // ── idClient 10200 (20 motoristas) ────────────────────────────────────────
  { register: 25990, name: 'ALESSANDRO DE OLIVEIRA',            plate: 'RJM-4421', idClient: 10200 },
  { register: 12734, name: 'ALEX PINHEIRO DE SOUSA',            plate: 'RJM-4421', idClient: 10200 },
  { register: 72890, name: 'ALEXANDRE COROTTI',                 plate: 'RJM-4422', idClient: 10200 },
  { register: 81672, name: 'ANDRE LUIZ DE OLIVEIRA',            plate: 'RJM-4422', idClient: 10200 },
  { register: 86334, name: 'ANTONIO DONIZETI PIRES',            plate: 'RJM-5510', idClient: 10200 },
  { register: 22301, name: 'IGOR SANTOS CAVALCANTE',            plate: 'RJM-5510', idClient: 10200 },
  { register: 22302, name: 'IVAN PEREIRA GOMES',                plate: 'RJM-5511', idClient: 10200 },
  { register: 22303, name: 'JACKSON BRITO FERREIRA',            plate: 'RJM-5511', idClient: 10200 },
  { register: 22304, name: 'JEFFERSON ALVES COSTA',             plate: 'RJM-5512', idClient: 10200 },
  { register: 22305, name: 'JOAO PAULO MENDES',                 plate: 'RJM-5512', idClient: 10200 },
  { register: 22306, name: 'JONATAS XAVIER ROCHA',              plate: 'RJM-5513', idClient: 10200 },
  { register: 22307, name: 'JOSE ROBERTO LIMA',                 plate: 'RJM-5513', idClient: 10200 },
  { register: 22308, name: 'JULIO CESAR BARROS',                plate: 'RJM-5514', idClient: 10200 },
  { register: 22309, name: 'LEANDRO MARTINS PINTO',             plate: 'RJM-5514', idClient: 10200 },
  { register: 22310, name: 'LEONARDO SOUZA DIAS',               plate: 'RJM-5515', idClient: 10200 },
  { register: 22311, name: 'LUCAS GABRIEL FERREIRA',            plate: 'RJM-5515', idClient: 10200 },
  { register: 22312, name: 'LUIS FELIPE ARAUJO',                plate: 'RJM-5516', idClient: 10200 },
  { register: 22313, name: 'MARCELO AUGUSTO SILVA',             plate: 'RJM-5516', idClient: 10200 },
  { register: 22314, name: 'MARCOS VINICIUS COSTA',             plate: 'RJM-5517', idClient: 10200 },
  { register: 22315, name: 'MARIO SERGIO TEIXEIRA',             plate: 'RJM-5517', idClient: 10200 },

  // ── idClient 10300 (20 motoristas) ────────────────────────────────────────
  { register: 55120, name: 'CARLOS EDUARDO MENDES',             plate: 'SPX-9900', idClient: 10300 },
  { register: 47830, name: 'DIEGO FERREIRA SANTOS',             plate: 'SPX-9900', idClient: 10300 },
  { register: 38291, name: 'EDSON PAULO LIMA',                  plate: 'SPX-1177', idClient: 10300 },
  { register: 91045, name: 'FABIO RODRIGUES COSTA',             plate: 'SPX-1177', idClient: 10300 },
  { register: 60312, name: 'GILSON ALVES TEIXEIRA',             plate: 'SPX-2288', idClient: 10300 },
  { register: 33401, name: 'MATEUS HENRIQUE BORGES',            plate: 'SPX-2288', idClient: 10300 },
  { register: 33402, name: 'MAURICIO LEAL FREITAS',             plate: 'SPX-2289', idClient: 10300 },
  { register: 33403, name: 'MAURO SERGIO CAMPOS',               plate: 'SPX-2289', idClient: 10300 },
  { register: 33404, name: 'NILTON CESAR RODRIGUES',            plate: 'SPX-2290', idClient: 10300 },
  { register: 33405, name: 'PAULO ROBERTO ANDRADE',             plate: 'SPX-2290', idClient: 10300 },
  { register: 33406, name: 'PEDRO HENRIQUE SOUZA',              plate: 'SPX-2291', idClient: 10300 },
  { register: 33407, name: 'RAFAEL OLIVEIRA MENDES',            plate: 'SPX-2291', idClient: 10300 },
  { register: 33408, name: 'RENATO ALVES MOURA',                plate: 'SPX-2292', idClient: 10300 },
  { register: 33409, name: 'RICARDO JOSE PEREIRA',              plate: 'SPX-2292', idClient: 10300 },
  { register: 33410, name: 'ROBERTO CARLOS LIMA',               plate: 'SPX-2293', idClient: 10300 },
  { register: 33411, name: 'RODRIGO FERNANDES SILVA',           plate: 'SPX-2293', idClient: 10300 },
  { register: 33412, name: 'ROGERIO SANTOS PRADO',              plate: 'SPX-2294', idClient: 10300 },
  { register: 33413, name: 'RONALDO BEZERRA COSTA',             plate: 'SPX-2294', idClient: 10300 },
  { register: 33414, name: 'SERGIO AUGUSTO MELO',               plate: 'SPX-2295', idClient: 10300 },
  { register: 33415, name: 'VANDERLEI SOUZA ROCHA',             plate: 'SPX-2295', idClient: 10300 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Formata Date → "DD/MM/YYYY HH:mm:ss" */
export function fmtBR(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${pad(date.getUTCDate())}/${pad(date.getUTCMonth() + 1)}/${date.getUTCFullYear()} ` +
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`
  )
}

/** Dia da semana em pt-BR */
export function weekdayPtBR(date: Date): string {
  return date.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' })
}

/** Dia por extenso em pt-BR: "quarta-feira, 11 de março de 2026" */
export function fullDatePtBR(date: Date): string {
  const day  = weekdayPtBR(date)
  const rest = date.toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
  return `${day}, ${rest}`
}

/** Número aleatório inteiro entre min e max (inclusive) */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Escolhe aleatoriamente N itens distintos de um array */
export function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

/**
 * Gera tempos de jornada coerentes em segundos.
 *
 * Perfis possíveis:
 *   normal  → jornada dentro dos limites legais
 *   long    → jornada > 13h (violação)
 *   stopped → motorista ficou muito parado
 *   meal    → refeição < 1h (violação)
 *   cont    → direção contínua > 5h3m (violação)
 */
export type JourneyProfile = 'normal' | 'long' | 'stopped' | 'meal' | 'cont'

export interface JourneyTimes {
  totalTimeSeconds:                number
  totalDrivingTimeSeconds:         number
  maxContinuousDrivingTimeSeconds: number
  stoppedTimeSeconds:              number
  mealTimeSeconds:                 number
  restIntervalSeconds:             number
}

export function generateJourneyTimes(profile: JourneyProfile): JourneyTimes {
  switch (profile) {
    case 'long': {
      // Jornada > 13h
      const total   = randInt(13 * 3600 + 1, 16 * 3600)
      const driving = randInt(Math.floor(total * 0.6), Math.floor(total * 0.8))
      const stopped = total - driving
      const meal    = randInt(3600, 5400)     // refeição ok
      const cont    = randInt(14400, 18000)   // 4–5h contínua
      return {
        totalTimeSeconds:                total,
        totalDrivingTimeSeconds:         driving,
        maxContinuousDrivingTimeSeconds: cont,
        stoppedTimeSeconds:              stopped,
        mealTimeSeconds:                 meal,
        restIntervalSeconds:             randInt(30000, 120000),
      }
    }

    case 'stopped': {
      // Motorista ficou muito parado
      const total   = randInt(6 * 3600, 10 * 3600)
      const driving = randInt(1800, Math.floor(total * 0.3))
      const stopped = total - driving
      const meal    = randInt(3600, 7200)
      const cont    = randInt(1800, 3600)
      return {
        totalTimeSeconds:                total,
        totalDrivingTimeSeconds:         driving,
        maxContinuousDrivingTimeSeconds: cont,
        stoppedTimeSeconds:              stopped,
        mealTimeSeconds:                 meal,
        restIntervalSeconds:             randInt(40000, 200000),
      }
    }

    case 'meal': {
      // Refeição < 1h (violação)
      const total   = randInt(8 * 3600, 12 * 3600)
      const driving = randInt(Math.floor(total * 0.55), Math.floor(total * 0.75))
      const stopped = total - driving
      const meal    = randInt(600, 3599)      // < 1h
      const cont    = randInt(10800, 14400)
      return {
        totalTimeSeconds:                total,
        totalDrivingTimeSeconds:         driving,
        maxContinuousDrivingTimeSeconds: cont,
        stoppedTimeSeconds:              stopped,
        mealTimeSeconds:                 meal,
        restIntervalSeconds:             randInt(35000, 150000),
      }
    }

    case 'cont': {
      // Direção contínua > 5h3m (violação)
      const total   = randInt(10 * 3600, 14 * 3600)
      const driving = randInt(Math.floor(total * 0.7), Math.floor(total * 0.9))
      const stopped = total - driving
      const meal    = randInt(3600, 5400)
      const cont    = randInt(5 * 3600 + 3 * 60 + 1, 7 * 3600)  // > 5h3m
      return {
        totalTimeSeconds:                total,
        totalDrivingTimeSeconds:         driving,
        maxContinuousDrivingTimeSeconds: cont,
        stoppedTimeSeconds:              stopped,
        mealTimeSeconds:                 meal,
        restIntervalSeconds:             randInt(30000, 90000),
      }
    }

    default: {
      // normal — dentro dos limites
      const total   = randInt(6 * 3600, 11 * 3600)
      const driving = randInt(Math.floor(total * 0.5), Math.floor(total * 0.75))
      const stopped = total - driving
      const meal    = randInt(3600, 7200)
      const cont    = randInt(7200, 14400)
      return {
        totalTimeSeconds:                total,
        totalDrivingTimeSeconds:         driving,
        maxContinuousDrivingTimeSeconds: cont,
        stoppedTimeSeconds:              stopped,
        mealTimeSeconds:                 meal,
        restIntervalSeconds:             randInt(40000, 250000),
      }
    }
  }
}

/** Escolhe um perfil de jornada com probabilidades ponderadas */
export function randomProfile(): JourneyProfile {
  const r = Math.random()
  if (r < 0.45) return 'normal'   // 45% normal
  if (r < 0.65) return 'long'     // 20% jornada longa
  if (r < 0.78) return 'stopped'  // 13% muito parado
  if (r < 0.89) return 'meal'     // 11% violação refeição
  return 'cont'                   // 11% direção contínua
}