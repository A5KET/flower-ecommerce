import { fromSnakeCaseToCamelCase } from './string.js'


export function renameObjectKey(object, oldKey, newKey) {
  if (oldKey !== newKey) {
    Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey))
    delete object[oldKey]
  }
}


export function isDefined(value) {
  return (typeof value !== 'undefined')
}


export function areDefined(...values) {
  return values.every(isDefined)
}


export function renameObjectPropertiesFromSnakeCaseToCamelCase(object) {
  for (const key in object) {
    const newKey = fromSnakeCaseToCamelCase(key)
    renameObjectKey(object, key, newKey)
  }

  return object
}
