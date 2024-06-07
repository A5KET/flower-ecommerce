import { deepStrictEqual } from 'assert'
import { format } from '#root//src/schemas.js'

describe('format', function() {
  it('should format value if format was specified', function() {
    const schema = {
      id: Number
    }

    const object = {
      id: '01234'
    }

    const expected = {
      id: 1234
    }

    deepStrictEqual(format(schema, object), expected)
  })
})