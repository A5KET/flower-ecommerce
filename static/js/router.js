function defaultRouteChecker(route, path) {
  const regex = new RegExp('^' + route.replace(/\/:([^\/]+)/g, '/([^\/]+)') + '$')

  return regex.test(path)
}


function defaultParamsParser(route, path) {
  const routeSegments = route.split('/')
  const pathSegments = path.split('/')

  const params = {}
  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i]
    const pathSegment = pathSegments[i]

    if (routeSegment.startsWith(':')) {
      const paramName = routeSegment.slice(1)
      params[paramName] = pathSegment
    }
  }

  return params
}


export class Router {
  constructor(routes, config) {
    this.routes = routes
    this.routeChecker = config.routeChecker || defaultRouteChecker
    this.paramsParser = config.paramsParser || defaultParamsParser
    this.noMatchRoute = config.noMatchRoute
  }

  getHandler(path) {
    return this.routes.find(route => this.routeChecker(route.path, path)) || this.noMatchRoute
  }

  handlePath(path) {
    const route = this.getHandler(path)
    const params = this.paramsParser(route.path, path)

    route.handler(params)
  }
}