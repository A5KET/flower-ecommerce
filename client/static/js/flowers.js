import { createElement } from './utils.js'
import { addBaseLayout } from './base.js'
import { navigationOptions } from './config.js'
import { FlowerRepository } from './repositories.js'


export function Filter() {
  return createElement(
    { tag: 'div', className: 'filters' },
    [
      createElement({ tag: 'span', className: 'filter-text'})
    ]
  )
}


export function FlowerCard(flower) {
  return createElement(
    { tag: 'div', className: 'flower-card' },
    [
      createElement({ tag: 'img', className: 'flower-card-thumbnail', src: flower.thumbnail }),
      createElement({ tag: 'span', className: 'flower-card-name', textContent: flower.name }),
      createElement({ tag: 'span', className: 'flower-card-price', textContent: `${flower.price}гр/шт`})
    ]
  )
}


export function Searchbar() {
  return createElement(
    { tag: 'form', className: 'searchbar' },
    [
      createElement({ tag: 'input', placeholder: 'Пошук...' }),
      createElement(
        { tag: 'button', type: 'submit' },
        [
          createElement({ tag: 'img', src: '/img/loupe.svg' })
        ] 
      )
    ]
  )
}


function Pagination() {
  return createElement(
    { tag: 'div', className: 'pagination' },
    [
      createElement({ tag: 'img', src: '/img/arrow.svg' }),
      createElement({ tag: 'img', className: 'mirrored', src: '/img/arrow.svg'}),
      createElement({ tag: 'span', textContent: '1 2 ... 10'})
    ]
  )
}


function FlowersMain(flowers) {
  return createElement(
    { tag: 'main' },
    [
      Filter(),
      createElement(
        { tag: 'div', className: 'cards-wrapper' },
        [
          createElement(
            { tag: 'div', className: 'topbar-wrapper' },
            [
              Searchbar(),
              createElement({ tag: 'a', className: 'form-link', href: '/flowers/form', textContent: 'Додати' })
            ]
          ),
          createElement(
            { tag: 'div', className: 'flower-cards' },
            [
              ...flowers.map(flower => FlowerCard(flower))
            ]
          ),
          Pagination()
        ]
      ),
    ]
  )
}


const flowerRepository = new FlowerRepository()

flowerRepository.getFlowers().then((flowers) => {
  const main = FlowersMain(flowers)

  document.querySelector('main').replaceWith(main)
})


addBaseLayout(document.body, navigationOptions.flowers)