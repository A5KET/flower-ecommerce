/**
 * @type {RouteChecker} 
 * */
function defaultRouteChecker(routePath, pathToCheck) {
  const regex = new RegExp('^' + routePath.replace(/\/:([^/]+)/g, '/([^/]+)').replace(/\/\*/g, '/.*') + '$')

  return regex.test(pathToCheck)
}


/**
 * @type {ParamsParser}
 */
function defaultParamsParser(routePath, pathToParse) {
  const routeSegments = routePath.split('/')
  const pathSegments = pathToParse.split('/')

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
  /**
   * 
   * @param {Route[]} routes 
   * @param {RouterConfig} config 
   */
  constructor(routes=[], config={}) {
    this.routes = routes
    this.routeChecker = config.routeChecker || defaultRouteChecker
    this.paramsParser = config.paramsParser || defaultParamsParser
  }

  /** @param {RoutePath} path */
  getHandler(path) {
    return this.routes.find(route => this.routeChecker(route.path, path))
  }

  /** @param {RoutePath} path */
  handlePath(path) {
    const route = this.getHandler(path)
    const params = this.paramsParser(route.path, path)

    route.handler(params)
  }

  /** @param {Route} route */
  registerRoute(route) {
    this.routes.push(route)
  }
}