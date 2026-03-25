import { describe, expect, it } from 'vitest'

import countBy from '../src/countBy.js'
import every from '../src/every.js'
import isEmpty from '../src/isEmpty.js'
import memoize from '../src/memoize.js'
import reduce from '../src/reduce.js'

describe('collection utilities', () => {
  it('every should require all values to pass predicate', () => {
    expect(every([true, 1, 'yes'], Boolean)).toBe(true)
    expect(every([true, 1, null, 'yes'], Boolean)).toBe(false)
  })

  it('reduce should accumulate values', () => {
    expect(reduce([1, 2, 3], (sum, n) => sum + n, 0)).toBe(6)
  })

  it('countBy should count grouped values', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'betty', active: true },
      { user: 'fred', active: false }
    ]
    expect(countBy(users, (value) => value.active)).toEqual({ true: 2, false: 1 })
  })

  it('memoize should cache results based on first argument', () => {
    let calls = 0
    const fn = memoize((n) => {
      calls += 1
      return n * 2
    })

    expect(fn(4)).toBe(8)
    expect(fn(4)).toBe(8)
    expect(calls).toBe(1)
  })

  it('isEmpty should detect empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
  })
})
