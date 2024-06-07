import { EntityManagmentBase } from '../../common/components/entityManagment.js'
import { mainNavigationOptions } from '../../config.js'
import { createElement } from '../../layout.js'
import { getRelativePath } from '../../path.js'
import { MainBaseLayout } from '../components/base.js'


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


export function MainFlowers(flowers) {
  return MainBaseLayout(
    EntityManagmentBase(
      createElement(
        { tag: 'div', className: 'flower-cards' },
        [
          ...flowers.map(flower => FlowerCard(flower, getRelativePath(flower.id.toString())))
        ])
    ),
    mainNavigationOptions.flowers
  )
  

}