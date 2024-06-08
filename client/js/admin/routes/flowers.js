import { stylePaths, getNewEntityFormURL, getEntityURL } from '../../config.js'
import { redirect, reload } from '../../path.js'
import { Flowers, FlowerForm, NewFlowerForm } from '../views/flowers.js'



/** @type {RoutesFactory} */
export function getFlowersRoutes(database, mount, url) {
  function addFlower(flower) {
    console.log(flower)
    database.flowers.add(flower).then(result => redirect(getEntityURL(url, result.id)))
  }

  function updateFlower(flower) {
    database.flowers.update(flower).then(() => reload())
  }

  function removeFlower(flower) {
    database.flowers.remove(flower.id).then(() => redirect(url))
  }

  /**
   * @type {Route[]}
   */
  return [
    {
      path: url,
      handler: () => {
        database.flowers.getAll().then(flowers => {
          mount(Flowers(flowers, getNewEntityFormURL(url)), 'Квіти', [stylePaths.entityManagment, '/css/flowers.css'])
        })
      }
    },
    {
      path: getNewEntityFormURL(url),
      handler: () => {
        mount(NewFlowerForm(addFlower), 'Додати квітку', [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
      }
    },
    {
      path: url + '/:id',
      handler: (params) => {
        database.flowers.get(params.id).then(flower => {
          mount(FlowerForm(flower, updateFlower, removeFlower), flower.name, [stylePaths.forms, stylePaths.slider, '/css/flowerForm.css'])
        })
      }
    }
  ]
}