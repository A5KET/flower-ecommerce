import { mountLayout, BaseLayout } from './base.js'
import { createElement } from './utils.js'


export function Main() {
  return createElement(
    { tag: 'main' }
  )
}


mountLayout(BaseLayout(Main()), document.body)