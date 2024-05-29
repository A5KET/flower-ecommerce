import { deleteRequest, getRequest, postRequest, putRequest } from './requests.js'


/**
 * @callback EntityConstructor
 * @param {any} value
 * @returns {any}
 */


/**
 * @template {Entity} T
 */
export class Repository {
  /**
   * 
   * @param {string} url 
   */
  constructor(url,) {
    this.url = url
  }

  createEntity(entity) {
    return entity
  }

  /**
   * 
   * @returns {Promise<T[]>}
   */
  async getAll() {
    return getRequest(this.url)
      .then(response => response.data)
      .then(data => data.map(value => this.createEntity(value))) 
  }

  /**
   * 
   * @param {number} id 
   * @returns {Promise<T>}
   */
  async get(id) {
    return getRequest(this.url + '/' + id)
      .then(response => response.data)
      .then(data => this.createEntity(data))
  }

  /**
   * 
   * @param {T} data 
   * @returns 
   */
  async update(data) {
    return putRequest(this.url + '/' + data.id, { data })
  }

  /**
   * 
   * @param {T} data 
   * @returns 
   */
  async add(data) {
    return postRequest(this.url, { data })
  }

  /**
   * 
   * @param {number} id 
   * @returns 
   */
  async remove(id) {
    return deleteRequest(this.url + '/' + id)
  }
}


/**
 * @extends Repository<Flower>
 */
export class FlowerRepository extends Repository {
  async getFlowerComments(flowerId) {
    return [] // #TODO 
  }
}


/**
 * @extends Repository<Order>
 */
export class OrderRepository extends Repository {
  createEntity(order) {
    const products = order.products
    order.totalPrice = products.reduce(((currentSum, product) => currentSum + (product.price * product.amount)), 0)
    order.timeCreated = new Date(order.timeCreated)

    return order
  }
}