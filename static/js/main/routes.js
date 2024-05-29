import { mount } from '../utils.js'
import { MainIndex } from './views/index.js'
import { mainNavigationOptions } from '../config.js'
import { MainFlowers } from './views/flowers.js'
import { Flower } from './views/flower.js'




export function getMainRoutes(database) {
  return [
    {
      path: '/',
      handler: () => {
        mount(MainIndex(), 'Головна сторінка')
      },
    },
    {
      path: mainNavigationOptions.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => mount(MainFlowers(flowers), 'Квіти', ['/css/entityManagment.css', '/css/flowers.css']))

      }
    },
    {
      path: mainNavigationOptions.flowers.url + '/:flowerId',
      handler: (params) => {
        const flower = database.flowers.get(params.flowerId)
        const comments = database.flowers.getFlowerComments(params.flowerId)

        Promise.all([flower, comments]).then((flower, comments) => {
          mount(Flower(flower, comments), flower.name, ['/css/flower.css'])
        })
      }
    },
  ]
}