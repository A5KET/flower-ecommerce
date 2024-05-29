import { MainBaseLayout } from '../components/base.js'
import { createElement } from '../../layout.js'


export function MainIndex() {
  return MainBaseLayout(createElement({ tag: 'main' }))
}