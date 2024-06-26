/**
 * 
 * @param {Date} date 
 */
export function convertToDateTimeLocalString(date) {
  if (!date) {
    return undefined
  }

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}


/**
 * @type {Formatter}
 */
export function defaultFormat(value) {
  return value
}


/**
 * @param {string} locale 
 */
export function toLocaleStringFormat(locale) {
  /**
   * @param {Date} value
   */
  return (value) => value.toLocaleString(locale)
}


/**
 * 
 * @param {Object} object 
 * @param {FormField[]} fields 
 * @returns 
 */
export function formatObjectValues(object, fields) {
  const values = {
    
  }

  for (const field in fields) {
    const format = fields[field].format || defaultFormat

    values[field] = format(object[field])
  }

  return values
}