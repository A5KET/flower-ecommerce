import { createElement } from './utils.js'
import { addBaseLayout } from './base.js'
import { navigationOptions } from './config.js'


function ImageSlider(images) {
  return createElement(
    { tag: 'div', className: 'slider' },
    [
      createElement(
        { tag: 'div', className: 'main-image-wrapper' },
        [
          createElement({ tag: 'img', className: 'arrow', src: '/img/arrow.svg' }),
          createElement({ tag: 'img', className: 'main-image', src: images[0].path }),
          createElement({ tag: 'img', className: 'arrow mirrored', src: '/img/arrow.svg' }),
        ]
      ),
      createElement(
        { tag: 'div', className: 'slider-images' },
        [
          ...images.map(image => createElement({ tag: 'img', className: 'slider-image', src: image.path })),
          createElement({ tag: 'div', className: 'slider-image slider-images-button', textContent: 'Додати зображення' })
        ]
      )
    ]
  )
}


function FlowerFormField(placeholder='') {
  return createElement({ tag: 'input', className: 'form-field', placeholder })
}


function FlowerForm() {
  return createElement(
    { tag: 'form' },
    [
      createElement(
        { tag: 'div', className: 'form-fields' },
        [
          FlowerFormField('Назва'),
          FlowerFormField('Колір'),
          FlowerFormField('Ціна')
        ]
      ),
      createElement({ tag: 'button', className: 'form-button', type: 'submit', textContent: 'Зберегти' })
    ]
  )
}


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

  return createElement(
    { tag: 'main' },
    [
      ImageSlider(sliderImages),
      FlowerForm()
    ]
  )
}


addBaseLayout(document.body, undefined)

document.querySelector('main').replaceWith(FlowerFormMain())