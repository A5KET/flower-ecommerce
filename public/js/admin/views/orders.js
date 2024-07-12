import { createElement } from '../../layout.js'
import { adminNavigationOptions } from '../../config.js'
import { EntityManagmentTable, TableInfo, orderOption } from '../../common/tables.js'
import { Fieldset, FormButtons, TextInputField, DateTimeField, SelectField, getFormData, getFormDataOnSubmit } from '../../common/forms.js'
import { ProductList } from '../components/products.js'
import { toLocaleStringFormat } from '../../formats.js'
import { AdminBaseLayout } from '../components/base.js'


/**
 * @readonly
 * @type {StatusOptions}
 */
export const statusOptions = {
  new: 'Новий',
  processing: 'Обробляється',
  done: 'Виконано',
  canceled: 'Скасовано'
}


/**
 * 
 * @param {Order | Object} order 
 * @param {StatusOptions} statusOptions 
 * @param {Function} onSave 
 * @param {Function} [onRemove] 
 * @returns 
 */
export function OrderForm(order, possibleProducts, onSave, onRemove) {
  function onOrderSave(savedOrder) {
    savedOrder.id = order.id
    savedOrder.products = products
    savedOrder.status = statusOptions[savedOrder.status]

    onSave(savedOrder)
  }

  if (!order.products) {
    order.products = []
  }

  const products = order.products
  console.log(products)

  const fields = [
    SelectField(
      {
        name: 'status',
        options: statusOptions,
        activeOption: order.status,
        label: 'Статус:',
        required: true 
      }
    ),
    TextInputField(
      {
        name: 'customer',
        value: order.customer,
        label: 'Замовник:',
        required: true
      }
    ),
    DateTimeField(
      {
        name: 'timeCreated',
        value: order.created ? new Date(order.created) : new Date(),
        label: 'Дата створення:',
        required: true
      })
  ]

  return AdminBaseLayout(
    createElement(
      { tag: 'main' },
      [
        createElement({ tag: 'h1', textContent: `Замовлення №${order.id || ''}` }),
        createElement({ tag: 'form', onSubmit: getFormDataOnSubmit(onOrderSave) }, [
          Fieldset(fields),
          ProductList(products, possibleProducts),
          FormButtons(onRemove ? () => onRemove(order) : undefined)
        ])
      ]
    )
  )
}


export function NewOrderForm(possibleProducts, onSave) {
  return OrderForm({}, possibleProducts, onSave)
}


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
      createdAt: {
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