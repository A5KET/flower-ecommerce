import { renameProperty } from './utils.js'


/**
 * 
 * @param {string} str 
 * @returns 
 */
export function fromSnakeCaseToCamelCase(str) {
  return str.replace(/_([a-z])/g, (group) =>  group[1].toUpperCase());
}


/**
 * 
 * @param {string} str 
 */
export function fromCamelCaseToSnakeCase(str) {
  return str.match(/([A-Z])/g)
    .reduce(
      (string, c) => string.replace(new RegExp(c), '_' + c.toLowerCase()), 
      str
    )
    .substring((str.slice(0, 1).match(/([A-Z])/g)) ? 1 : 0)
}


export function renamePropertiesFromSnakeCaseToCamelCase(object) {
  if (!object) {
    return object
  }

  Object.keys(object).forEach(key => {
    renameProperty(object, key, fromSnakeCaseToCamelCase(key))
  })
}


export function renamePropertiesFromCamelCaseToSnakeCase(object) {
  if (!object) {
    return object
  }

  Object.keys(object).forEach(key => {
    renameProperty(object, key, fromCamelCaseToSnakeCase(key))
  })
}