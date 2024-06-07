import { renameObjectPropertiesFromSnakeCaseToCamelCase } from './utils.js'


export class Database {
  constructor(client) {
    this.client = client
  }

  async createTables() {
    await this.client.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(256) NOT NULL,
      email VARCHAR(256) NOT NULL UNIQUE,
      password VARCHAR(256) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "review" (
      id SERIAL PRIMARY KEY,
      user_id SERIAL REFERENCES "user" (id) NOT NULL,
      text VARCHAR(8192)
    );
    
    CREATE TABLE IF NOT EXISTS "session" (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE REFERENCES "user" (id) ON DELETE CASCADE,
      token VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS "flower" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(256) UNIQUE NOT NULL,
      color VARCHAR(256) NOT NULL,
      price INT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "order" (
      id SERIAL PRIMARY KEY,
      customer VARCHAR(256) NOT NULL,
      status VARCHAR(256) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS "order_flowers" (
      id SERIAL PRIMARY KEY,
      order_id SERIAL NOT NULL REFERENCES "order" (id) ON DELETE CASCADE,
      flower_id SERIAL NOT NULL REFERENCES flower (id) ON DELETE CASCADE,
      amount INT
    );
    `)
  }

  /**
   * 
   * @param {string} query 
   * @param {any[]} values 
   * @returns 
   */
  executeOne(query, values) {
    return this.executeMany(query, values).then(result => result[0])
  }

  /**
   * 
   * @param {string} query 
   * @param {any[]} values 
   * @returns 
   */
  executeMany(query, values) {
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
  selectOne(table, id) {
    return this.executeOne(`SELECT * FROM "${table}" WHERE id = $1`, [id])
  }

  /**
   * 
   * @param {string} table 
   * @returns 
   */
  selectAll(table) {
    return this.executeMany(`
      SELECT *
      FROM "${table}"
    `)
  }

  deleteOne(table, id) {
    return this.executeOne(`DELETE FROM "${table}" WHERE id = $1`, [id])
  } 

  // flowers

  getFlowers() {
    return this.selectAll('flower')
  }

  getFlower(id) {
    return this.selectOne('flower', id)
  }


  addFlower(flower) {
    return this.executeOne(`
      INSERT INTO "flower" (name, color, price)
      VALUES ($1, $2, $3)
    `, [flower.name, flower.color, flower.price])
  }

  updateFlower(flower) {
    return this.executeOne(`
      UPDATE "flower"
      SET name = $1, color = $2, price = $3
      WHERE id = $4
    `, [flower.name, flower.color, flower.price, flower.id])
  }

  deleteFlower(flowerId) {
    return this.deleteOne('flower', flowerId)
  }

  // orders

  getOrders() {
    return this.selectAll('order')
  }

  getOrder(orderId) {
    return this.selectOne('order', orderId)
  }

  addOrder(order) {
    return this.executeOne(`
      INSERT INTO "order" (customer, status)
      VALUES ($1, $2)
    `, [order.customer, order.status])
  }

  updateOrder(order) {
    return this.executeOne(`
      UPDATE "order"
      SET customer = $1, status = $2, time_created = $3
      WHERE id = $4
    `, [order.customer, order.status, order.timeCreated, order.id])
  }

  deleteOrder(orderId) {
    return this.deleteOne('order', orderId)
  }

  // order flowers
  
  addOrderFlower(orderId, flowerId, amount) {
    return this.executeOne(`
      INSERT INTO "order_flower" (order_id, flower_id, amount)
      VALUES ($1, $2, $3)
    `, [orderId, flowerId, amount])
  }

  deleteOrderFlower(orderId, flowerId) {
    return this.executeOne(`
      DELETE FROM "order_flower"
      WHERE order_id = $1 AND flower_id = $2
    `, [orderId, flowerId])
  }

  deleteAllOrderFlowers(orderId) {
    return this.executeMany(`
      DELETE FROM "order_flower"
      WHERE order_id = $1
    `, [orderId])
  }

  getOrderFlowers(orderId) {
    return this.executeMany(`
      SELECT flower.*, orderflowers.amount as amount
      FROM orderflowers
      JOIN flower ON orderflowers.flower_id = flower.id
      WHERE orderflowers.order_id = $1
    `, [orderId])
  }

  // users

  getUserByEmailAndPassword(email, password) { 
    return this.executeOne(`
      SELECT *
      FROM "user"
      WHERE email = $1 AND password = $2
    `, [email, password])
  }

  getUserByToken(token) {
    return this.executeOne(`
      SELECT "user".*
      FROM "user"
      JOIN session ON session.token = $1
    `, [token])
  }

  addUser(user) {
    return this.executeOne(`
      INSERT INTO "user" (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING (id, username, email)
    `, [user.username, user.email, user.password])
  }

  // sessions

  getSessionByToken(token) {
    return this.executeOne(`
      SELECT *
      FROM session
      WHERE session.token = $1
    `, [token])
  }

  addSession(userId, token) {
    return this.executeOne(`
      INSERT INTO session (user_id, token)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET token = $2, created_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, token])
  }

  // reviews

  getReviews() {
    return this.selectAll('review')
  }

  getReview(id) {
    return this.selectOne('review', id)
  }

  addReview(review) {
    return this.executeOne(`
      INSERT INTO "review" (user_id, text)
      VALUES ($1, $2)
    `, [review.userId, review.text])
  }

  deleteReview(reviewId) {
    return this.deleteOne('review', reviewId)
  }
}