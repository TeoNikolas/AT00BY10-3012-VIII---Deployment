import { describe, expect, it } from 'vitest'

import add from '../src/add.js'
import ceil from '../src/ceil.js'
import clamp from '../src/clamp.js'
import divide from '../src/divide.js'
import toFinite from '../src/toFinite.js'
import toInteger from '../src/toInteger.js'
import toNumber from '../src/toNumber.js'

describe('number utilities', () => {
  it('add should sum numbers', () => {
    expect(add(6, 4)).toBe(10)
  })

  it('divide should divide dividend by divisor', () => {
    expect(divide(6, 4)).toBe(1.5)
  })

  it('ceil should round up with precision', () => {
    expect(ceil(4.006)).toBe(5)
    expect(ceil(6.004, 2)).toBe(6.01)
  })

  it('clamp should clamp values in bounds', () => {
    expect(clamp(-10, -5, 5)).toBe(-5)
    expect(clamp(10, -5, 5)).toBe(5)
    expect(clamp(2, -5, 5)).toBe(2)
  })

  it('toNumber should convert numeric-like strings', () => {
    expect(toNumber('3.2')).toBe(3.2)
    expect(toNumber('0b1010')).toBe(10)
    expect(toNumber('0o10')).toBe(8)
    expect(Number.isNaN(toNumber('-0x1'))).toBe(true)
  })

  it('toFinite and toInteger should normalize values', () => {
    expect(toFinite(Infinity)).toBe(1.7976931348623157e+308)
    expect(toFinite(-Infinity)).toBe(-1.7976931348623157e+308)
    expect(toInteger(3.9)).toBe(3)
  })
})
