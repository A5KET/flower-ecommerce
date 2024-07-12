import { redirect } from '../../path.js'
import { ReviewForm, Reviews } from '../views/reviews.js'
import { stylePaths } from '../../config.js'


/** @type {RoutesFactory} */
export function getReviewsRoutes(database, mount, url) {
  function removeReview(review) {
    database.reviews.remove(review.id).then(() => redirect(url))
  }

  return [
    {
      path: url,
      handler: () => {
        database.reviews.getAll().then(reviews => {
          mount(Reviews(reviews), 'Відгуки', [stylePaths.entityManagment, stylePaths.tables])
        }) 
      }
    },
    {
      path: url + '/:id',
      handler: (params) => {
        database.reviews.get(params.id).then(review => {
          mount(ReviewForm(review, removeReview), `Відгук №${review.id}`)
        })
      }
    }
  ]
}