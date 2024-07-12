import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AliasService } from './alias.service'
import { AliasMiddleware } from './alias.middleware'
import { DiscoveryService } from '@nestjs/core'


@Module({
  providers: [
    DiscoveryService,
    AliasService
  ],
  exports: [
    AliasService,
    DiscoveryService
  ]
})
export class AliasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AliasMiddleware)
      .forRoutes('*')
  }
}