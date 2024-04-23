import { createElement } from './utils.js'


export function ImageSlider(images) {
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