export class FlowerRepository {
  constructor() {
    this.flowers = []

    for (let i = 0; i < 12; i++) {
      this.flowers.push({
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
        id: 123456,
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
        get totalPrice() {
          return this.products.reduce((partialSum, product) => partialSum + product.price * product.amount, 0)
        }
      })
    }
  }

  async getAll(){
    return this.orders
  }
}