const getCaseInsensitive = require('./get-case-insensitive')

module.exports = getObjectRequest => {
  const looksLikeGetObjectReq =
    getObjectRequest &&
    getObjectRequest.operation === 'getObject' &&
    typeof getObjectRequest.on === 'function' &&
    typeof getObjectRequest.createReadStream === 'function'

  if (!looksLikeGetObjectReq) {
    throw new TypeError('argument does not appear to be a streamable s3.getObject() request')
  }

  return new Promise((resolve, reject) => {
    let objectStream

    getObjectRequest.on('httpError', reject)
    getObjectRequest.on('httpHeaders', (_, httpHeaders) => {
      resolve({
        headers: httpHeaders,
        getHeader: name => getCaseInsensitive(httpHeaders, name),
        stream: objectStream,
      })
    })

    objectStream = getObjectRequest.createReadStream()
  })
}
