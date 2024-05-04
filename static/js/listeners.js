export function addRedirectOnClick(node, href) {
  node.addEventListener('click', (event) => {
    event.view.location = href
  })

  node.classList.add('pointer-on-hover')
}