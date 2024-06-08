import { getNewEntityFormURL, stylePaths } from '../../config.js'
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
export function getOrdersRoutes(database, mount, url) {
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
      path: url,
      handler: () => {
        database.orders.getAll().then(orders => {
          mount(Orders(orders, getNewEntityFormURL(url)), 'Замовлення', [stylePaths.entityManagment, stylePaths.tables])
        })
      },
    },
    {
      path: getNewEntityFormURL(url),
      handler: () => {
        mount(NewOrderFormLayout(statusOption, saveNewOrder), 'Створити замовлення', [stylePaths.forms, '/css/orderForm.css'])
      }
    },
    {
      path: url + '/:id',
      handler: (params) => {
        database.orders.get(params.id).then(order => {
          mount(OrderFormLayout(order, statusOption, updateOrder, removeOrder), 'Форма', [stylePaths.forms, '/css/orderForm.css'])
        })
      }
    },
  ]
}