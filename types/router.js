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


/**
 * @callback RoutesFactory
 * @param {RoutesDatabase} database
 * @param {MountFunction} mount
 * @param {string | undefined} url
 * @returns {Route[]}
 */