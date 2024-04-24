export function createElement(props, children=[]) {
  const node = document.createElement(props.tag)

  Object.assign(node, props)

  for (const child of children) {
    const childNode = typeof child === 'object' ? child : createTextElement(child)
    node.appendChild(childNode)
  }

  return node
}


export function createTextElement(text) {
  return document.createTextNode(text)
}
