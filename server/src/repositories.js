import { Database } from './database.js'
import { generateToken } from './hash.js'


export class Repository {
  /**
   * 
   * @param {Database} db
   */
  constructor(db) {
    this.db = db
  }
}


export class OrderFlowersRepository extends Repository {
  async getAll(orderId) {
    return this.db.getOrderFlowers(orderId)
  }

  async update(orderId, flowers) {
    await this.db.deleteAllOrderFlowers(orderId)

    const results = flowers.map(flower => this.db.addOrderFlower(orderId, flower.id, flower.amount))

    return Promise.all(results)
  }
}
 

export class OrderRepository extends Repository {
  constructor(db, orderFlowersRepository) {
    super(db)
    this.orderFlowers = orderFlowersRepository
  }

  async getOrderFlowers(orderId) {
    return this.orderFlowers.getAll(orderId)
  }

  async addProductsToOrder(order) {
    const products = await this.getOrderFlowers(order.id)
    order.products = products
  }

  async get(id) {
    const order = await this.db.getOrder(id)

    if (!order) {
      return undefined
    }

    await this.addProductsToOrder(order)

    return order
  }

  async getAll() {
    const orders = await this.db.getOrders()
    
    await Promise.all(orders.map(this.addProductsToOrder))

    return orders
  }

  async add(order) {
    this.db.addOrder(order)
  }

  async delete(id) {

  }
}


export class FlowerRepository extends Repository {
  async get(id) {
    return this.db.getFlower(id)
  }

  async getAll() {
    return this.db.getFlowers()
  }

  async delete(id) {
    return this.db.deleteFlower(id)
  }

  async update(flower) {
    return this.db.updateFlower(flower)
  }
}


export class ReviewRepository extends Repository {
  async getAll() {
    return this.db.getReviews()
  }
  
  async get(id) {
    return this.db.getReview(id)
  }

  async delete(id) {
    return this.db.deleteReview(id)
  }

  async add(review) {
    return this.db.addReview(review)
  }
}


export class UserRepository extends Repository {
  constructor(db, hashEncryptor) {
    super(db)
    this.hashEncryptor = hashEncryptor
  }

  async get(email, password) {
    password = this.hashEncryptor(password)

    return this.db.getUser(email, password)
  }

  async getByToken(token) {
    return this.db.getUserByToken(token)
  }

  async add(user) {
    user.password = this.hashEncryptor(user.password)
    await this.db.addUser(user)

    return this.db.getUser(user.email, user.password)
  }
}


export class SessionRepository extends Repository {
  constructor(db, tokenGenerator) {
    super(db)
    this.tokenGenerator = tokenGenerator
  }

  async get(token) {
    return this.db.getSessionByToken(token)
  }

  async update(userId) {
    const token = this.tokenGenerator()

    return this.db.addSession(userId, token)
  }
}

