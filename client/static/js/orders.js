import { mountLayout } from './base.js'
import { navigationOptions } from './config.js'
import { EntityManagmentBase } from './entityManagment.js'
import { OrderRepository } from './repositories.js'
import { createElement } from './utils.js'
import { formatObjectValues, toLocaleStringFormat } from './formats.js'


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
  return createElement(
    { tag: 'tr'},
    [
      ...elements
    ]
  )
}


function OrdersList(orders) {
  const fieldsToDisplay = {
    status: {
      text: 'Статус'
    },
    customer: {
      text: 'Замовник'
    },
    timeCreated: {
      text: 'Дата створення',
      format: toLocaleStringFormat("en-GB")
    },
    totalPrice: {
      text: 'Ціна',
      format: (price) => price + 'гр'
    },
    id: {
      text: '№ замовлення'
    },
  }

  const values = orders.map(order => formatObjectValues(order, fieldsToDisplay))
  const rows = values.map(entityValues => TableRow(entityValues.map(value => TableCell(value))))
  
  return createElement(
    { tag: 'table' },
    [
      TableRow(Object.values(fieldsToDisplay).map(field => OrderListFieldHeading(field.text, orderOptions.none))),
      ...rows
    ]
  )
}


const orderRepository = new OrderRepository()

orderRepository.getAll().then(orders => {
  mountLayout(EntityManagmentBase(navigationOptions.orders, OrdersList(orders), '/orders/form'), document.body)
})
