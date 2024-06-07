import { AdminBaseLayout } from '../components/base.js'
import { EntityManagmentTable } from '../../common/components/tables.js'


export function Users() {
  return AdminBaseLayout(EntityManagmentTable())
}