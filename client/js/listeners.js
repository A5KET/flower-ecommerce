/**
 * Registers `click` handler that redirect to the specified `href`
 * @param {HTMLElement} node 
 * @param {string} href 
 */
export function addRedirectOnClick(node, href) {
  node.addEventListener('click', (event) => {
    event.view.location = href
  })

  node.classList.add('pointer-on-hover')
}