import { createElement } from '../../layout.js'
import { formatObjectValues } from '../../formats.js'
import { EntityManagmentBase } from './entityManagment.js'
import { addRedirectOnClick } from '../../listeners.js'
import { getRelativePath } from '../../path.js'


export const orderOption = {
  ascending: 'ascending',
  descending: 'descending',
  none: null
}


export class TableInfo {
  constructor(fields, orderBy, order) {
    this.fields = fields
    this.orderBy = orderBy
    this.order = order
    this.headings = Object.keys(fields).map(key => fields[key].heading)
  }
}


function HeadingIcon(orderBy) {
  /** @type {LayoutElement} */
  const node = createElement({ tag: 'img', className: 'heading-icon' })

  if (orderBy == orderOption.ascending) {
    node.src = '/img/orderAscending.svg'
  }
  else if (orderBy == orderOption.descending) {
    node.src = '/img/orderDescending.svg'
  }
  else {
    node.src = '/img/orderNone.svg'
  }

  return node
}


function HeadingElement(text, order) {
  return createElement(
    { tag: 'th', className: 'heading-element-wrapper', scope: 'col' },
    [
      createElement(
        { tag: 'div', className: 'heading-element' },
        [
          text,
          HeadingIcon(order)
        ]
      )
    ]
  )
}


export function TableCell(value) {
  return createElement(
    { tag: 'td' },
    [value]
  )
}


export function TableRow(cells) {
  return createElement(
    { tag: 'tr' },
    [
      ...cells
    ]
  )
}


export function Heading(fields, orderBy, order) {
  return TableRow(fields.map(field => HeadingElement(field, field === orderBy ? order : orderOption.none)))
}


export function EntityTable(tableInfo, entities) {
  const formattedEntities = entities.map(entity => formatObjectValues(entity, tableInfo.fields))
  const rows = []

  for (const entity of formattedEntities) {
    const values = Object.values(entity)
    const cells = []

    for (const value of values) {
      cells.push(TableCell(String(value)))
    }

    const row = TableRow(cells)
    addRedirectOnClick(row, getRelativePath(entity.id))
    rows.push(row)
  }

  return createElement(
    { tag: 'table' },
    [
      Heading(tableInfo.headings, tableInfo.orderBy, tableInfo.order),
      ...rows
    ]
  )
}


export function EntityManagmentTable(newEntityFormLink, tableInfo, entities) {
  return EntityManagmentBase(
    EntityTable(tableInfo, entities),
    newEntityFormLink 
  )
}