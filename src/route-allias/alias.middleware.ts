import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { AliasService } from './alias.service'

@Injectable()
export class AliasMiddleware implements NestMiddleware {
  constructor(private readonly aliasService: AliasService) { }

  use(req: Request, res: Response, next: NextFunction) {
    res.locals.getUrl = this.aliasService.resolve.bind(this.aliasService)

    next()
  }
}