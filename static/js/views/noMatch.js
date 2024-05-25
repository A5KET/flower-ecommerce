import { BaseLayout } from '../components/base.js'
import { createElement } from '../layout.js'


export function NoMatch() {
  return BaseLayout(createElement({ tag: 'main' }, ['404']))
}