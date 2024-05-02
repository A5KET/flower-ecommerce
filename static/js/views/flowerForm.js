import { createElement } from '../layout.js'
import { BaseLayout } from '../components/base.js'
import { FormButtons, TextInputField } from '../components/forms.js'
import { ImageSlider } from '../components/slider.js'
import { Fieldset } from '../components/forms.js'


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


export function FlowerForm(flower) {
  return BaseLayout(FlowerFormMain(flower))
}