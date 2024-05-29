import { createElement } from '../../layout.js'
import { MainBaseLayout } from '../components/base.js'


export function Comments(comments) {
  return createElement(
    { tag: 'div' },
    [
      
    ]
  )
}


export function Flower(flower, comments) {
  return MainBaseLayout(
    createElement(
      { tag: 'main' },
      [
        Comments(comments)
      ]
    )
  )
}