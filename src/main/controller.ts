import { Controller, Get, Render } from '@nestjs/common'


@Controller()
export class MainController {
  @Get()
  @Render('main/index')
  index() {
    return { }
  }
}