/**
 * 
 * @param {Object} object 
 * @param {string} oldKey 
 * @param {string} newKey 
 */
export function renameProperty(object, oldKey, newKey) {
  if (oldKey !== newKey) {
    Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey))
    delete object[oldKey]
  }
}
