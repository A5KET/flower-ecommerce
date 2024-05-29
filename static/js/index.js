import { Router } from './router.js'
import { FlowerRepository, OrderRepository } from './data/repositories.js'
import { getAdminRoutes } from './admin/routes.js'
import { getCommonRoutes } from './common/routes.js'
import { getMainRoutes } from './main/routes.js'

const origin = window.location.origin
const flowerRepository = new FlowerRepository(origin + '/api/flowers')
const orderRepository = new OrderRepository(origin + '/api/orders')


const database = {
  flowers: flowerRepository,
  orders: orderRepository
}

const router = new Router()

router.use('', getAdminRoutes(database))
router.use('', getMainRoutes(database))
router.use('', getCommonRoutes())

router.handlePath(window.location.pathname)