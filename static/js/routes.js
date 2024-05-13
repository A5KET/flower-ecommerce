import { navigationOptions, styles } from './config.js'
import { Flowers } from './views/flowers.js'
import { Orders } from './views/orders.js'
import { Index } from './views/index.js'
import { mountLayout } from './layout.js'
import { NoMatch } from './views/noMatch.js'
import { FlowerForm } from './views/flowerForm.js'
import { OrderForm } from './views/orderForm.js'


const mount = (layout, title, styles = []) => {
  const defaultStyles = ['/css/base.css']

  mountLayout(layout, title + ' | FloraShop Admin', defaultStyles.concat(styles))
}


export function registerRoutes(router, database) {
  const routes = [
    {
      path: '/',
      handler: () => {
        mount(Index(), 'Головна сторінка')
      }
    },
    {
      path: navigationOptions.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => {
          mount(Flowers(flowers), 'Квіти', [styles.entityManagment, '/css/flowers.css'])
        })
      }
    },
    {
      path: navigationOptions.flowers.url + '/add',
      handler: () => {
        mount(FlowerForm(), 'Додати квітку', [styles.forms, styles.slider, '/css/flowerForm.css'])
      }
    },
    {
      path: navigationOptions.flowers.url + '/:flowerId',
      handler: (params) => {
        database.flowers.get(params.flowerId).then(flower => {
          mount(FlowerForm(flower), flower.name, [styles.forms, styles.slider, '/css/flowerForm.css'])
        })
      }
    },
    {
      path: navigationOptions.orders.url,
      handler: () => {
        database.orders.getAll().then(orders => {
          mount(Orders(orders), 'Замовлення', [styles.entityManagment, styles.tables])
        })
      },
    },
    {
      path: navigationOptions.orders.url + '/add',
      handler: () => {
        mount(OrderForm(), 'Створити замовлення', [styles.forms, '/css/orderForm.css'])
      }
    },
    {
      path: navigationOptions.orders.url + '/:orderId',
      handler: (params) => {
        database.orders.get(params.orderId).then(order => {
          mount(OrderForm(order), 'Форма', [styles.forms, '/css/orderForm.css'])
        })
      }
    },
    {
      path: '/*',
      handler: () => {
        mount(NoMatch(), '404')
      }
    }
  ]

  routes.map(route => router.registerRoute(route))
}