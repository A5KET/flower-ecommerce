export function createElement(tag, className) {
  const node = document.createElement(tag)

  if (className) {
    node.className = className
  }

  return node
}
