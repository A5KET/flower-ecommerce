import { adminNavigationOptions as nav, stylePaths, getNewEntityFormURL, getEntityURL } from '../../config.js'
import { redirect } from '../../path.js'
import { Flowers } from '../views/flowers.js'
import { FlowerForm, NewFlowerForm } from '../views/flowerForm.js'



export function getFlowersRoutes(database, mount) {
  function addFlower(flower) {
    database.flowers.add(flower).then(flower => redirect(getEntityURL(nav.flowers.url, flower.id)))
  }

  /**
   * @type {Route[]}
   */
  return [
    {
      path: nav.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => {
          flowers = flowers.slice(0, 12)
          mount(Flowers(flowers), 'Квіти', [stylePaths.entityManagment, '/css/flowers.css'])
        })
      }
    },
    {
      path: getNewEntityFormURL(nav.flowers.url),
      handler: () => {
        function onAdd(flower) {

        }

        mount(NewFlowerForm(), 'Додати квітку', [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
      }
    },
    {
      path: nav.flowers.url + '/:flowerId',
      handler: (params) => {
        database.flowers.get(params.flowerId).then(flower => {
          mount(FlowerForm(flower), flower.name, [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
        })
      }
    }
  ]
}