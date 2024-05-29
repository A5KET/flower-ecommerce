import { AdminBaseLayout } from '../components/base.js'
import { createElement } from '../../layout.js'


export function AdminIndex() {
  return AdminBaseLayout(createElement({ tag: 'main' }))
}