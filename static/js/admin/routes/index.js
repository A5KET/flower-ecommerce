import { AdminIndex } from '../views/index.js'


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