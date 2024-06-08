import { adminNavigationOptions as nav, stylePaths, getNewEntityFormURL, getEntityURL } from '../../config.js'
import { redirect, reload } from '../../path.js'
import { Flowers, FlowerForm, NewFlowerForm } from '../views/flowers.js'



/** @type {RoutesFactory} */
export function getFlowersRoutes(database, mount) {
  function addFlower(flower) {
    console.log(flower)
    database.flowers.add(flower).then(result => {console.log(result); redirect(getEntityURL(nav.flowers.url, result.id))})
  }

  function updateFlower(flower) {
    database.flowers.update(flower).then(() => reload())
  }

  function removeFlower(flower) {
    database.flowers.remove(flower.id).then(() => redirect(nav.flowers.url))
  }

  /**
   * @type {Route[]}
   */
  return [
    {
      path: nav.flowers.url,
      handler: () => {
        database.flowers.getAll().then(flowers => {
          mount(Flowers(flowers), 'Квіти', [stylePaths.entityManagment, '/css/flowers.css'])
        })
      }
    },
    {
      path: getNewEntityFormURL(nav.flowers.url),
      handler: () => {
        mount(NewFlowerForm(addFlower), 'Додати квітку', [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
      }
    },
    {
      path: nav.flowers.url + '/:flowerId',
      handler: (params) => {
        database.flowers.get(params.flowerId).then(flower => {
          mount(FlowerForm(flower, updateFlower, removeFlower), flower.name, [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
        })
      }
    }
  ]
}