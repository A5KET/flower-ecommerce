export class FlowerRepository {
  constructor() {
    this.flowers = []

    for (let i = 0; i < 12; i++) {
      this.flowers.push({
        id: i,
        name: 'Квітка',
        price: 200,
        thumbnail: '/img/flower.jpg'
      }
      )
    }
  }

  async getAll() {
    return this.flowers
  }
}


export class OrderRepository{
  constructor () {
    this.orders = []

    for (let i = 0; i < 22; i++) {
      this.orders.push({
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
        ],
      })
    }
  }

  async getAll(){
    return this.orders
  }
}