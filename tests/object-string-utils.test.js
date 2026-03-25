import { describe, expect, it } from 'vitest'

import at from '../src/at.js'
import capitalize from '../src/capitalize.js'
import endsWith from '../src/endsWith.js'
import get from '../src/get.js'
import keys from '../src/keys.js'
import toString from '../src/toString.js'
import upperFirst from '../src/upperFirst.js'
import words from '../src/words.js'

describe('object and string utilities', () => {
  it('at should resolve multiple paths', () => {
    const object = { a: [{ b: { c: 3 } }, 4] }
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4])
  })

  it('get should resolve value by path and support default', () => {
    const object = { a: [{ b: { c: 3 } }] }
    expect(get(object, 'a[0].b.c')).toBe(3)
    expect(get(object, 'a.b.c', 'default')).toBe('default')
  })

  it('keys should return own enumerable keys', () => {
    expect(keys({ a: 1, b: 2 }).sort()).toEqual(['a', 'b'])
    expect(keys('hi')).toEqual(['0', '1'])
  })

  it('endsWith should check suffix with optional position', () => {
    expect(endsWith('abc', 'c')).toBe(true)
    expect(endsWith('abc', 'b')).toBe(false)
    expect(endsWith('abc', 'b', 2)).toBe(true)
  })

  it('toString should handle null, arrays and -0', () => {
    expect(toString(null)).toBe('null')
    expect(toString([1, 2, 3])).toBe('1,2,3')
    expect(toString(-0)).toBe('-0')
  })

  it('capitalize and upperFirst should transform casing', () => {
    expect(capitalize('FRED')).toBe('Fred')
    expect(upperFirst('fred')).toBe('Fred')
  })

  it('words should split text into words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles'])
    expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles'])
  })
})
