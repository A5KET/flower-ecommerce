import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { MainModule } from './main/module'
import { AdminModule } from './admin/module'
import { AliasMiddleware } from './route-allias/alias.middleware'
import { AliasModule } from './route-allias/allias.module'



@Module({
  imports: [AliasModule, AdminModule, MainModule],
  providers: []

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AliasMiddleware).forRoutes('*')

  }
}
