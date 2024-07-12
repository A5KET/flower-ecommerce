import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const server = app.getHttpAdapter().getInstance()

  server.locals.basedir = join(__dirname, '..', 'views')

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('pug')

  await app.listen(3000)
}
bootstrap()
