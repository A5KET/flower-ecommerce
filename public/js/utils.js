/**
 * @template V
 * @callback ObjectMapCallback
 * @param {ObjectKey} key
 * @param {V} value
 * @returns {any}
 */

/**
 * @template V
 * @param {ObjectMapCallback<V>} callback 
 * @param {Object<ObjectKey, V>} object 
 * @returns 
 */
export function objectMap(callback, object) {
  const result = []

  for (const key in object) {
    result.push(callback(key, object[key]))
  }

  return result
}


export function hasTrailingSlash(string) {
  return string.length > 1 && string.slice(-1) == '/'
}


export function removeTrailingSlash(string) {
  return string.replace(/\/$/, '')
}


/**
 * @type {RouteChecker} 
 * */
function defaultRouteChecker(routePath, pathToCheck) {
  const regex = new RegExp('^' + routePath.replace(/\/:([^/]+)/g, '/([^/]+)').replace(/\/\*/g, '/.*') + '$')

  return regex.test(pathToCheck)
}
