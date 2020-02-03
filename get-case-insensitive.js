module.exports = (obj, key) => {
  if (key && typeof key !== 'string' && typeof key.toString === 'function') {
    key = key.toString()
  }
  if (!key) {
    throw new TypeError('key must be a string')
  }
  const lKey = key.trim().toLowerCase()
  const matchingKey = Object.keys(obj).find(
    possibleKey => lKey === possibleKey.trim().toLowerCase()
  )
  return matchingKey ? obj[matchingKey] : undefined
}
