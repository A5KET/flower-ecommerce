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

    const results = await Promise.all(flowers.map(flower => this.db.addOrderFlower(orderId, flower.id, flower.amount)))

    return results
  }
}
 

export class OrderRepository extends Repository {
  /**
   * 
   * @param {Database} db 
   * @param {OrderFlowersRepository} orderFlowersRepository 
   */
  constructor(db, orderFlowersRepository) {
    super(db)
    this.orderFlowers = orderFlowersRepository
  }

  async getOrderFlowers(orderId) {
    return this.orderFlowers.getAll(orderId)
  }

  async handleResult(order) {
    const products = await this.orderFlowers.getAll(order.id)
    order.products = products
  }

  async updateProducts(order) {
    return await this.orderFlowers.update(order.id, order.products)
  }

  async get(id) {
    const order = await this.db.getOrder(id)

    if (!order) {
      return undefined
    }

    await this.handleResult(order)

    return order
  }

  async getAll() {
    const orders = await this.db.getOrders()
    
    await Promise.all(orders.map((order) => this.handleResult(order)))

    return orders
  }

  async add(order) {
    const result = await this.db.addOrder(order)

    order.id = result.id
    this.updateProducts(order)

    return result
  }

  async update(order) {
    await this.updateProducts(order)

    return this.db.updateOrder(order)
  }

  async delete(id) {
    return this.db.deleteOrder(id)
  }
}


export class FlowerRepository extends Repository {
  async get(id) {
    return this.db.getFlower(id)
  }

  async getAll() {
    return this.db.getFlowers()
  }

  async add(flower) {
    return this.db.addFlower(flower)
  }

  async delete(id) {
    return this.db.deleteFlower(id)
  }

  async update(flower) {
    return this.db.updateFlower(flower)
  }
}


export class ReviewRepository extends Repository {
  /**
   * 
   * @param {Database} db 
   * @param {UserRepository} userRepository 
   */
  constructor(db, userRepository) { 
    super(db)
    this.users = userRepository
  }

  async handleResult(review) {
    if (review) {
      const author = await this.users.get(review.userId)
      review.author = author
      delete review.userId
    }

    return review
  }

  async getAll() {
    const reviews = await this.db.getReviews()

    return await Promise.all(reviews.map(review => this.handleResult(review)))
  }
  
  async get(id) {
    const review = await this.db.getReview(id)

    return await this.handleResult(review)
  }

  async delete(id) {
    return this.db.deleteReview(id)
  }

  async add(review) {
    return this.db.addReview(review)
  }
}


export class UserRepository extends Repository {
  /**
   * 
   * @param {Database} db 
   * @param {Function} hashEncryptor 
   */
  constructor(db, hashEncryptor) {
    super(db)
    this.hashEncryptor = hashEncryptor
  }

  handleResult(user) {
    if (user) {
      delete user.password
    }

    return user
  }

  async updatePassword(userId, password) {
    return this.db.updateUserPassword(userId, this.hashEncryptor(password))
  }

  async getAll() {
    return this.db.getUsers().then(result => result.map(this.handleResult))
  }

  async get(id) {
    return this.db.getUser(id).then(result => this.handleResult(result))
  }

  async getByEmailAndPassword(email, password) {
    password = this.hashEncryptor(password)

    return this.db.getUser(email, password).then(result => this.handleResult(result))
  }

  async getByToken(token) {
    return this.db.getUserByToken(token)
  }

  async add(user) {
    user.password = this.hashEncryptor(user.password)
    await this.db.addUser(user)

    return this.db.getUser(user.email, user.password)
  }

  async delete(id) {
    return this.db.removeUser(id)
  }
}


export class SessionRepository extends Repository {
  /**
   * 
   * @param {Database} db 
   * @param {Function} tokenGenerator 
   */
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

