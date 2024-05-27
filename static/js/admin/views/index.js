import { AdminBaseLayout } from '../components/base.js'
import { createElement } from '../../layout.js'


export function Index() {
  return AdminBaseLayout(createElement({ tag: 'main' }))
}