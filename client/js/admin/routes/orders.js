import { getNewEntityFormURL, adminNavigationOptions as nav, stylePaths } from '../../config.js'
import { Orders, OrderFormLayout, NewOrderFormLayout } from '../views/orders.js'


/**
 * @readonly
 * @type {StatusOptions}
 */
export const statusOption = {
  new: 'Новий',
  processing: 'Обробляється',
  done: 'Виконано',
  canceled: 'Скасовано'
}


/** @type {RoutesFactory} */
export function getOrdersRoutes(database, mount) {
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

  return [
    {
      path: nav.orders.url,
      handler: () => {
        database.orders.getAll().then(orders => {
          mount(Orders(orders, getNewEntityFormURL(nav.orders.url)), 'Замовлення', [stylePaths.entityManagment, stylePaths.tables])
        })
      },
    },
    {
      path: nav.orders.url + '/add',
      handler: () => {
        mount(NewOrderFormLayout(statusOption, saveNewOrder), 'Створити замовлення', [stylePaths.forms, '/css/orderForm.css'])
      }
    },
    {
      path: nav.orders.url + '/:orderId',
      handler: (params) => {
        database.orders.get(params.orderId).then(order => {
          mount(OrderFormLayout(order, statusOption, updateOrder, removeOrder), 'Форма', [stylePaths.forms, '/css/orderForm.css'])
        })
      }
    },
  ]
}