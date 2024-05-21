/**
 * @typedef {string} RoutePath
 */

/**
 * @typedef {Object} Route
 * @property {RoutePath} path
 * @property {Function} handler
 */

/**
 * @typedef {Object} RouterConfig
 * @property {RouteChecker} [routeChecker]
 * @property {ParamsParser} [paramsParser]
 */

/**
 * @callback RouteChecker
 * @param {RoutePath} routePath
 * @param {RoutePath} pathToCheck
 * @returns {boolean} 
 */

/**
 * @callback ParamsParser
 * @param {RoutePath} routePath
 * @param {RoutePath} pathToParse
 * @returns {Object}
 */