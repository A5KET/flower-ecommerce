import { createElement } from '../../layout.js'
import { mainNavigationOptions } from '../../config.js'


export function MainHeaderLogo(indexUrl) {
  return createElement(
    { tag: 'a', className: 'header-logo', href: indexUrl },
    [
      createElement({ tag: 'img', src: '/img/logo.svg' }),
      createElement({ tag: 'span', className: 'logo-text', textContent: 'FloraShop' }),
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


export function Header(navigation, indexUrl) {
  return createElement(
    { tag: 'header' },
    [
      createElement(
        { tag: 'div', className: 'logo-wrapper' },
        [
          MainHeaderLogo(indexUrl)
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


export function MainBaseLayout(main, activeNavigationOption) {
  return createElement(
    { tag: 'body' },
    [
      Header(Navigation(mainNavigationOptions, activeNavigationOption), '/'),
      main,
      Footer()
    ]
  )
}