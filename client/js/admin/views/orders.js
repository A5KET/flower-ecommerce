import { createElement } from '../../layout.js'
import { adminNavigationOptions } from '../../config.js'
import { EntityManagmentTable, TableInfo, orderOption } from '../../common/tables.js'
import { Fieldset, FormButtons, TextInputField, DateTimeField, SelectField, getFormData } from '../../common/forms.js'
import { ProductList } from '../../common/products.js'
import { toLocaleStringFormat } from '../../formats.js'
import { AdminBaseLayout } from '../components/base.js'


/**
 * 
 * @param {Order} order 
 * @param {StatusOptions} statusOptions 
 * @param {Function} onSave 
 * @param {Function} onRemove 
 * @returns 
 */
function OrderFormMain(order, statusOptions, onSave, onRemove) {
  function onOrderSave(event) {
    event.preventDefault()
    const form = event.target.form
    const isFormValid = form.checkValidity()

    if (!isFormValid) {
      return 
    }

    const data = getFormData(form)
    data.products = products

    Object.assign(order, data)
    onSave(order)
  }

  function onOrderRemove(event) {
    onRemove(order)
  }

  const products = order.products || []

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

  return createElement(
    { tag: 'main' },
    [
      createElement({ tag: 'h1', textContent: `Замовлення №${order.id || ''}` }),
      createElement({ tag: 'form', onSubmit: onOrderSave }, [
        Fieldset(fields),
        ProductList(products),
        FormButtons(onOrderSave, onRemove ? onOrderRemove : undefined)
      ])
    ]
  )
}


/**
 * 
 * @param {Order | Object} order 
 * @param {StatusOptions} statusOptions 
 * @param {Function} onSave 
 * @param {Function} [onRemove] 
 * @returns 
 */
export function OrderFormLayout(order, statusOptions, onSave, onRemove) {
  return AdminBaseLayout(OrderFormMain(order, statusOptions, onSave, onRemove))
}


/**
 * 
 * @param {StatusOptions} statusOptions 
 * @param {Function} onSave
 */
export function NewOrderFormLayout(statusOptions, onSave) {
  return OrderFormLayout({}, statusOptions, onSave)
}



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