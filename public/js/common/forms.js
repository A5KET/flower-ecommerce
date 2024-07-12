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


export function getFormDataOnSubmit(callback) {
  return function(event) {
    event.preventDefault()
    const form = event.target
    if (form.checkValidity()) {
      const data = getFormData(event.target)
      callback(data)
    }
  }
}


export function Form(callback, children) {

  const form = createElement(
    { tag: 'form' },
    children
  )

  form.addEventListener('submit', getFormDataOnSubmit(callback))

  return form
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
      createElement(Object.assign(field, { tag: 'input', type: 'number', className: 'field-input', name: field.name, value: field?.value }))
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
export function FormButtons(onRemove, saveButton=true) {
  return createElement(
    { tag: 'div', className: 'form-buttons' },
    [
      saveButton ? createElement({ tag: 'button', className: 'save-button', type: 'submit', textContent: 'Зберегти' }) : undefined,
      onRemove ? createElement({ tag: 'button', type: 'reset', className: 'delete-button', textContent: 'Видалити', onClick: onRemove }) : undefined
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