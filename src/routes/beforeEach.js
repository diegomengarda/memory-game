export default async (to, from, next) => {
  // Position the scroll on top
  window.scrollTo(0, 0)
  next()
  return false
}
