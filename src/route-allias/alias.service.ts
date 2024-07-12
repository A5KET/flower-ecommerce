import { Injectable, OnModuleInit } from '@nestjs/common'
import { PATH_METADATA } from '@nestjs/common/constants'
import { DiscoveryService, Reflector } from '@nestjs/core'

import { ROUTE_ALIAS_METADATA } from './alias.decorator'
import { AliasAlreadyRegisteredError, AliasNotFoundError, MissingRouteParameterError } from './errors'


@Injectable()
export class AliasService implements OnModuleInit {
  private readonly aliases: Map<string, string> = new Map()

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector
  ) { }


  onModuleInit() {
    this.registerControllerRoutes()
    console.log(this.aliases)
    console.log(this.resolve('admin-index'))
  }

  resolve(alias: string, params: object = { }) {
    const path = this.aliases.get(alias)

    if (!path) {
      throw new AliasNotFoundError(`'${alias}' alias is not found`)
    }

    return this.replacePathParams(path, params)
  }

  public register(alias: string, basePath: string, path: string) {
    if (this.aliases.has(alias)) {
      throw new AliasAlreadyRegisteredError(`Conflict: ${alias} already registered`)
    }

    this.aliases.set(alias, this.createPath(basePath, path))
  }

  private registerControllerRoutes() {
    const controllers = this.discoveryService.getControllers()

    for (const controller of controllers) {
      const basePath = this.reflector.get(PATH_METADATA, controller.metatype)
      const prototype = controller.metatype.prototype
      const propertyNames = Object.getOwnPropertyNames(prototype)

      for (const propertyName of propertyNames) {
        const property = prototype[propertyName]
        const routePath = this.reflector.get(PATH_METADATA, property)
        const routeAlias = this.reflector.get(ROUTE_ALIAS_METADATA, property)

        if (routePath && routeAlias) {
          this.register(routeAlias, basePath, routePath)
        }
      }
    }
  }

  private createPath(basePath: string, routePath: string) {
    if (routePath == '/') {
      routePath = ''
    }
    else if (!routePath.startsWith('/')) {
      routePath = '/' + routePath
    }

    return '/' + basePath + routePath
  }

  private replacePathParams(path: string, params: Record<string, any>) {
    const regex = /:([a-zA-Z_][a-zA-Z0-9_]*)/g

    return path.replace(regex, (_, paramName) => {
      const paramValue = params[paramName]

      if (!paramValue) {
        throw new MissingRouteParameterError('')
      }

      return paramValue
    })
  }
}