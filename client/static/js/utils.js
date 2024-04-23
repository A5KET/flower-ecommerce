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


function defaultFormat(value) {
  return value
}


export function formatObjectValues(object, fields) {
  const values = []

  for (const field in fields) {
    const format = fields[field].format || defaultFormat

    values.push(format(object[field]))
  }

  return values
}