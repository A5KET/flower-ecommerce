import { adminNavigationOptions, styles, statusOption } from '../config.js'
import { Flowers } from './views/flowers.js'
import { Orders } from './views/orders.js'
import { AdminIndex } from './views/index.js'
import { FlowerForm } from './views/flowerForm.js'
import { NewOrderFormLayout, OrderFormLayout } from './views/orderForm.js'
import { Repository } from '../data/repositories.js'
import { mount } from '../utils.js'


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
        mount(AdminIndex(), )
      }
    },
    {
      path: adminNavigationOptions.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => {
          flowers = flowers.slice(0, 12)
          mount(Flowers(flowers), 'Квіти', [styles.entityManagment, '/css/flowers.css'])
        })
      }
    },
    {
      path: adminNavigationOptions.flowers.url + '/add',
      handler: () => {
        mount(FlowerForm(), 'Додати квітку', [styles.forms, styles.slider, '/css/flowerForm.css'])
      }
    },
    {
      path: adminNavigationOptions.flowers.url + '/:flowerId',
      handler: (params) => {
        database.flowers.get(params.flowerId).then(flower => {
          mount(FlowerForm(flower), flower.name, [styles.forms, styles.slider, '/css/flowerForm.css'])
        })
      }
    },
    {
      path: adminNavigationOptions.orders.url,
      handler: () => {
        database.orders.getAll().then(orders => {
          mount(Orders(orders), 'Замовлення', [styles.entityManagment, styles.tables])
        })
      },
    },
    {
      path: adminNavigationOptions.orders.url + '/add',
      handler: () => {
        mount(NewOrderFormLayout(statusOption, saveNewOrder), 'Створити замовлення', [styles.forms, '/css/orderForm.css'])
      }
    },
    {
      path: adminNavigationOptions.orders.url + '/:orderId',
      handler: (params) => {
        database.orders.get(params.orderId).then(order => {
          mount(OrderFormLayout(order, statusOption, updateOrder, removeOrder), 'Форма', [styles.forms, '/css/orderForm.css'])
        })
      }
    },
  ]
}