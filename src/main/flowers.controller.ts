import { Controller, Render, Get, Param } from '@nestjs/common'

import { FlowerService } from 'src/common/flower.service'
import { Alias } from 'src/route-allias/alias.decorator'


@Controller('flowers')
export class FlowersMainController {
  constructor(
    private flowerService: FlowerService
  ) { }

  @Get('')
  @Alias('main-flowers')
  @Render('main/flowers')
  async flowers() {
    return {
      flowers: await this.flowerService.findAll()
    }
  }

  @Get(':id')
  @Alias('main-flower')
  @Render('main/flower')
  async flower(@Param('id') id: string) {
    return {
      flower: await this.flowerService.find(id)
    }
  }
}