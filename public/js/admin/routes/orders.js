import { getEntityURL, getNewEntityFormURL, stylePaths } from '../../config.js'
import { redirect, reload } from '../../path.js'
import { Orders, OrderForm, NewOrderForm } from '../views/orders.js'


/** @type {RoutesFactory} */
export function getOrdersRoutes(database, mount, url) {
  /** @param {Order} order */
  function saveNewOrder(order) {
    database.orders.add(order).then(result => redirect(getEntityURL(url, result.id)))
  }

  /** @param {Order} order */
  function updateOrder(order) {
    database.orders.update(order).then(() => reload())
  }

  /** @param {Order} order */
  function removeOrder(order) {
    database.orders.remove(order.id).then(() => redirect(url))
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
      handler: async () => {
        const possibleProducts = await database.flowers.getAll()
        mount(NewOrderForm(possibleProducts, saveNewOrder), 'Створити замовлення', [stylePaths.forms, '/css/orderForm.css'])
      }
    },
    {
      path: url + '/:id',
      handler: async (params) => {
        const order = await database.orders.get(params.id)
        const possibleProducts = await database.flowers.getAll()

        mount(OrderForm(order, possibleProducts, updateOrder, removeOrder), 'Форма', [stylePaths.forms, '/css/orderForm.css'])

      }
    },
  ]
}