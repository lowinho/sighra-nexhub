import cors from 'cors'
import express from 'express'
import { journeyRoutes } from '@/modules/journey/journey.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/journeys', journeyRoutes)

export { app }
