import { EntityManagmentTable, TableInfo } from '../../common/tables.js'
import { AdminBaseLayout } from '../components/base.js'
import { Form, FormButtons } from '../../common/forms.js'
import { toLocaleStringFormat } from '../../formats.js'


export function ReviewForm(review, onDelete) {

  return AdminBaseLayout(
    Form(
      undefined,
      [
        FormButtons(onDelete ? () => onDelete(review) : undefined, false)
      ]
    )
  )
}


export function Reviews(reviews) {
  const tableInfo = new TableInfo(
    {
      id: {
        heading: '№ відгуку'
      },
      author: {
        heading: 'Автор',
        format: author => author.name
      },
      createdAt: {
        heading: 'Дата створення',
        format: toLocaleStringFormat('en-GB')
      }
    }
  )

  return AdminBaseLayout(
    EntityManagmentTable(
      undefined,
      tableInfo,
      reviews
    )
  )
}