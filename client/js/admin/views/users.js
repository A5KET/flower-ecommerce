import { AdminBaseLayout } from '../components/base.js'
import { EntityManagmentTable } from '../../common/tables.js'


export function Users() {
  return AdminBaseLayout(EntityManagmentTable())
}