import { createElement } from './utils.js'
import { navigationOptions } from './config.js'


export function HeaderLogo(url) {
  const icon = createElement('img')
  icon.src = '/img/logo.svg'

  const text = createElement('span', 'logo-text')
  text.textContent = 'FloraShop'

  const subtext = createElement('span', 'logo-subtext')
  subtext.textContent = 'Admin'

  const node = createElement('a', 'header-logo')
  node.href = '/'
  node.appendChild(icon)
  node.appendChild(text)
  node.appendChild(subtext)

  return node
}


export function NavigationOption(option, isActive) {
  const icon = createElement('img', 'navigation-option-icon')
  icon.src = option.icon

  const text = createElement('span', 'navigation-option-text')
  text.textContent = option.title

  const node = createElement('a', 'navigation-option')
  node.href = option.url

  if (isActive) {
    node.classList.add('active')
  }

  node.appendChild(icon)
  node.appendChild(text)

  return node
}


export function Navigation(options, activeOption) {
  const node = createElement('nav', 'header-navigation')

  Object.values(options).forEach((option) => node.appendChild(NavigationOption(option,  option === activeOption)))

  return node
}


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
