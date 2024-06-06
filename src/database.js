import { renamePropertiesFromSnakeCaseToCamelCase } from './string.js'
import { renameObjectPropertiesFromSnakeCaseToCamelCase } from './utils.js'


export class Database {
  constructor(client) {
    this.client = client
  }

  createTables() {
    this.client.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(256) NOT NULL,
      email VARCHAR(256) NOT NULL UNIQUE,
      password VARCHAR(256) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS session (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES "user" (id) UNIQUE,
      token VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS review (
      id SERIAL PRIMARY KEY,
      user_id SERIAL REFERENCES "user" (id) NOT NULL,
      text VARCHAR(8192)
    );

    CREATE TABLE IF NOT EXISTS flower (
      id SERIAL PRIMARY KEY,
      name VARCHAR(256) UNIQUE NOT NULL,
      color VARCHAR(256) NOT NULL,
      price INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "order" (
      id SERIAL PRIMARY KEY,
      customer VARCHAR(256) NOT NULL,
      status VARCHAR(256) NOT NULL,
      timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "order_flowers" (
      id SERIAL PRIMARY KEY,
      order_id SERIAL REFERENCES "order" (id) NOT NULL,
      flower_id SERIAL REFERENCES flower (id) NOT NULL,
      amount INT
    )
    `)
  }

  executeSelectOne(query, values) {
    return this.executeSelectMany(query, values).then(result => result[0])
  }

  executeSelectMany(query, values) {
    return this.client.query(query, values)
      .then(result => result.rows.map(this.handleResultRow))
  }

  handleResultRow(row) {
    renameObjectPropertiesFromSnakeCaseToCamelCase(row)

    return row
  }

  /**
   * 
   * @param {string} table 
   * @param {number} id 
   * @returns 
   */
  async selectOne(table, id) {
    return this.executeSelectOne(`SELECT * FROM "${table}" WHERE id = $1`, [id])
  }

  /**
   * 
   * @param {string} table 
   * @returns 
   */
  async selectAll(table) {
    return this.executeSelectMany(`
      SELECT *
      FROM "${table}"
    `)
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
    return this
  }

  async addFlower(flower) {

  }

  // Users

  getUserByEmailAndPassword(email, password) { 
    return this.executeSelectOne(`
      SELECT *
      FROM "user"
      WHERE email = $1 AND password = $2
    `, [email, password])
  }

  getUserByToken(token) {
    return this.executeSelectOne(`
      SELECT "user".*
      FROM "user"
      JOIN session ON session.token = $1
    `, [token])
  }

  addUser(user) {
    return this.executeSelectOne(`
      INSERT INTO "user" (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING (id, username, email)
    `, [user.username, user.email, user.password])
  }

  getSessionByToken(token) {
    return this.executeSelectOne(`
      SELECT *
      FROM session
      WHERE session.token = $1
    `, [token])
  }

  addSession(userId, token) {
    return this.executeSelectOne(`
      INSERT INTO session (user_id, token)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET token = $2, created_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, token])
  }
}