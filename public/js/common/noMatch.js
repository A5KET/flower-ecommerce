import { createElement } from '../layout.js'


export function NoMatch() {
  return createElement({ tag: 'main' }, ['404'])
}