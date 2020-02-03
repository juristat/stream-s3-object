# stream-s3-object

## Usage

```javascript
const AWS = require('aws-sdk')
const streamS3Object = require('stream-s3-object')
const s3 = new AWS.S3()

const getObjectRequest = s3.getObject({ /* whatever */ })
const { getHeader, headers, stream } = await streamS3Object(getObjectRequest)
```

## Returned properties

* `getHeader(name: string): string`
  * Get the string value of the specified header name, with case-insensitive matching
* `headers: { [name: string]: string }`
  * The exact headers object returned from the AWS SDK
* `stream: stream.Readable`
  * A readable stream representing the S3 object being retrieved, from `s3.getObject(...).createReadStream()`


## Errors

The returned Promise will be rejected with the error value from any `httpError` event that is raised on the `getObject()` request.

## See Also

* AWS SDK docs for S3
  * [getObject()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property)
  * ['httpError' event](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html#httpError-event)
