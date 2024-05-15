export function objectMap(callback, object) {
  const result = []

  for (const key in object) {
    result.push(callback(key, object[key]))
  }

  return result
}