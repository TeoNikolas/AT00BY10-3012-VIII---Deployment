import { describe, expect, it } from 'vitest'

import defaultTo from '../src/defaultTo.js'
import defaultToAny from '../src/defaultToAny.js'
import eq from '../src/eq.js'
import isArrayLike from '../src/isArrayLike.js'
import isArrayLikeObject from '../src/isArrayLikeObject.js'
import isBoolean from '../src/isBoolean.js'
import isDate from '../src/isDate.js'
import isLength from '../src/isLength.js'
import isObject from '../src/isObject.js'
import isObjectLike from '../src/isObjectLike.js'
import isSymbol from '../src/isSymbol.js'
import isTypedArray from '../src/isTypedArray.js'

describe('lang utilities', () => {
  it('defaultTo should return default for null or undefined', () => {
    expect(defaultTo(1, 10)).toBe(1)
    expect(defaultTo(undefined, 10)).toBe(10)
    expect(defaultTo(null, 10)).toBe(10)
  })

  it('defaultToAny should use first non-nullish candidate', () => {
    expect(defaultToAny(undefined, null, 20)).toBe(20)
    expect(defaultToAny('x', 'a', 'b')).toBe('x')
  })

  it('eq should use SameValueZero semantics', () => {
    expect(eq(NaN, NaN)).toBe(true)
    expect(eq('a', Object('a'))).toBe(false)
    const obj = { a: 1 }
    expect(eq(obj, obj)).toBe(true)
  })

  it('isLength should validate array-like lengths', () => {
    expect(isLength(3)).toBe(true)
    expect(isLength(Number.MIN_VALUE)).toBe(false)
    expect(isLength('3')).toBe(false)
  })

  it('isArrayLike and isArrayLikeObject should detect values', () => {
    expect(isArrayLike([1, 2, 3])).toBe(true)
    expect(isArrayLike('abc')).toBe(true)
    expect(isArrayLike(() => {})).toBe(false)
    expect(isArrayLikeObject([1, 2, 3])).toBe(true)
    expect(isArrayLikeObject('abc')).toBe(false)
  })

  it('isBoolean should detect booleans', () => {
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(null)).toBe(false)
  })

  it('isDate should detect date objects', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate('2020-01-01')).toBe(false)
  })

  it('isObject and isObjectLike should classify values', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(() => {})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObjectLike({})).toBe(true)
    expect(isObjectLike(() => {})).toBe(false)
  })

  it('isSymbol should detect symbols', () => {
    expect(isSymbol(Symbol.iterator)).toBe(true)
    expect(isSymbol('abc')).toBe(false)
  })

  it('isTypedArray should detect typed arrays', () => {
    expect(isTypedArray(new Uint8Array([1, 2]))).toBe(true)
    expect(isTypedArray([1, 2])).toBe(false)
  })
})
