import { createElement } from '../../layout.js'
import { adminNavigationOptions, getNewEntityFormURL } from '../../config.js'
import { EntityManagmentBase } from '../../common/entityManagment.js'
import { getRelativePath } from '../../path.js'
import { AdminBaseLayout } from '../components/base.js'
import { FormButtons, TextInputField, NumberInputField, Fieldset, getFormDataOnSubmit, Form } from '../../common/forms.js'
import { ImageSlider } from '../../common/slider.js'


/**
 * 
 * @param {Flower | Object} flower 
 * @param {Function} onSave
 * @param {Function} onDelete
 * @returns 
 */
export function FlowerForm(flower, onSave, onDelete) {
  function onFormSave(savedFlower) {
    savedFlower.id = flower.id
    onSave(savedFlower)
  }

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
    TextInputField(
      {
        name: 'name',
        label: 'Назва',
        value: flower.name,
        required: true
      }
    ),
    TextInputField(
      {
        name: 'color',
        label: 'Колір',
        value: flower.color,
        required: true
      },
    ),
    NumberInputField(
      {
        name: 'price',
        label: 'Ціна',
        value: flower.price,
        min: 0,
        required: true
      }
    )
  ]

  return AdminBaseLayout(
    createElement(
      { tag: 'main' },
      [
        Form(
          onFormSave,
          [
            ImageSlider(sliderImages),
            Fieldset(fields),
            FormButtons(onDelete ? () => onDelete(flower) : undefined)
          ],
        )
      ]
    ))
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
      createElement({ tag: 'span', className: 'flower-card-price', textContent: `${flower.price} гр/шт` })
    ]
  )
}


/**
 * 
 * @param {Flower[]} flowers 
 * @returns 
 */
export function Flowers(flowers, newEntityFormURL) {
  return AdminBaseLayout(
    EntityManagmentBase(
      createElement(
        { tag: 'div', className: 'flower-cards' },
        [
          ...flowers.map(flower => FlowerCard(flower, getRelativePath(flower.id.toString())))
        ]),
      newEntityFormURL
    ),
  )
}
