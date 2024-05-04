export const Method = {
  Get: 'GET',
  Post: 'POST',
  Delete: 'DELETE',
  Put: 'PUT'
}


export function getRequest(url) {
  return fetch(url).then(response => response.json()).catch(error => console.log(error))
}


export function JSONRequest(url, method, body) {
  return fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json()).catch((error) => { console.log(error)})
}

 
export function postRequest(url, body) {
  return JSONRequest(url, Method.Post, body)
}

export function deleteRequest(url, body) {
  return JSONRequest(url, Method.Delete, body)
}

export function putRequest(url, body) {
  return JSONRequest(url, Method.Put, body)
}