import { createElement } from '../../layout.js'
import { adminNavigationOptions, getNewEntityFormURL } from '../../config.js'
import { EntityManagmentBase } from '../../common/entityManagment.js'
import { getRelativePath } from '../../path.js'
import { AdminBaseLayout } from '../components/base.js'
import { FormButtons, TextInputField, NumberInputField, Fieldset } from '../../common/forms.js'
import { ImageSlider } from '../../common/slider.js'




/**
 * 
 * @param {Flower} flower 
 * @returns 
 */
function FlowerFormMain(flower) {
  const sliderImages = [
    {
      'path': '/img/flower.jpg'
    },
    {
      'path': '/img/flower.jpg'
    },
    {
      'path': '/img/flower.jpg'
    },
  ]

  const fields = [
    TextInputField({
      id: 'name',
      label: 'Назва',
      value: flower.name
    }),
    TextInputField(
      {
        id: 'color',
        label: 'Колір',
        value: flower.color
      },
    ),
    NumberInputField(
      {
        id: 'price',
        label: 'Ціна',
        value: 200
      }
    )
  ]

  return createElement(
    { tag: 'main' },
    [
      createElement(
        { tag: 'form' },
        [
          ImageSlider(sliderImages),
          Fieldset(fields),
          FormButtons()
        ]
      )
    ]
  )
}


/**
 * 
 * @param {Flower | Object} flower 
 * @returns 
 */
export function FlowerForm(flower, onSave, onDelete) {
  return AdminBaseLayout(FlowerFormMain(flower))
}


export function NewFlowerForm(onSave) {
  return FlowerForm({}, onSave)
}


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
