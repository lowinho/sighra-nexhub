import { Router } from 'express'
import { JourneyController } from '@/modules/journey/journey.controller'

const journeyRoutes = Router()
const journeyController = new JourneyController()

journeyRoutes.get('/health', journeyController.health)
journeyRoutes.get('/', journeyController.list)
journeyRoutes.post('/sync', journeyController.sync)

export { journeyRoutes }