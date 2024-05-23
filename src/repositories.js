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

    const orderFlowers = await this.db.getOrderFlowers(order.id)
    order.products = orderFlowers

    return order
  }

  async getAll() {
    const orders = await this.db.getOrders()
    const ordersFlowers = orders.map(order => this.db.getOrderFlowers(order.id))

    await Promise.all(ordersFlowers).then(async flowers => {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i]
        order.products = flowers[i]

        order.customer = await this.db.getCustomer(order.customerId)
        delete order.customerId

        order.status = await this.db.getStatus(order.statusId)
        delete order.statusId
      }
    })

    return orders
  }
}


export class FlowerRepository extends Repository {
  async get(id) {
    const flower = await this.db.getFlower(id)

    if (!flower) {
      return undefined
    }

    flower.color = await this.db.getColor(flower.colorId)
    delete flower.colorId

    return flower
  }

  async getAll() {
    const flowers = await this.db.getFlowers()
    const flowersColors = flowers.map(flower => this.db.getColor(flower.colorId))

    await Promise.all(flowersColors).then(colors => {
      for (let i = 0; i < flowers.length; i++) {
        const flower = flowers[i]
        flower.color = colors[i]
        delete flower.colorId
      }
    })

    return flowers
  }
}