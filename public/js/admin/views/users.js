import { AdminBaseLayout } from '../components/base.js'
import { EntityManagmentTable } from '../../common/tables.js'
import { TableInfo } from '../../common/tables.js'
import { Form, FormButtons } from '../../common/forms.js'


export function UserForm(user, onSave, onRemove) {
  function onFormSave() {
    onSave(user)
  }

  return AdminBaseLayout(
    Form(
      onFormSave,
      [
        FormButtons(onRemove ? () => onRemove(user) : undefined)
      ]
    )
  )
}


export function Users(users) {
  const tableInfo = new TableInfo(
    {
      id: {
        heading: '№ користувача'
      },
      name: {
        heading: 'Імʼя користувача'
      }
    }
  )

  return AdminBaseLayout(
    EntityManagmentTable(
      undefined,
      tableInfo,
      users
    )
  )
}