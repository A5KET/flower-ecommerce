import { Injectable } from '@nestjs/common'
import { Flower } from './types'


@Injectable()
export class FlowerService {
  private readonly flowers: Flower[] = [
    {
      id: 1,
      color: 'string',
      name: 'boba',
      price: 10
    }
  ]

  async create(flower: Flower) {
    this.flowers.push(flower)
  }

  async findAll() {
    return this.flowers
  }

  async find(id: string | number): Promise<Flower | undefined> {
    return this.flowers.find((flower => flower.id == id))
  }
}