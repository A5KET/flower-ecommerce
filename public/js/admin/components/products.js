import { createElement } from '../../layout.js'
import { NumberInputField, getFormDataOnSubmit } from '../../common/forms.js'


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


function ProductSelect(products) {
  return createElement(
    { tag: 'select' },
    [
      ...products.map(product => createElement({ tag: 'option', value: product.id, textContent: `${product.name} ${product.price} грн/шт` }))
    ]
  )
}


/**
 * 
 * @param {Product[]} possibleProducts
 * @param {Function} onSubmit 
 */
function ProductListElementForm(possibleProducts, onSubmit) {
  function onFormSubmit(data) {
    const chosenId = productSelect.options[productSelect.selectedIndex].value

    const product = possibleProducts.find(possibleProduct => possibleProduct.id == chosenId)
    product.amount = data.amount

    onSubmit(product)
  }

  const productSelect = ProductSelect(possibleProducts)


  return createElement(
    { tag: 'form', className: 'product product-form', onSubmit: getFormDataOnSubmit(onFormSubmit) },
    [
      productSelect,
      createElement({ tag: 'span', textContent: 'x' }),
      NumberInputField({ name: 'amount', placeholder: '- - -', required: true }),
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
export function ProductList(products, possibleProducts) {
  /** @param {Product} product */
  function onProductListAdding(product) {
    products.push(product)
    node.replaceWith(ProductList(products, possibleProducts))
  }

  /** @param {Product} product */
  function onProductRemoving(product) {
    const index = products.indexOf(product)
    products.splice(index, 1)
    node.replaceWith(ProductList(products, possibleProducts))
  }

  const totalPrice = products.reduce((cur, product) => cur + (product.price * product.amount), 0)

  const node = createElement(
    { tag: 'div', className: 'products' },
    [
      ...products.map(product => ProductListElement(product, onProductRemoving)),
      ProductListElementForm(possibleProducts, onProductListAdding),
      createElement({ tag: 'span', className: 'total-price', textContent: `Повна ціна: ${totalPrice} грн.` })
    ]
  )

  return node
}