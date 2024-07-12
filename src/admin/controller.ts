import { Controller, Get, Render } from '@nestjs/common'
import { Alias } from 'src/route-allias/alias.decorator'



@Controller('admin')
export class AdminController {
  @Get()
  @Alias('admin-index')
  @Render('admin/index')
  index() {
    return { }
  }
}