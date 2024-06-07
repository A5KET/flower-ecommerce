import { APIClient } from './requests.js'


/**
 * @callback EntityConstructor
 * @param {any} value
 * @returns {any}
 */


/**
 * @template {Entity} T
 */
export class Repository {
  entityEndpoint = ''

  /**
   * 
   * @param {APIClient} client 
   */
  constructor(client) {
    this.client = client
  }

  handleResultEntity(entity) {
    return entity
  }

  /**
   * 
   * @returns {Promise<T[]>}
   */
  async getAll() {
    return this.client.get(this.entityEndpoint)
      .then(data => data.map(value => this.handleResultEntity(value))) 
  }

  /**
   * 
   * @param {number} id 
   * @returns {Promise<T>}
   */
  async get(id) {
    return this.client.get(this.entityEndpoint + '/' + id)
      .then(data => this.handleResultEntity(data))
  }

  /**
   * 
   * @param {T} data 
   * @returns 
   */
  async update(data) {
    return this.client.put(this.entityEndpoint + '/' + data.id, data)
  }

  /**
   * 
   * @param {T} data 
   * @returns 
   */
  async add(data) {
    return this.client.post(this.entityEndpoint, data)
  }

  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async remove(id) {
    return this.client.delete(this.entityEndpoint + '/' + id)
  }
}


/**
 * @extends Repository<Flower>
 */
export class FlowerRepository extends Repository {
  entityEndpoint = 'flowers'
}


/**
 * @extends Repository<Order>
 */
export class OrderRepository extends Repository {
  entityEndpoint = 'orders'

  handleResultEntity(order) {
    const products = order.products
    order.totalPrice = products.reduce(((currentSum, product) => currentSum + (product.price * product.amount)), 0)
    order.timeCreated = new Date(order.timeCreated)

    return order
  }
}


export class ReviewRepository extends Repository {
  entityEndpoint = 'reviews'

  
}


export class UserRepository extends Repository {
  entityEndpoint = 'users'
}