import { createElement } from './utils.js'


export function TextInputField(field) {
  return createElement(
    { tag: 'div', className: 'text-field' },
    [
      createElement({ tag: 'label', for: field.id, textContent: field.label }),
      createElement({ tag: 'input', id: field.id, value: field.value})
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