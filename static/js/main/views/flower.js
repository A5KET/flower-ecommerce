import { createElement } from '../../layout.js'
import { MainBaseLayout } from '../components/base.js'


function CommentForm(onSubmit) {
  return createElement(
    { tag: 'form', className: 'comment-form' },
    [
      createElement({ tag: 'input', name: 'author', placeholder: 'Ваше імʼя...' }),
      createElement({ tag: 'textarea', name: 'text', placeholder: 'Відгук....' }),
      createElement({ tag: 'button', type: 'submit', textContent: 'Написати відгук' })
    ]
  )
}


function Comment(comment) {
  return createElement(
    { tag: 'div', className: 'comment' },
    [ 
      createElement({ tag: 'span', className: 'author', textContent: comment.author }),
      createElement({ tag: 'span', className: 'text', textContent: comment.text }),
    ]
  )
}


export function Comments(comments) {
  return createElement(
    { tag: 'div', className: 'comments' },
    [
      CommentForm(),
      ...comments.map(comment => Comment(comment))
    ]
  )
}


export function Flower(flower, comments) {
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
        Comments(comments)
      ]
    )
  )
}