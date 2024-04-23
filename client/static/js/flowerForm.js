import { createElement } from './utils.js'
import { BaseLayout, mountLayout } from './base.js'
import { FormButtons, TextInputField } from './forms.js'
import { ImageSlider } from './slider.js'
import { Fieldset } from './forms.js'


function FlowerFormMain() {
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


mountLayout(BaseLayout(FlowerFormMain()), document.body)