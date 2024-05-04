import { createElement } from '../layout.js'
import { navigationOptions } from '../config.js'
import { EntityManagmentBase } from '../components/entityManagment.js'


function FlowerCard(flower) {
  return createElement(
    { tag: 'a', className: 'flower-card', href: '/flowers/' + flower.id },
    [
      createElement({ tag: 'img', className: 'flower-card-thumbnail', src: flower.thumbnail }),
      createElement({ tag: 'span', className: 'flower-card-name', textContent: flower.name }),
      createElement({ tag: 'span', className: 'flower-card-price', textContent: `${flower.price}гр/шт` })
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


export function Flowers(flowers) {
  const cards = FlowerCards(flowers)
  const main = EntityManagmentBase(navigationOptions.flowers, cards, navigationOptions.flowers.url + '/add')

  return main
}
