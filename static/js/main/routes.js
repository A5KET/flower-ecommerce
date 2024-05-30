import { MainIndex } from './views/index.js'
import { mainNavigationOptions } from '../config.js'
import { MainFlowers } from './views/flowers.js'
import { Flower } from './views/flower.js'
import { mount } from '../utils.js'
import { stylePaths } from '../config.js'


const mainMount = (layout, title, styles=[]) => {
  mount(layout, title + ' | FloraShop', [stylePaths.base, ...styles])
}


export function getMainRoutes(database) {
  return [
    {
      path: '/',
      handler: () => {
        mainMount(MainIndex(), 'Головна сторінка')
      },
    },
    {
      path: mainNavigationOptions.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => mainMount(MainFlowers(flowers), 'Квіти', [stylePaths.entityManagment, '/css/flowers.css']))

      }
    },
    {
      path: mainNavigationOptions.flowers.url + '/:flowerId',
      handler: (params) => {
        const flower = database.flowers.get(params.flowerId)
        const comments = database.flowers.getFlowerComments(params.flowerId)

        Promise.all([flower, comments]).then(([flower, comments]) => {
          mainMount(Flower(flower, comments), flower.name, ['/css/flower.css'])
        })
      }
    },
  ]
}