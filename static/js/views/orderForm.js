import { BaseLayout } from '../components/base.js'
import { Fieldset, FormButtons, TextInputField, DateTimeField, SelectField } from '../components/forms.js'
import { createElement } from '../layout.js'


function ProductListElement(product, onRemove) {
  function onRemoveButtonClick(event) {
    onRemove(product)
  }

  return createElement(
    { tag: 'div', className: 'product' },
    [
      createElement({ tag: 'span', className: 'product-name', textContent: product.name }),
      createElement(
        {
          tag: 'span',
          textContent: `${product.price} гр/шт x ${product.amount} = ${product.price * product.amount} грн.`,
        }),
      createElement(
        { tag: 'button', className: 'product-button', onclick: onRemoveButtonClick },
        [
          createElement({ tag: 'img', src: '/img/cross.svg' })
        ]
      )
    ]
  )
}

function ProductListElementForm(onSubmit) {
  function onFormSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    onSubmit(Object.fromEntries(data))
  }

  return createElement(
    { tag: 'form', className: 'product product-form', onsubmit: onFormSubmit },
    [
      createElement({ tag: 'input', className: 'product-name', name: 'name', placeholder: 'Назва товару...', required: true }),
      createElement({ tag: 'input', name: 'amount', placeholder: '- - -', required: true, size: 1, type: 'number', min: 0 }),
      'гр/шт x ',
      createElement({ tag: 'input', name: 'price', placeholder: '- - -', required: true, size: 1, type: 'number', min: 0 }),
      createElement(
        { tag: 'button', className: 'product-button', type: 'submit' },
        [
          createElement({ tag: 'img', src: '/img/add.svg' })
        ]
      )
    ]
  )
}


/** @param {Array} products */
function ProductList(products) {
  function onProductListAdding(product) {
    products.push(product)
    node.replaceWith(ProductList(products))
  }

  function onProductRemoving(product) {
    const index = products.indexOf(product)
    products.splice(index, 1)
    node.replaceWith(ProductList(products))
  }

  const totalPrice = products.reduce((cur, product) => cur + (product.price * product.amount), 0)

  const node = createElement(
    { tag: 'div', className: 'products' },
    [
      ...products.map(product => ProductListElement(product, onProductRemoving)),
      ProductListElementForm(onProductListAdding),
      createElement({ tag: 'span', className: 'total-price', textContent: `Повна ціна: ${totalPrice} грн.` })
    ]
  )

  return node
}


function OrderFormMain(order, statusOptions) {
  const fields = [
    SelectField(
      {
        id: 'status',
        options: statusOptions,
        active: order.status,
        label: 'Статус:',
        required: true 
      }
    ),
    TextInputField(
      {
        id: 'customer',
        value: order.customer,
        label: 'Замовник:',
        required: true
      }
    ),
    DateTimeField(
      {
        id: 'timeCreated',
        value: order.timeCreated || new Date(),
        label: 'Дата створення:',
        required: true
      })
  ]

  return createElement(
    { tag: 'main' },
    [
      createElement({ tag: 'h1', textContent: `Замовлення №${order.id || ''}` }),
      Fieldset(fields),
      ProductList(order.products || []),
      FormButtons()
    ]
  )
}


export function OrderForm(order, statusOptions) {
  return BaseLayout(OrderFormMain(order, statusOptions))
}

export function NewOrderForm(statusOptions) {
  return OrderForm({}, statusOptions)
}
