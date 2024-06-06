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


export class OrderRepository extends Repository {
  async get(id) {
    const order = await this.db.getOrder(id)

    if (!order) {
      return undefined
    }

    order.products = await this.db.getOrderFlowers(order.id)

    return order
  }

  async getAll() {
    const orders = await this.db.getOrders()
    const ordersFlowers = orders.map(order => this.db.getOrderFlowers(order.id))

    await Promise.all(ordersFlowers).then(async flowers => {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i]
        order.products = flowers[i]
      }
    })

    return orders
  }

  async add(order) {
    this.db.addOrder(order)
  }
}


export class FlowerRepository extends Repository {
  async get(id) {
    return this.db.getFlower(id)
  }

  async getAll() {
    return this.db.getFlowers()
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

