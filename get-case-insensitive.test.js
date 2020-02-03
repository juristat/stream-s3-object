const getCaseInsensitive = require('./get-case-insensitive')

const mockObj = {
  bar: 234,
  foo: 123,
}

describe('get-case-insensitive', () => {
  it('returns correct matching values', () => {
    expect(getCaseInsensitive(mockObj, 'foo')).toEqual(123)
    expect(getCaseInsensitive(mockObj, 'BAR')).toEqual(234)
    expect(getCaseInsensitive(mockObj, 'BAz')).toBeUndefined()
  })

  it('converts non-string input keys using .toString()', () => {
    expect(getCaseInsensitive(mockObj, { toString: () => 'FOO' })).toEqual(123)
  })

  it('throws if the input key cannot be used', () => {
    expect(() => getCaseInsensitive(mockObj, undefined)).toThrow(/key/)
  })
})
