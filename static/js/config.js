/**
 * @type {NavigationOptions}
 */
export const adminNavigationOptions = {
  flowers: {
    url: '/admin/flowers',
    title: 'Квіти',
    icon: '/img/flower.svg'
  },
  orders: {
    url: '/admin/orders',
    title: 'Замовлення',
    icon: '/img/order.svg'
  },
  reviews: {
    url: '/#',
    title: 'Відгуки',
    icon: '/img/mail.svg'
  },
  users: {
    url: '/#',
    title: 'Користувачі',
    icon: '/img/users.svg'
  }
}


/**
 * @readonly
 * @enum {string}
 */
export const styles = {
  entityManagment: '/css/entityManagment.css',
  slider: '/css/slider.css',
  forms: '/css/forms.css',
  tables: '/css/tables.css'
}

/**
 * @readonly
 * @type {StatusOptions}
 */
export const statusOption = {
  new: 'Новий',
  processing: 'Обробляється',
  done: 'Виконано',
  canceled: 'Скасовано'
}