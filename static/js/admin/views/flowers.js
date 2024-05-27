import { createElement } from '../../layout.js'
import { adminNavigationOptions } from '../../config.js'
import { EntityManagmentBase } from '../../components/entityManagment.js'


/**
 * 
 * @param {Flower} flower 
 * @returns 
 */
function FlowerCard(flower) {
  return createElement(
    { tag: 'a', className: 'flower-card', href: '/flowers/' + flower.id },
    [
      createElement({ tag: 'img', className: 'flower-card-thumbnail', src: '/img/flower.jpg' }),
      createElement({ tag: 'span', className: 'flower-card-name', textContent: flower.name }),
      createElement({ tag: 'span', className: 'flower-card-price', textContent: `${flower.price}гр/шт` })
    ]
  )
}


/**
 * 
 * @param {Flower[]} flowers 
 * @returns 
 */
function FlowerCards(flowers) {
  return createElement(
    { tag: 'div', className: 'flower-cards' },
    [
      ...flowers.map(flower => FlowerCard(flower))
    ]
  )
}


/**
 * 
 * @param {Flower[]} flowers 
 * @returns 
 */
export function Flowers(flowers) {
  const cards = FlowerCards(flowers)
  const main = EntityManagmentBase(adminNavigationOptions.flowers, cards, adminNavigationOptions.flowers.url + '/add')

  return main
}
