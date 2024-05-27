import { AdminBaseLayout } from '../admin/components/base.js'
import { createElement } from '../layout.js'


export function NoMatch() {
  return AdminBaseLayout(createElement({ tag: 'main' }, ['404']))
}