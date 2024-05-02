import { createElement } from '../layout.js'
import { convertToDateTimeLocalString } from '../formats.js'


export function TextInputField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', for: field.id, textContent: field.label }),
      createElement({ tag: 'input', id: field.id, value: field.value })
    ]
  )
}


export function DateTimeField(field) {
  return createElement(
    { tag: 'div', className: 'field' },
    [
      createElement({ tag: 'label', for: field.id, textContent: field.label }),
      createElement({ tag: 'input', id: field.id, value: convertToDateTimeLocalString(field.value), type:"datetime-local" })
    ]
  )
}


export function FormButtons() {
  return createElement(
    { tag: 'div', className: 'form-buttons'},
    [
      createElement({ tag: 'button', className: 'delete-button', textContent: 'Видалити' }),
      createElement({ tag: 'button', className: 'save-button', type: 'submit', textContent: 'Зберегти' })
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