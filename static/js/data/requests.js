/**
 * @readonly
 * @enum {string}
 */
export const Method = {
  Get: 'GET',
  Post: 'POST',
  Delete: 'DELETE',
  Put: 'PUT'
}


/**
 * 
 * @param {string} url 
 * @returns 
 */
export function getRequest(url) {
  return fetch(url).then(response => response.json()).catch(error => console.log(error))
}


/**
 * 
 * @param {string} url 
 * @param {string} method 
 * @param {Object} body 
 * @returns 
 */
export async function JSONRequest(url, method, body) {
  return fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json()).catch((error) => { console.log(error)})
}

 
/**
 * 
 * @param {string} url 
 * @param {Object} body 
 * @returns 
 */
export function postRequest(url, body) {
  return JSONRequest(url, Method.Post, body)
}


/**
 * 
 * @param {string} url 
 * @param {Object} body 
 * @returns 
 */
export function deleteRequest(url, body) {
  return JSONRequest(url, Method.Delete, body)
}


/**
 * 
 * @param {string} url 
 * @param {Object} body 
 * @returns 
 */
export function putRequest(url, body) {
  return JSONRequest(url, Method.Put, body)
}