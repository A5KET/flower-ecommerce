import { createElement } from '../../layout.js'
import { AdminBaseLayout } from '../components/base.js'
import { FormButtons, TextInputField } from '../../common/components/forms.js'
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

  const textFields = [
    {
      id: 'name',
      label: 'Назва',
      value: 'Квітка'
    },
    {
      id: 'color',
      label: 'Колір',
      value: 'Рожевий'
    },
    {
      id: 'price',
      label: 'Ціна',
      value: 200
    }
  ]


  return createElement(
    { tag: 'main' },
    [
      createElement(
        { tag: 'form' },
        [
          ImageSlider(sliderImages),
          Fieldset(textFields.map(field => TextInputField(field))),
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
export function FlowerForm(flower) {
  return AdminBaseLayout(FlowerFormMain(flower))
}