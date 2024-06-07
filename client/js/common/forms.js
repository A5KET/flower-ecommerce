import { createElement } from '../layout.js'
import { convertToDateTimeLocalString } from '../formats.js'
import { objectMap } from '../utils.js'


/**
 * 
 * @param {HTMLFormElement} form 
 * @returns {Object}
 */
export function getFormData(form) {
  const formData = new FormData(form)

  return Object.fromEntries(formData)
}


/**
 * 
 * @param {TextFormField} field 
 * @returns 
 */
export function TextInputField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', name: field.name, textContent: field.label }),
      createElement({ tag: 'input', className: 'field-input', name: field.name, value: field?.value })
    ]
  )
}


export function NumberInputField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', name: field.name, textContent: field.label }),
      createElement({ tag: 'input', type: 'number', className: 'field-input', name: field.name, value: field?.value })
    ]
  )
}


/**
 * 
 * @param {FormField} field 
 * @returns 
 */
export function DateTimeField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', for: field.name, textContent: field.label }),
      createElement({ tag: 'input', className: 'field-input', name: field.name, value: convertToDateTimeLocalString(field?.value), type: 'datetime-local' })
    ]
  )
}


/**
 * 
 * @param {any} value 
 * @param {string} text 
 * @param {boolean} isActive 
 * @returns 
 */
export function SelectOption(value, text, isActive) {
  return createElement(
    { tag: 'option', value: value, active: isActive },
    [
      text
    ]
  )
}


/**
 * 
 * @param {SelectFormField} field 
 * @returns 
 */
export function SelectField(field) {
  const options = field.options

  return createElement(
    { tag: 'div', className: 'field select-field' },
    [
      createElement({ tag: 'label', for: field.name, textContent: field.label }),
      createElement(
        { tag: 'select', className: 'field-input', name: field.name },
        [
          ...objectMap((key, value) => SelectOption(key, value, value === field.activeOption), options) 
        ]
      )
    ]
  )
}


/**
 * 
 * @param {Function} onSave 
 * @param {Function} onRemove 
 * @returns 
 */
export function FormButtons(onSave, onRemove) {
  return createElement(
    { tag: 'div', className: 'form-buttons' },
    [
      createElement({ tag: 'button', className: 'save-button', type: 'submit', textContent: 'Зберегти', onClick: onSave }),
      onRemove ? createElement({ tag: 'button', className: 'delete-button', textContent: 'Видалити', onClick: onRemove }) : ''
    ]
  )
}


/**
 * 
 * @param {FormFieldElement[]} fields 
 * @returns 
 */
export function Fieldset(fields) {
  return createElement(
    { tag: 'fieldset' },
    [
      ...fields
    ]
  )
}