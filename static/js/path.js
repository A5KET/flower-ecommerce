export function getRelativePath(path, addTrailingSlash=true) {
  let currentPath = window.location.href
  currentPath += addTrailingSlash && currentPath.endsWith("/") ? "" : "/"
  const absolutePath = new URL(path, currentPath)

  console.log(currentPath, absolutePath)
  return absolutePath.href
}