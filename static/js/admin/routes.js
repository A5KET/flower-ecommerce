import { adminNavigationOptions, stylePaths, statusOption } from '../config.js'
import { Flowers } from './views/flowers.js'
import { Orders } from './views/orders.js'
import { AdminIndex } from './views/index.js'
import { FlowerForm } from './views/flowerForm.js'
import { NewOrderFormLayout, OrderFormLayout } from './views/orderForm.js'
import { Repository } from '../data/repositories.js'
import { mount } from '../utils.js'



const adminMount = (layout, title, styles=[]) => {
  mount(layout, title + ' | FloraShop Admin', [stylePaths.base, ...styles])
}


/**
 * 
 * @param {{ [key: string]: Repository }} database 
 */
export function getAdminRoutes(database) {
  /** @param {Order} order */
  function saveNewOrder(order) {
    database.orders.add(order)
  }

  /** @param {Order} order */
  function updateOrder(order) {
    database.orders.update(order)
  }

  /** @param {Order} order */
  function removeOrder(order) {
    database.orders.remove(order.id)
  }

  /**
   * @type {Route[]}
   */
  return [
    {
      path: '/admin',
      handler: () => {
        adminMount(AdminIndex(), )
      }
    },
    {
      path: adminNavigationOptions.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => {
          flowers = flowers.slice(0, 12)
          adminMount(Flowers(flowers), 'Квіти', [stylePaths.entityManagment, '/css/flowers.css'])
        })
      }
    },
    {
      path: adminNavigationOptions.flowers.url + '/add',
      handler: () => {
        adminMount(FlowerForm(), 'Додати квітку', [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
      }
    },
    {
      path: adminNavigationOptions.flowers.url + '/:flowerId',
      handler: (params) => {
        database.flowers.get(params.flowerId).then(flower => {
          adminMount(FlowerForm(flower), flower.name, [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
        })
      }
    },
    {
      path: adminNavigationOptions.orders.url,
      handler: () => {
        database.orders.getAll().then(orders => {
          adminMount(Orders(orders), 'Замовлення', [stylePaths.entityManagment, stylePaths.tables])
        })
      },
    },
    {
      path: adminNavigationOptions.orders.url + '/add',
      handler: () => {
        adminMount(NewOrderFormLayout(statusOption, saveNewOrder), 'Створити замовлення', [stylePaths.forms, '/css/orderForm.css'])
      }
    },
    {
      path: adminNavigationOptions.orders.url + '/:orderId',
      handler: (params) => {
        database.orders.get(params.orderId).then(order => {
          adminMount(OrderFormLayout(order, statusOption, updateOrder, removeOrder), 'Форма', [stylePaths.forms, '/css/orderForm.css'])
        })
      }
    },
  ]
}