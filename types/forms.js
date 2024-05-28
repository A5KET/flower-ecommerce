/**
 * @callback Formatter
 * @param {any} value
 * @returns {any}
 */


/**
 * @typedef {Object} FormField
 * @property {string} name
 * @property {string} label
 * @property {boolean} [required]
 * @property {any} [value]
 * @property {Formatter} [format] 
 */


/**
 * @typedef {FormField & {
 *  minlength?: number
 * }} TextFormField
 */


/**
 * @typedef {FormField & {
 *  options: StatusOptions,
 *  activeOption: string
 * }} SelectFormField
 */


/**
 * @typedef {HTMLElement} FormFieldElement
 */