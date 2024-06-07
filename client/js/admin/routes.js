import { getIndexRoutes } from './routes/index.js'
import { getFlowersRoutes } from './routes/flowers.js'
import { getOrdersRoutes } from './routes/orders.js'
import { getReviewsRoutes } from './routes/reviews.js'
import { getUsersRoutes } from './routes/users.js'


/**
 * 
 * @param {RoutesDatabase} database 
 * @param {MountFunction} mount 
 * @returns 
 */
export function getAdminRoutes(database, mount) {
  return [
    ...getIndexRoutes(database, mount),
    ...getFlowersRoutes(database, mount),
    ...getOrdersRoutes(database, mount),
    ...getReviewsRoutes(database, mount),
    ...getUsersRoutes(database, mount)
  ]
}