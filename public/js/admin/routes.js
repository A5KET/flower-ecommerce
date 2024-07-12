import { getIndexRoutes } from './routes/index.js'
import { getFlowersRoutes } from './routes/flowers.js'
import { getOrdersRoutes } from './routes/orders.js'
import { getReviewsRoutes } from './routes/reviews.js'
import { getUsersRoutes } from './routes/users.js'
import { AdminBaseLayout } from './components/base.js'
import { NoMatch } from '../common/noMatch.js'
import { adminNavigationOptions } from '../config.js'


/** @type {RoutesFactory} */
export function getAdminRoutes(database, mount) {
  return [
    ...getIndexRoutes(database, mount),
    ...getFlowersRoutes(database, mount, adminNavigationOptions.flowers.url),
    ...getOrdersRoutes(database, mount, adminNavigationOptions.orders.url),
    ...getReviewsRoutes(database, mount, adminNavigationOptions.reviews.url),
    ...getUsersRoutes(database, mount, adminNavigationOptions.users.url),
    {
      path: '/admin/*',
      handler: () => {
        mount(AdminBaseLayout(NoMatch()))
      }
    }
  ]
}