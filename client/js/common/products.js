import { createElement } from '../layout.js'
import { getFormData } from './forms.js'


/**
 * 
 * @param {Product} product 
 * @param {Function} onRemove 
 */
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


/**
 * 
 * @param {Function} onSubmit 
 */
function ProductListElementForm(onSubmit) {
  function onFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const isFormValid = form.checkValidity()

    if (!isFormValid) {
      return
    }

    const data = getFormData(form)
    onSubmit(data)
  }

  return createElement(
    { tag: 'form', className: 'product product-form', onSubmit: onFormSubmit },
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


/** @param {Product[]} products */
export function ProductList(products) {
  /** @param {Product} product */
  function onProductListAdding(product) {
    products.push(product)
    node.replaceWith(ProductList(products))
  }

  /** @param {Product} product */
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