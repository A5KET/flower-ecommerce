import { createElement } from '../layout.js'


/**
 * 
 * @param {string[]} imagePaths 
 * @returns 
 */
export function ImageSlider(imagePaths) {
  return createElement(
    { tag: 'div', className: 'slider' },
    [
      createElement(
        { tag: 'div', className: 'main-image-wrapper' },
        [
          createElement({ tag: 'img', className: 'arrow', src: '/img/arrow.svg' }),
          createElement({ tag: 'img', className: 'main-image', src: '/img/flower.jpg' }),
          createElement({ tag: 'img', className: 'arrow mirrored', src: '/img/arrow.svg' }),
        ]
      ),
      createElement(
        { tag: 'div', className: 'slider-images' },
        [
          ...imagePaths.map(image => createElement({ tag: 'img', className: 'slider-image', src: '/img/flower.jpg' })),
          createElement({ tag: 'div', className: 'slider-image slider-images-button', textContent: 'Додати зображення' })
        ]
      )
    ]
  )
}