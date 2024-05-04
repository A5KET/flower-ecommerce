import { Router } from './router.js'
import { FlowerRepository, OrderRepository } from './data/repositories.js'
import { registerRoutes } from './routes.js'

const origin = window.location.origin
const flowerRepository = new FlowerRepository(origin + '/api/flowers')
const orderRepository = new OrderRepository(origin + '/api/orders')

const database = {
  flowers: flowerRepository,
  orders: orderRepository
}

const router = new Router()
registerRoutes(router, database)

router.handlePath(window.location.pathname)