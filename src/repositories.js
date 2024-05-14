import { abstract } from './classes.js'


class Repository {
  /**
   * @abstract
   */
  async getAll() {
    abstract()
  }

  /**
   * @abstract
   * @param {number} id 
   */
  async get(id) {
    id
    abstract()
  }
}


export class InMemoryRepository extends Repository { 
  constructor(data=[]) {
    super()
    this.data = data
  }

  async getAll() {
    return this.data
  }

  async get(id) {
    return this.data.find((value => value.id === id))
  }
}


export class FlowerInMemoryRepository extends InMemoryRepository {
  constructor() {
    super()

    for (let i = 0; i < 12; i++) {
      this.data.push({
        id: i,
        name: 'Квітка',
        price: 200,
        thumbnail: '/img/flower.jpg'
      }
      )
    }
  }
}


export class OrderInMemoryRepository extends InMemoryRepository {
  constructor () {
    super()

    for (let i = 0; i < 22; i++) {
      this.data.push({
        id: i,
        status: 'Готовий',
        customer: 'Євсеенко Г. О.',
        timeCreated: new Date(1713778369000),
        products: [
          {
            name: 'Квітка',
            price: 30,
            amount: 20
          }
        ]
      })
    }
  }
}


export class StatusOptionRepository extends InMemoryRepository {
  constructor ( ) {
    super()

    this.data = [
      {
        id: 0,
        name:  'Створено'
      },
      {
        id: 1,
        name:  'Обробляється'
      },
      {
        id: 2,
        name:  'Виконано'
      },
      {
        id: 3,
        name:  'Скасовано'
      },
    ]
  }
}