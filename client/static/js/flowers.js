import { createElement } from './utils.js'
import { BaseLayout, mountLayout } from './base.js'
import { navigationOptions } from './config.js'
import { FlowerRepository } from './repositories.js'
import { EntityManagmentBase } from './entityManagment.js'


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


function FlowerCards(flowers) {
  return createElement(
    { tag: 'div', className: 'flower-cards' },
    [
      ...flowers.map(flower => FlowerCard(flower))
    ]
  )
}


const flowerRepository = new FlowerRepository()
flowerRepository.getFlowers().then(flowers => {
  const cards = FlowerCards(flowers)
  const main = EntityManagmentBase(navigationOptions.flowers, cards, '/flowers/form')
  
  mountLayout(main, document.body)
})
