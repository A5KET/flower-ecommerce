import { createElement } from '../layout.js'
import { navigationOptions } from '../config.js'


export function HeaderLogo() {
  return createElement(
    { tag: 'a', className: 'header-logo', href: '/' },
    [
      createElement({ tag: 'img', src: '/img/logo.svg' }),
      createElement({ tag: 'span', className: 'logo-text', textContent: 'FloraShop' }),
      createElement({ tag: 'span', className: 'logo-subtext', textContent: 'Admin'})
    ]
  )
}


export function NavigationOption(option, isActive) {
  return createElement(
    { tag: 'a', className: 'navigation-option' + (isActive ? ' active': ''), href: option.url },
    [
      createElement({ tag: 'img', className: 'navigation-option-icon', src: option.icon }),
      createElement({ tag: 'span', className: 'navigation-option-text', textContent: option.title })
    ]
  )
}


export function Navigation(options, activeOption) {
  return createElement(
    { tag: 'nav', className: 'header-navigation' },
    [
      ...Object.values(options).map(option => NavigationOption(option, option === activeOption))
    ]
  )
}


export function Header(navigation) {
  return createElement(
    { tag: 'header' },
    [
      createElement(
        { tag: 'div', className: 'logo-wrapper' },
        [
          HeaderLogo()
        ]
      ),
      createElement(
        { tag: 'div', className: 'navigation-wrapper' },
        [
          navigation
        ]
      )
    ]
  )
}

export function Footer() {
  return createElement(
    { tag: 'footer' }
  )
}


export function BaseLayout(main, activeNavigationOption) {
  return createElement(
    { tag: 'body' },
    [
      Header(Navigation(navigationOptions, activeNavigationOption)),
      main,
      Footer()
    ]
  )
}