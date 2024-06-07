import { createElement } from '../../layout.js'
import { adminNavigationOptions, getNewEntityFormURL } from '../../config.js'
import { EntityManagmentBase } from '../../common/components/entityManagment.js'
import { getRelativePath } from '../../path.js'
import { AdminBaseLayout } from '../components/base.js'


/**
 * 
 * @param {Flower} flower 
 * @returns 
 */
function FlowerCard(flower, href) {
  return createElement(
    { tag: 'a', className: 'flower-card', href },
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
export function Flowers(flowers) {
  return AdminBaseLayout(
    EntityManagmentBase(
      createElement(
        { tag: 'div', className: 'flower-cards' },
        [
          ...flowers.map(flower => FlowerCard(flower, getRelativePath(flower.id.toString())))
        ]),
      getNewEntityFormURL(adminNavigationOptions.flowers.url)
    ),
  )
}
