/**
 * 
 * @param {string} path 
 * @param {boolean} addTrailingSlash 
 * @returns 
 */
export function getRelativePath(path, addTrailingSlash=true) {
  let currentPath = window.location.href
  currentPath += addTrailingSlash && currentPath.endsWith('/') ? '' : '/'
  const absolutePath = new URL(path, currentPath)

  return absolutePath.href
}


export function redirect(path) {
  window.location.pathname = path
}