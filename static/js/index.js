import { Router } from './router.js'
import { FlowerRepository, OrderRepository } from './repositories.js'

import { Flowers } from './views/flowers.js'
import { Orders } from './views/orders.js'
import { Index } from './views/index.js'
import { mountLayout } from './layout.js'
import { NoMatch } from './views/noMatch.js'
import { FlowerForm } from './views/flowerForm.js'
import { OrderForm } from './views/orderForm.js'


const mount = (layout, styles=[]) => {
  const defaultStyles = ['/css/base.css']

  mountLayout(layout, defaultStyles.concat(styles))
}

const origin = window.location.origin
const flowerRepository = new FlowerRepository(origin + '/api/flowers')
const orderRepository = new OrderRepository(origin + '/api/orders')


const router = new Router(
  [
    {
      path: '/',
      handler: () => {
        mount(Index())
      }
    },
    {
      path: '/flowers',
      handler: () => {
        flowerRepository.getAll().then(flowers => {
          mount(Flowers(flowers), ['/css/entityManagment.css', '/css/flowers.css'])
        })
      }
    },
    {
      path: '/flowers/:flowerId',
      handler: () => {
        mount(FlowerForm(), ['/css/forms.css', '/css/slider.css', '/css/flowerForm.css'])
      }
    },
    {
      path: '/orders',
      handler: () => {
        orderRepository.getAll().then(orders => {
          mount(Orders(orders), ['/css/entityManagment.css', '/css/orders.css'])
        })
      },
    },
    {
      path: '/orders/:orderId',
      handler: () => {
        mount(OrderForm(), ['/css/forms.css', '/css/orderForm.css'])
      }
    }
  ],
  {
    noMatchRoute: {
      path: '404',
      handler: () => {
        mount(NoMatch(), document.body)
      }
    },
  }
)

router.handlePath(window.location.pathname)