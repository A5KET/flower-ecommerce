import { renameProperty } from './utils.js'


export function fromSnakeCaseToCamelCase(str) {
  return str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('_', '')
  )
}


export function renamePropertiesFromSnakeCaseToCamelCase(object) {
  Object.keys(object).forEach(key => {
    renameProperty(object, key, fromSnakeCaseToCamelCase(key))
  })
}