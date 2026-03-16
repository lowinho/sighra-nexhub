# Simulação de Jornadas

Pasta isolada de simulação. **Não importar fora desta pasta exceto pelo factory.**  
Quando a integração real estiver pronta, basta remover esta pasta e
reverter o `JourneyService` para usar `new SighraClient()` diretamente.

---

## Estrutura

```
simulation/
├── simulation.types.ts          ← Tipos internos da simulação
├── simulation.helpers.ts        ← Catálogo de motoristas, helpers e gerador de tempos
├── simulation.state-manager.ts  ← Gerencia o relógio simulado + persistência
├── mock.sighra-client.ts        ← Drop-in do SighraClient real
├── sighra-client.factory.ts     ← Factory: retorna real ou mock via USE_MOCK
├── simulation.reset.ts          ← Script de reset (estado + banco)
└── simulation_state.json        ← Estado persistido entre ticks (gerado em runtime)
```

---

## Ativação

No `.env` de desenvolvimento:

```env
USE_MOCK=true
```

---

## Como usar no JourneyService

```typescript
import { createSighraClient } from '@/simulation/sighra-client.factory'

export class JourneyService {
  constructor(
    private readonly sighraClient = createSighraClient(), // ← única mudança
    private readonly journeyRepository = new JourneyRepository()
  ) {}
  // ... resto igual
}
```

---

## Comportamento da simulação

- **Início:** `2025-01-06T05:00:00Z`
- **Avanço por tick:** 4 horas simuladas a cada chamada do serviço (2 min reais)
- **Jornadas abertas:** até 6 motoristas simultâneos
- **Perfis gerados:**

| Perfil    | % | Descrição                                  |
|-----------|---|--------------------------------------------|
| `normal`  | 45 | Dentro dos limites legais                  |
| `long`    | 20 | Jornada > 13h (violação)                   |
| `stopped` | 13 | Motorista muito parado                     |
| `meal`    | 11 | Refeição < 1h (violação)                   |
| `cont`    | 11 | Direção contínua > 5h3m (violação)         |

- **IDs de cliente:** 10100, 10200, 10300 (fixos por motorista)
- **Placas:** GIG-1883, RJM-4421, RJM-5510, SPX-9900, SPX-1177, SPX-2288

---

## Reset

```bash
# Apenas estado da simulação
npm run sim:reset

# Estado + todas as jornadas do banco MongoDB
npm run sim:reset -- --db
```

---

## Adicionar ao package.json

```json
{
  "scripts": {
    "sim:reset": "ts-node -r tsconfig-paths/register simulation/simulation.reset.ts"
  }
}
```

---

## Descarte (quando integração real estiver pronta)

1. Remova a pasta `simulation/`
2. No `JourneyService`, substitua `createSighraClient()` por `new SighraClient()`
3. Remova `USE_MOCK` do `.env`
