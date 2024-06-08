import { redirect } from './path.js'
import { hasTrailingSlash, removeTrailingSlash } from './utils.js'
import { Router } from './router.js'
import { APIClient } from './data/requests.js'
import { FlowerRepository, OrderRepository, ReviewRepository, UserRepository } from './data/repositories.js'
import { getAdminRoutes } from './admin/routes.js'
import { getMainRoutes } from './main/routes.js'
import { stylePaths } from './config.js'
import { mountLayout } from './layout.js'



const path = window.location.pathname
if (hasTrailingSlash(path)) {
  redirect(removeTrailingSlash(path))
}


/** @type {MountFunction} */
function adminMount(layout, title, styles=[])  {
  mountLayout(layout, title + ' | FloraShop Admin', [stylePaths.base, ...styles])
}

/** @type {MountFunction} */
const mainMount = (layout, title, styles=[]) => {
  mountLayout(layout, title + ' | FloraShop', [stylePaths.base, ...styles])
}

const origin = window.location.origin
const apiClient = new APIClient(origin + '/api/')
const flowerRepository = new FlowerRepository(apiClient)
const orderRepository = new OrderRepository(apiClient)
const reviewRepository = new ReviewRepository(apiClient)
const userRepository = new UserRepository(apiClient)

const database = {
  flowers: flowerRepository,
  orders: orderRepository,
  reviews: reviewRepository,
  users: userRepository
}

const router = new Router()

router.use('', getAdminRoutes(database, adminMount))
router.use('', getMainRoutes(database, mainMount))

router.handlePath(path)