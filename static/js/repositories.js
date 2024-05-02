import { getRequest } from './requests.js'


class Repository {
  constructor(url) {
    this.url = url
  }

  async getAll() {
    return getRequest(this.url).then(response => response.data) 
  }
}


export class FlowerRepository extends Repository {

}


export class OrderRepository extends Repository {
  
}