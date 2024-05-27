import { navigationOptions } from '../config.js'
import { EntityManagmentTable, TableInfo, orderOption } from '../components/tables.js'
import { toLocaleStringFormat } from '../formats.js'


/**
 * 
 * @param {Order[]} orders 
 * @returns 
 */
export function Orders(orders) {
  console.log(orders)
  const tableInfo = new TableInfo(
    {
      id: {
        heading: '№ замовлення'
      },
      status: {
        heading: 'Статус',
      },
      customer: {
        heading: 'Замовник',
      },
      created: {
        heading: 'Дата створення',
        format: toLocaleStringFormat('en-GB')
      },
      totalPrice: {
        heading: 'Ціна',
        format: (price) => price + ' грн.'
      }
    },
    {
      orderBy: 'id',
      order: orderOption.descending
    }
  )

  return EntityManagmentTable(navigationOptions.orders, navigationOptions.orders.url + '/add', tableInfo, orders)
}