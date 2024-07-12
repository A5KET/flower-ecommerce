import { Module } from '@nestjs/common'

import { MainController } from './controller'
import { FlowerService } from '../common/flower.service'
import { FlowersMainController } from './flowers.controller'


@Module({
  controllers: [MainController, FlowersMainController],
  providers: [FlowerService]
})
export class MainModule { }