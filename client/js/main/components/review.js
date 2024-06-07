import { createElement } from '../../layout.js'


/**
 * 
 * @param {Function} onSubmit 
 * @returns 
 */
function ReviewForm(onSubmit) {
  return createElement(
    { tag: 'form', className: 'review-form' },
    [
      createElement({ tag: 'input', name: 'author', placeholder: 'Ваше імʼя...' }),
      createElement({ tag: 'textarea', name: 'text', placeholder: 'Відгук....' }),
      createElement({ tag: 'button', type: 'submit', textContent: 'Написати відгук' })
    ]
  )
}


/**
 * 
 * @param {Review} review 
 * @returns 
 */
function Review(review) {
  return createElement(
    { tag: 'div', className: 'reviews' },
    [ 
      createElement({ tag: 'span', className: 'author', textContent: review.author }),
      createElement({ tag: 'span', className: 'text', textContent: review.text }),
    ]
  )
}


/**
 * 
 * @param {Review[]} reviews 
 * @param {Function} onSubmit 
 * @returns 
 */
export function Reviews(reviews, onSubmit) {
  return createElement(
    { tag: 'div', className: 'reviews' },
    [
      ReviewForm(onSubmit),
      ...reviews.map(comment => Review(comment))
    ]
  )
}