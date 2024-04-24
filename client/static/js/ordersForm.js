import { BaseLayout, mountLayout } from './base.js'
import { Fieldset, FormButtons, TextInputField, DateTimeField } from './forms.js'
import { createElement } from './utils.js'


function ProductListElement(product) {
  return createElement(
    { tag: 'div', className: 'product' },
    [
      createElement({ tag: 'span', className: 'product-name', textContent: product.name }),
      createElement({ tag: 'span', textContent: `${product.price} гр/шт x ${product.amount}` }),
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
  const totalPrice = products.reduce((cur, product) => cur + product.price, 0)

  return createElement(
    { tag: 'div', className: 'products' },
    [
      ...products.map(product => ProductListElement(product)),
      createElement({ tag: 'span', className: 'total-price', textContent: `Повна ціна: ${totalPrice} гр.` })
    ]
  )
}


function OrderForm() {
  const order = {
    id: 123456,
    status: 'Готовий',
    customer: 'Євсеенко Г. О.',
    timeCreated: new Date(1713778369000),
    products: [
      {
        name: 'Квітка',
        price: 30,
        amount: 20
      },
      {
        name: 'Квітка',
        price: 30,
        amount: 20
      },
      {
        name: 'Квітка',
        price: 30,
        amount: 20
      }
    ]
  }

  const fields = [
    ...[
      {
        id: 'status',
        value: order.status,
        label: "Статус:"
      },
      {
        id: 'customer',
        value: order.customer,
        label: "Замовник:"
      }
    ].map(field => TextInputField(field)),
    DateTimeField(
      {
        id: 'timeCreated',
        value: order.timeCreated,
        label: "Дата створення:"
      })
  ]

  return createElement(
    { tag: 'main' },
    [
      createElement({ tag: 'h1', textContent: `Замовлення №${order.id}` }),
      Fieldset(fields),
      ProductList(order.products),
      FormButtons()
    ]
  )
}



mountLayout(BaseLayout(OrderForm()), document.body)