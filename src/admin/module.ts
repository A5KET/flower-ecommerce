import { Module } from '@nestjs/common'
import { AdminController } from './controller'


@Module({
  controllers: [AdminController]
})
export class AdminModule { }