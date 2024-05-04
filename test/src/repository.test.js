import { InMemoryRepository } from '#root/src/repositories.js'
import assert from 'assert'


describe('InMemoryRepository', function() {
  describe('#get', function() {
    it('should return undefined if id is not present', function() {
      const repository = new InMemoryRepository([
        { id: 1, value: 42 },
        { id: 2, value: 24 },
        { id: 3, value: 44 },
      ])

      return repository.get(4).then(entity => {
        assert.equal(entity, undefined)
      })
    })

    it('should return value if id is present', function() {
      const repository = new InMemoryRepository([
        { id: 1, value: 42 },
        { id: 2, value: 24 },
        { id: 3, value: 44 },
      ])

      return repository.get(3).then(entity => {
        assert.equal(entity.value, 44)
      })
    })
  })

  describe('#getAll', function() {

  })
})