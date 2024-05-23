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