import { navigationOptions } from '../config.js'
import { EntityManagmentTable, TableInfo, orderOption } from '../components/tables.js'
import { toLocaleStringFormat } from '../formats.js'


export function Orders(orders) {
  const tableInfo = new TableInfo(
    {
      id: {
        heading: '№ замовлення'
      },
      status: {
        heading: 'Статус'
      },
      customer: {
        heading: 'Замовник'
      },
      timeCreated: {
        heading: 'Дата створення',
        format: toLocaleStringFormat('en-GB', { timeZone: 'UTC' })
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