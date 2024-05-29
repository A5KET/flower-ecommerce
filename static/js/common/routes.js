import { mount } from '../utils.js'
import { NoMatch } from './views/noMatch.js'


export function getCommonRoutes() {
  /**
   * @type {Route[]}
   */
  const routes = [
    {
      path: '/*',
      handler: () => {
        mount(NoMatch(), '404')
      }
    }
  ]


  return routes
}