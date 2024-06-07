import { adminNavigationOptions, getNewEntityFormURL } from '../../config.js'
import { EntityManagmentTable, TableInfo, orderOption } from '../../common/components/tables.js'
import { toLocaleStringFormat } from '../../formats.js'
import { AdminBaseLayout } from '../components/base.js'


/**
 * 
 * @param {Order[]} orders 
 * @returns 
 */
export function Orders(orders, newEntityFormURL) {
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

  return AdminBaseLayout(
    EntityManagmentTable(newEntityFormURL, tableInfo, orders),
    adminNavigationOptions.orders
  )
}