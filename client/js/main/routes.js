import { MainIndex } from './views/index.js'
import { mainNavigationOptions } from '../config.js'
import { MainFlowers } from './views/flowers.js'
import { Flower } from './views/flower.js'
import { stylePaths } from '../config.js'


/**
 * 
 * @param {RoutesDatabase} database
 * @param {MountFunction} mount
 * @returns 
 */
export function getMainRoutes(database, mount) {
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
        database.flowers.getAll().then(flowers => mount(MainFlowers(flowers), 'Квіти', [stylePaths.entityManagment, '/css/flowers.css']))

      }
    },
    {
      path: mainNavigationOptions.flowers.url + '/:flowerId',
      handler: (params) => {
        function onReviewSubmit(review) {
          database.reviews.add(review)
        } 

        const flower = database.flowers.get(params.flowerId)
        const reviews = database.reviews.getAll(params.flowerId)

        Promise.all([flower, reviews]).then(([flower, reviews]) => {
          mount(Flower(flower, reviews, onReviewSubmit), flower.name, ['/css/flower.css', '/css/review.css'])
        })
      }
    },
  ]
}