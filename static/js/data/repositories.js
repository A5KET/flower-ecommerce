import { deleteRequest, getRequest, postRequest, putRequest } from './requests.js'

function defaultEntityFactory(value) {
  return value
}


class Repository {
  constructor(url, entityFactory=defaultEntityFactory) {
    this.url = url
    this.entityFactory = entityFactory
  }

  async getAll() {
    return getRequest(this.url)
      .then(response => response.data)
      .then(data => data.map(value => this.entityFactory(value))) 
  }

  async get(id) {
    return getRequest(this.url + '/' + id)
      .then(response => response.data)
      .then(data => this.entityFactory(data))
  }

  async update(data) {
    return putRequest(this.url + '/' + data.id, { data })
  }

  async add(data) {
    return postRequest(this.url, { data })
  }

  async remove(id) {
    return deleteRequest(this.url + '/' + id)
  }
}


export class FlowerRepository extends Repository {

}


export class OrderRepository extends Repository {
  constructor(url) {
    const orderFactory = (order) => {
      Object.defineProperty(order, 'totalPrice', {
        get: function() {
          return this.products.reduce(((currentSum, product) => currentSum + product.price), 0)
        }
      })

      order.timeCreated = new Date(order.timeCreated)

      return order
    }

    super(url, orderFactory)
  }
}