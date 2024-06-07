import { createElement } from '../../layout.js'
import { MainBaseLayout } from '../components/base.js'
import { Reviews } from '../components/review.js'


/**
 * 
 * @param {Flower} flower 
 * @param {Review[]} reviews 
 * @param {Function} onReviewSubmit 
 * @returns 
 */
export function Flower(flower, reviews, onReviewSubmit) {
  return MainBaseLayout(
    createElement(
      { tag: 'main' },
      [
        createElement(
          { tag: 'div', className: 'flower-info' },
          [
            createElement({ tag: 'img', src: '/img/flower.jpg' }),
            createElement(
              { tag: 'div' },
              [
                createElement({ tag: 'h1' }, [flower.name]),
                createElement({ tag: 'span', className: 'price' }, [`${flower.price} грн/шт`])
              ]
            )

          ]),
        Reviews(reviews, onReviewSubmit)
      ]
    )
  )
}