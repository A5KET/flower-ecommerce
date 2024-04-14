import { createElement } from './utils.js'
import { addBaseLayout } from './base.js'
import { navigationOptions } from './config.js'
import { FlowerRepository } from './repositories.js'


export function Filter() {
  const text = createElement('span', 'flowers-filter-text')
  text.textContent = 'Фільтр'

  const node = createElement('div', 'flowers-filter')
  node.appendChild(text)

  return node
}


export function FlowerCard(flower) {
  const thumbnail = createElement('img', 'flower-card-thumbnail')
  thumbnail.src = flower.thumbnail

  const name = createElement('span', 'flower-card-name')
  name.textContent = flower.name

  const price = createElement('span', 'flower-card-price')
  price.textContent = `${flower.price}гр/шт`

  const node = createElement('div', 'flower-card')
  node.appendChild(thumbnail)
  node.appendChild(name)
  node.appendChild(price)

  return node
}


export function Searchbar() {
  const input = createElement('input')
  input.placeholder = 'Пошук...'

  const icon = createElement('img')
  icon.src = '/img/loupe.svg'

  const button = createElement('button')
  button.type = 'submit'
  button.appendChild(icon)

  const node = createElement('form', 'flowers-searchbar')
  node.appendChild(input)
  node.appendChild(button)

  return node
}


function Pagination() {
  const leftArrow = createElement('img')
  leftArrow.src = '/img/arrow.svg'

  const rightArrow = createElement('img')
  rightArrow.src = '/img/arrow.svg'

  const text = createElement('span')
  text.textContent = '1 2 ... 10'

  const node = createElement('div', 'flowers-pagination')
  node.appendChild(leftArrow)
  node.appendChild(text)
  node.appendChild(rightArrow)

  return node
}


function FlowersMain(flowers) {
  const filter = Filter()

  const searchbar = Searchbar()

  const flowerFormLink = createElement('a', 'flower-form-link')
  flowerFormLink.textContent = 'Додати'
  flowerFormLink.href = '#'

  const flowerTopBarWrapper = createElement('div', 'flower-cards-topbar-wrapper')
  flowerTopBarWrapper.appendChild(searchbar)
  flowerTopBarWrapper.appendChild(flowerFormLink)

  const flowerCards = createElement('div', 'flower-cards')
  flowers.forEach(flower => flowerCards.appendChild(FlowerCard(flower)))

  const pagination = Pagination()

  const flowerCardsWrapper = createElement('div', 'flower-cards-wrapper')
  flowerCardsWrapper.appendChild(flowerTopBarWrapper)
  flowerCardsWrapper.appendChild(flowerCards)
  flowerCardsWrapper.appendChild(pagination)

  const node = createElement('main', 'flowers-main')
  node.appendChild(filter)
  node.appendChild(flowerCardsWrapper)

  return node
}


const flowerRepository = new FlowerRepository()

flowerRepository.getFlowers().then((flowers) => {
  const main = FlowersMain(flowers)

  document.querySelector('main').replaceWith(main)
})


addBaseLayout(document.body, navigationOptions.flowers)