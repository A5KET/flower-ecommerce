import { createElement } from './utils.js'
import { navigationOptions } from './config.js'
import { Navigation, Header } from './header.js'


export function Main() {
  const node = createElement('main')

  return node
}


export function Footer() {
  const node = createElement('footer')

  return node
}


export function addBaseLayout(body) {
  const navigation = Navigation(navigationOptions)
  const header = Header(navigation)
  const main = Main()
  const footer = Footer()

  body.appendChild(header)
  body.appendChild(main)
  body.appendChild(footer)
}