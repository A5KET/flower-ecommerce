import { AdminIndex } from '../views/index.js'


/** @type {RoutesFactory} */
export function getIndexRoutes(database, mount) {
  return [
    {
      path: '/admin',
      handler: () => {
        mount(AdminIndex())
      }
    },
  ]
}