/**
 * @typedef {{
 *  id: number
 * }} Entity
 */

/**
 * @typedef {Entity & {
 *  name: string,
 *  price: number,
 *  thumbnail: Path
 * }} Flower
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
 *  timeCreated: Date,
 *  products: Product[]
 * }} Order
 */


/**
 * @typedef {Entity & {
 *  name: string
 * }} StatusOption
 */