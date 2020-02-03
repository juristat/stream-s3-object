const streamS3Object = require('./')

describe('stream-s3-object', () => {
  it('resolves correctly if request is proceeding', () => {
    let headerHandler = () => {}
    const mockReadStream = {}
    const mockHeaders = {
      'content-length': '12345',
      'content-type': 'text/plain',
      'x-amz-whatever': 'foo',
    }
    const mockRequest = {
      createReadStream: () => {
        process.nextTick(() => {
          headerHandler(200, mockHeaders)
        })
        return mockReadStream
      },
      on: (event, handler) => {
        if (event === 'httpHeaders') {
          headerHandler = handler
        }
      },
      operation: 'getObject',
    }

    return streamS3Object(mockRequest).then(result => {
      expect(result.headers).toEqual(mockHeaders)
      expect(result.stream).toEqual(mockReadStream)
      expect(result.getHeader('Content-Length')).toEqual('12345')
      expect(result.getHeader('x-amz-whatever')).toEqual('foo')
    })
  })

  it('rejects on httpError', () => {
    let errorHandler = () => {}
    const mockRequest = {
      createReadStream: () => {
        process.nextTick(() => {
          errorHandler('something broke')
        })
        return {}
      },
      on: (event, handler) => {
        if (event === 'httpError') {
          errorHandler = handler
        }
      },
      operation: 'getObject',
    }

    return expect(streamS3Object(mockRequest)).rejects.toEqual('something broke')
  })
})
