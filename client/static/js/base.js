import { createElement } from './utils.js'
import { navigationOptions } from './config.js'
import { Navigation, Header } from './header.js'


export function Main() {
  return createElement(
    { tag: 'main' }
  )
}


export function Footer() {
  return createElement(
    { tag: 'footer' }
  )
}


export function addBaseLayout(body, activeNavigationOption) {
  const navigation = Navigation(navigationOptions, activeNavigationOption)
  const header = Header(navigation)
  const main = Main()
  const footer = Footer()

  body.appendChild(header)
  body.appendChild(main)
  body.appendChild(footer)
}