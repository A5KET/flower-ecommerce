export function filterProperties(object, predicate) {
  const filteredObject = {}

  for (const key in object) {
    const value = object[key]

    if (predicate(value)) {
      filteredObject[key] = value
    }
  }

  return filteredObject
}


export function filterUndefinedProperties(object) {
  return filterProperties(object, property => property !== undefined)
}


export function createElement(props, children=[]) {
  const node = document.createElement(props.tag)
  const filteredProps = filterUndefinedProperties(props)

  Object.assign(node, filteredProps)

  for (const child of children) {
    const childNode = typeof child === 'object' ? child : createTextElement(child)
    node.appendChild(childNode)
  }

  return node
}


export function createTextElement(text) {
  return document.createTextNode(text)
}


export function Style(href) {
  return createElement(
    { tag: 'link', rel: 'stylesheet', href }
  )
}


export function mountLayout(layout, title, styles=[]) {
  styles.map(style => document.head.appendChild(Style(style)))
  document.body.replaceWith(layout)
  document.title = title
}

