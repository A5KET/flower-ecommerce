import { MainBaseLayout } from '../../main/components/base.js'
import { createElement } from '../../layout.js'


export function NoMatch() {
  return MainBaseLayout(createElement({ tag: 'main' }, ['404']))
}