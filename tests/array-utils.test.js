import { describe, expect, it } from 'vitest'

import castArray from '../src/castArray.js'
import chunk from '../src/chunk.js'
import compact from '../src/compact.js'
import difference from '../src/difference.js'
import drop from '../src/drop.js'
import filter from '../src/filter.js'
import map from '../src/map.js'
import slice from '../src/slice.js'

describe('array utilities', () => {
  it('castArray should keep arrays and wrap non-arrays', () => {
    expect(castArray([1, 2])).toEqual([1, 2])
    expect(castArray('a')).toEqual(['a'])
    expect(castArray()).toEqual([undefined])
  })

  it('chunk should split arrays by size', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']])
    expect(chunk(['a', 'b', 'c'], 2)).toEqual([['a', 'b'], ['c']])
    expect(chunk([], 2)).toEqual([])
  })

  it('compact should remove falsey values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, NaN])).toEqual([1, 2, 3])
  })

  it('difference should return values not present in other arrays', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1])
    expect(difference([1, 2, 3], [1], [3])).toEqual([2])
  })

  it('drop should drop N elements from start', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3])
    expect(drop([1, 2, 3], 2)).toEqual([3])
    expect(drop([1, 2, 3], 5)).toEqual([])
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3])
  })

  it('filter should keep matching elements', () => {
    expect(filter([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4])
  })

  it('map should transform each value', () => {
    expect(map([2, 3, 4], (n) => n * n)).toEqual([4, 9, 16])
  })

  it('slice should support start and end indexes', () => {
    expect(slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3])
    expect(slice([1, 2, 3, 4], -2)).toEqual([3, 4])
    expect(slice([1, 2, 3, 4], 0, -1)).toEqual([1, 2, 3])
  })
})
