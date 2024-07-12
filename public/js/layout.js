/**
 * 
 * @param {string} key 
 * @returns 
 */
const isEvent = key => key.startsWith('on')

/**
 * 
 * @param {Object} object 
 * @param {function(any): boolean} predicate 
 * @returns 
 */
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


/**
 * 
 * @param {Object} object 
 * @returns 
 */
export function filterUndefinedProperties(object) {
  return filterProperties(object, property => property !== undefined)
}


/**
 * 
 * @param {Object} props 
 * @param {HTMLElement} node 
 */
function addEventListeners(props, node) {
  Object.keys(props).filter(isEvent)
    .forEach(property => {
      const eventType = property.toLowerCase().substring(2)
      node.addEventListener(eventType, props[property])
    })
}


/**
 * 
 * @param {LayoutElement} props 
 * @param {(LayoutElement|string)[]} children 
 * @returns {HTMLElement}
 */
export function createElement(props, children = []) { // #TODO make components as object and create them after
  const node = document.createElement(props.tag)
  const filteredProps = filterUndefinedProperties(props)

  addEventListeners(filteredProps, node)

  Object.assign(node, filteredProps)

  for (const child of children) {
    if (child == undefined) {
      continue
    }

    const childNode = typeof child === 'object' ? child : createTextElement(child)
    // @ts-ignore
    node.appendChild(childNode)
  }

  return node
}


/**
 * 
 * @param {string} text 
 */
export function createTextElement(text) {
  return document.createTextNode(text)
}


/**
 * 
 * @param {string} href 
 * @returns 
 */
export function Style(href) {
  return createElement(
    { tag: 'link', rel: 'stylesheet', href }
  )
}


/**
 * 
 * @param {HTMLElement} layout 
 * @param {string} title 
 * @param {string[]} styleSources 
 */
export function mountLayout(layout, title, styleSources = []) {
  document.body.style.visibility = 'hidden'
  styleSources.forEach(style => document.head.appendChild(Style(style)))
  document.body.replaceWith(layout)
  document.title = title
}

