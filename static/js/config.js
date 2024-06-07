export function getNewEntityFormURL(base) {
  return base + '/add'
}


export function getEntityURL(base, id) {
  return `${base}/${id}`
}


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
    url: '/admin/reviews',
    title: 'Відгуки',
    icon: '/img/mail.svg'
  },
  users: {
    url: '/admin/users',
    title: 'Користувачі',
    icon: '/img/users.svg'
  }
}


export const defaultStyles = ['/css/base.css']


/**
 * @type {NavigationOptions}
 */
export const mainNavigationOptions = {
  flowers: {
    url: '/flowers',
    title: 'Квіти',
    icon: '/img/flower.svg'
  }
}


/**
 * @readonly
 * @enum {string}
 */
export const stylePaths = {
  base: '/css/base.css',
  entityManagment: '/css/entityManagment.css',
  slider: '/css/slider.css',
  forms: '/css/forms.css',
  tables: '/css/tables.css'
}
