import { UserForm, Users } from '../views/users.js'
import { stylePaths } from '../../config.js'
import { redirect, reload } from '../../path.js'


/** @type {RoutesFactory} */
export function getUsersRoutes(database, mount, url) {
  async function updateUser(user) {
    if (user.password) {
      await database.users.updatePassword(user.id, user.password)
    }

    database.users.update(user).then(() => reload())
  }

  function removeUser(user) {
    database.users.remove(user.id).then(() => redirect(url))
  }

  return [
    {
      path: url,
      handler: () => {
        database.users.getAll().then(users => {
          mount(Users(users), 'Користувачі', [stylePaths.entityManagment, stylePaths.tables])
        })
      }
    },
    {
      path: url + '/:id',
      handler: (params) => {
        database.users.get(params.id).then(user => {
          mount(UserForm(user, updateUser, removeUser), user.name, [[stylePaths.forms]])
        })
      }
    }
  ]
}