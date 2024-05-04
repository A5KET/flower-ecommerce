import { routes } from '../config.js'
import { EntityManagmentBase } from '../components/entityManagment.js'
import { createElement } from '../layout.js'
import { formatObjectValues, toLocaleStringFormat } from '../formats.js'
import { addRedirectOnClick } from '../listeners.js'
import { getRelativePath } from '../path.js'


const orderOptions = {
  ascending: 'ascending',
  descending: 'descending',
  none: null
}


function OrderListFieldHeadingIcon(orderedBy) {
  const node = createElement({ tag: 'img', className: 'heading-icon' })

  if (orderedBy == orderOptions.ascending) {
    node.src = '/img/orderAscending.svg'
  }
  else if (orderedBy == orderOptions.descending) {
      node.src = '/img/orderDescending.svg'
    }
  else {
    node.src = '/img/orderNone.svg'
  }

  return node
}


function OrderListFieldHeading(text, orderedBy) {
  return createElement(
    { tag: 'th', className: 'heading-element-wrapper', scope: 'col'},
    [
      createElement(
        { tag: 'div', className: 'heading-element' },
        [
          text,
          OrderListFieldHeadingIcon(orderedBy)
        ]
      )
    ]
  )
}


function TableCell(value) {
  return createElement(
    { tag: 'td'},
    [value]
  )
}


function TableRow(elements) {
  const node = createElement(
    { tag: 'tr'},
    [
      ...elements
    ]
  )

  return node
}


function OrderRow(order, fieldsToDisplay) {
  const formatedValues = formatObjectValues(order, fieldsToDisplay)
  const cells = formatedValues.map(value => TableCell(value))
  const node = TableRow(cells)
  addRedirectOnClick(node, getRelativePath(order.id))

  return node
}


function OrdersList(orders) {
  const fieldsToDisplay = {
    id: {
      text: '№ замовлення'
    },
    status: {
      text: 'Статус'
    },
    customer: {
      text: 'Замовник'
    },
    timeCreated: {
      text: 'Дата створення',
      format: toLocaleStringFormat('en-GB', { timeZone: 'UTC' })
    },
    totalPrice: {
      text: 'Ціна',
      format: (price) => price + ' грн.'
    }
  }

  const rows = orders.map(order => OrderRow(order, fieldsToDisplay))
  
  return createElement(
    { tag: 'table' },
    [
      TableRow(Object.values(fieldsToDisplay).map(field => OrderListFieldHeading(field.text, orderOptions.none))),
      ...rows
    ]
  )
}


export function Orders(orders) {
  return EntityManagmentBase(routes.orders, OrdersList(orders), routes.orders.url + '/add')
}