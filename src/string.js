import { renameProperty } from './utils.js'


/**
 * 
 * @param {string} str 
 * @returns 
 */
export function fromSnakeCaseToCamelCase(str) {
  return str.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase())
}