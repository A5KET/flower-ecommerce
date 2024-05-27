import { Database } from './database.js'
import { renameProperty } from './utils.js'


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