/**
 * @typedef {{
 *  id?: number
 * }} Entity
 */


/**
 * @typedef {Entity & {
 *  color: string,
 *  name: string,
 *  price: number,
 * }} Flower
 */

/**
 * @typedef {Entity & {
 *  order_id: number,
 *  flower_id: number,
 *  amount: number
 * }} OrderFlower
 */

/**
 * @typedef {Entity & {
 *  name: string,
 *  price: number,
 *  amount: number
 * }} Product
 */


/**
 * @typedef {Entity & {
 *  status: string,
 *  customer: string,
 *  created: Date,
 *  products: Product[]
 * }} Order
 */


/**
 * @typedef {Object} FlowerComment
 * @param {string} author
 * @param {string} text
 * 
 */


/**
 * @typedef {Entity & {
 *  name: string
 * }} StatusOption
 */


/**
 * @template T
 * @callback RepositoryGet
 * @param {number} id
 * @returns {Promise<T>}
 */


/**
 * @template T
 * @callback RepositoryGetAll
 * @returns {Promise<T[]>}
 */


/**
 * @template T
 * @callback RepositoryAdd
 * @param {T} entity
 * @returns {Promise<void>}
 */


/**
 * @template T
 * @callback RepositoryUpdate
 * @param {T} entity
 * @returns {Promise<void>}
 */


/**
 * @template T
 * @callback RepositoryRemove
 * @param {number} id
 * @returns {Promise<void>}
 */


/**
 * @class
 * @template T
 * @typedef {Object} Repository
 * @property {RepositoryGet<T>} get
 * @property {RepositoryGetAll<T>} getAll
 * @property {RepositoryAdd<T>} add
 * @property {RepositoryUpdate<T>} update
 * @property {RepositoryRemove<T>} remove
 */