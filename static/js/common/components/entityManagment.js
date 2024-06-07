import { AdminBaseLayout } from '../../admin/components/base.js'
import { createElement } from '../../layout.js'


export function Searchbar() {
  return createElement(
    { tag: 'form', className: 'searchbar' },
    [
      createElement({ tag: 'input', placeholder: 'Пошук...' }),
      createElement(
        { tag: 'button', type: 'submit' },
        [
          createElement({ tag: 'img', src: '/img/loupe.svg' })
        ]
      )
    ]
  )
}


export function Filter() {
  return createElement(
    { tag: 'div', className: 'filters' },
    [
      createElement({ tag: 'div', className: 'filters-heading', textContent: 'Фільтр' })
    ]
  )
}


function Pagination() {
  return createElement(
    { tag: 'div', className: 'pagination' },
    [
      createElement({ tag: 'img', src: '/img/arrow.svg' }),
      createElement({ tag: 'span', textContent: '1 2 ... 10' }),
      createElement({ tag: 'img', className: 'mirrored', src: '/img/arrow.svg' })
    ]
  )
}


/**
 * 
 * @param {NavigationOption} activeNavigationOption 
 * @param {HTMLElement} content 
 * @param {string} [newEntityFormHref]
 * @returns 
 */
export function EntityManagmentBase(content, newEntityFormHref) {
  return createElement(
    { tag: 'main' },
    [
      Filter(),
      createElement(
        { tag: 'div', className: 'content-wrapper' },
        [
          createElement(
            { tag: 'div', className: 'topbar-wrapper' },
            [
              Searchbar(),
              newEntityFormHref ? createElement({ tag: 'a', className: 'form-link', href: newEntityFormHref, textContent: 'Додати' }) : undefined
            ]
          ),
          content,
          Pagination()
        ]
      ),
    ]
  )
}