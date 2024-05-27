import { NotFoundError } from './errors.js'
import { renamePropertiesFromCamelCaseToSnakeCase, renamePropertiesFromSnakeCaseToCamelCase } from './string.js'


export class Database {
  constructor(client) {
    this.client = client
  }

  async selectOne(table, id) {
    return this.executeSelectOne(`SELECT * FROM "${table}" WHERE id = $1`, [id])
  }

  async selectAll(table) {
    return this.executeSelectMany(`
      SELECT *
      FROM "${table}"
    `)
  }

  async executeSelectOne(query, values=[]) {
    return this.client.query(query, values)
      .then(result => result.rows[0])
      .then(entity => {
        if (!entity) {
          const error = new NotFoundError(`"${query}" was not found`)
          console.error(error)

          return error
        }

        return entity
      })
      .then(result => {
        renamePropertiesFromSnakeCaseToCamelCase(result)

        return result
      })
  }

  async executeSelectMany(query, values=[]) {
    return this.client.query(query, values)
      .then(result => result.rows)
      .then(result => {
        result.forEach(entity => renamePropertiesFromSnakeCaseToCamelCase(entity))

        return result
      })
  }

  async getFlowers() {
    return this.selectAll('flower')
  }

  async getFlower(id) {
    return this.selectOne('flower', id)
  }

  async getOrders() {
    return this.selectAll('order')
  }

  async getOrder(id) {
    return this.selectOne('order', id)
  }

  async getOrderFlowers(orderId) {
    return this.executeSelectMany(`
      SELECT flower.*, orderflowers.amount as amount
      FROM orderflowers
      JOIN flower ON orderflowers.flower_id = flower.id
      WHERE orderflowers.order_id = $1
    `, [orderId])
  }

  async addOrder(order) {
    return this.insert('order', order, ['statusId', 'customerId', 'timeCreated'])
  }
}