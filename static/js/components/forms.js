import { createElement } from '../layout.js'
import { convertToDateTimeLocalString } from '../formats.js'
import { objectMap } from '../utils.js'


export function TextInputField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', for: field.id, textContent: field.label }),
      createElement({ tag: 'input', className: 'field-input', id: field.id, value: field?.value })
    ]
  )
}


export function DateTimeField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', for: field.id, textContent: field.label }),
      createElement({ tag: 'input', className: 'field-input', id: field.id, value: convertToDateTimeLocalString(field?.value), type: 'datetime-local' })
    ]
  )
}


export function SelectOption(value, text, isActive) {
  return createElement(
    { tag: 'option', value: value, active: isActive },
    [
      text
    ]
  )
}


export function SelectField(field) {
  const options = field.options

  return createElement(
    { tag: 'div', className: 'field select-field' },
    [
      createElement({ tag: 'label', for: field.id, textContent: field.label }),
      createElement(
        { tag: 'select', className: 'field-input', id: field.id },
        [
          ...objectMap((key, value) => SelectOption(key, value, value === field.active), options) 
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


export function Fieldset(fields) {
  return createElement(
    { tag: 'fieldset' },
    [
      ...fields
    ]
  )
}