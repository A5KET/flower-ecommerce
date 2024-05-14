import { BaseLayout } from '../components/base.js'
import { Fieldset, FormButtons, TextInputField, DateTimeField } from '../components/forms.js'
import { createElement } from '../layout.js'


function ProductListElement(product) {
  return createElement(
    { tag: 'div', className: 'product' },
    [
      createElement({ tag: 'span', className: 'product-name', textContent: product.name }),
      createElement({ tag: 'span', textContent: `${product.price} гр/шт x ${product.amount} = ${product.price * product.amount} грн.` }),
      createElement(
        { tag: 'button', className: 'product-remove' },
        [
          createElement({ tag: 'img', src: '/img/cross.svg' })
        ]
      )
    ]
  )
}

function ProductList(products) {
  const totalPrice = products.reduce((cur, product) => cur + (product.price * product.amount), 0)

  return createElement(
    { tag: 'div', className: 'products' },
    [
      ...products.map(product => ProductListElement(product)),
      createElement({ tag: 'span', className: 'total-price', textContent: `Повна ціна: ${totalPrice} грн.` })
    ]
  )
}


function OrderFormMain(order) {
  console.log(order)
  const fields = [
    TextInputField(
      {
        id: 'status',
        value: order?.value,
        label: 'Статус:'
      }
    ),
    TextInputField(
      {
        id: 'customer',
        value: order?.value,
        label: 'Замовник:'
      }
    ),
    DateTimeField(
      {
        id: 'timeCreated',
        value: order ? order.timeCreated : new Date(),
        label: 'Дата створення:'
      })
  ]

  return createElement(
    { tag: 'main' },
    [
      createElement({ tag: 'h1', textContent: `Замовлення №${order ? order.id : ''}` }),
      Fieldset(fields),
      ProductList(order ? order.products : []),
      FormButtons()
    ]
  )
}


export function OrderForm(statusOptions, order) {
  return BaseLayout(OrderFormMain(order))
}

export function NewOrderForm(statusOptions) {
  return OrderForm(
    statusOptions,
    {
      id: '',
      status: ''
    }
  )
}
