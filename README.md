# Journey Service

Serviço em **Node.js + TypeScript + MongoDB** para sincronizar jornadas da Sighra usando dois fluxos separados:

- jornadas em aberto
- jornadas finalizadas

Ambos gravam na mesma collection do MongoDB: **`Journey`**.

## Regras implementadas

- nomes salvos no banco em **inglês**
- collection com nome **`Journey`**
- campos ausentes em uma origem são gravados como **`null`**
- sync automático a cada **4 horas**
- sem duplicidade por combinação de `register + startDateTime`
- se a jornada já existir, é feito **upsert** e não cria um novo documento

## Campos persistidos

- `referenceDate`
- `register`
- `driverName`
- `vehiclePlate`
- `fleet`
- `restIntervalSeconds`
- `startDateTime`
- `endDateTime`
- `totalTimeSeconds`
- `totalDrivingTimeSeconds`
- `maxContinuousDrivingTimeSeconds`
- `stoppedTimeSeconds`
- `mealTimeSeconds`
- `status`
- `source`
- `rawData`
- `createdAt`
- `updatedAt`

## Executar localmente

```bash
cp .env.example .env
npm install
npm run dev
```

## Executar com Docker

```bash
docker compose up --build
```

## Endpoints

### Health

```http
GET /api/journeys/health
```

### Listar jornadas

```http
GET /api/journeys
```

### Forçar sincronização manual

```http
POST /api/journeys/sync
```

## Observação sobre Mongo local

Você pediu explicitamente este acesso local:

```env
MONGO_URI=mongodb://localhost:27017/api_project
MONGO_USER=root
MONGO_PASSWORD=rootpassword
MONGO_DB=api_project
```

Isso foi mantido em `.env.example`.

Para Docker, o serviço usa `.env.docker` com autenticação no container `mongo`.
