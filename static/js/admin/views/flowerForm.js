import { createElement } from '../../layout.js'
import { AdminBaseLayout } from '../components/base.js'
import { FormButtons, TextInputField, NumberInputField } from '../../common/components/forms.js'
import { ImageSlider } from '../../common/components/slider.js'
import { Fieldset } from '../../common/components/forms.js'


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