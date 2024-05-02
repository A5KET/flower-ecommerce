import { BaseLayout } from '../components/base.js'
import { createElement } from '../layout.js'


export function Index() {
  return BaseLayout(createElement({ tag: 'main' }))
}