import { Router } from './router.js'
import { APIClient } from './data/requests.js'
import { FlowerRepository, OrderRepository } from './data/repositories.js'
import { getAdminRoutes } from './admin/routes.js'
import { getCommonRoutes } from './common/routes.js'
import { getMainRoutes } from './main/routes.js'
import { stylePaths } from './config.js'
import { mount } from './utils.js'


/** @type {MountFunction} */
function adminMount(layout, title, styles=[])  {
  mount(layout, title + ' | FloraShop Admin', [stylePaths.base, ...styles])
}

/** @type {MountFunction} */
const mainMount = (layout, title, styles=[]) => {
  mount(layout, title + ' | FloraShop', [stylePaths.base, ...styles])
}

const origin = window.location.origin
const apiClient = new APIClient(origin + '/api/')
const flowerRepository = new FlowerRepository(apiClient)
const orderRepository = new OrderRepository(apiClient)

const database = {
  flowers: flowerRepository,
  orders: orderRepository
}

const router = new Router()

router.use('', getAdminRoutes(database, adminMount))
router.use('', getMainRoutes(database, mainMount))

router.handlePath(window.location.pathname)