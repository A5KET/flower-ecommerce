import { createElement } from './utils.js'
import { navigationOptions } from './config.js'


export function Header(navigation) {
  const logo = HeaderLogo('/')

  const logoWrapper = createElement('div', 'logo-wrapper')
  logoWrapper.appendChild(logo)

  const navigationWrapper = createElement('div', 'navigation-wrapper')
  navigationWrapper.appendChild(navigation)

  const node = createElement('header')
  node.appendChild(logoWrapper)
  node.appendChild(navigationWrapper)

  return node
}


export function Footer() {
  const node = createElement('footer')

  return node
}


export function addBaseLayout(body) {
  const navigation = Navigation(navigationOptions)
  const header = Header(navigation)
  const footer = Footer()

  body.appendChild(header)
  body.appendChild(footer)
}