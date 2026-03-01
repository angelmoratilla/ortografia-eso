import { describe, it, expect } from 'vitest'
import { shuffle, moduleProgressPercent, levelProgress, scoreColor } from '../utils'

describe('shuffle', () => {
  it('devuelve el mismo número de elementos', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffle(arr)).toHaveLength(5)
  })

  it('contiene los mismos elementos que el original', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffle(arr).sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('no modifica el array original', () => {
    const arr = [1, 2, 3]
    shuffle(arr)
    expect(arr).toEqual([1, 2, 3])
  })
})

describe('moduleProgressPercent', () => {
  it('devuelve 0 si no hay completados', () => {
    expect(moduleProgressPercent(0, 10)).toBe(0)
  })

  it('devuelve 100 si están todos completados', () => {
    expect(moduleProgressPercent(10, 10)).toBe(100)
  })

  it('devuelve 50 si la mitad está completada', () => {
    expect(moduleProgressPercent(5, 10)).toBe(50)
  })

  it('devuelve 0 si total es 0', () => {
    expect(moduleProgressPercent(0, 0)).toBe(0)
  })
})

describe('levelProgress', () => {
  it('devuelve un valor entre 0 y 100', () => {
    const pct = levelProgress(150, 2)
    expect(pct).toBeGreaterThanOrEqual(0)
    expect(pct).toBeLessThanOrEqual(100)
  })
})

describe('scoreColor', () => {
  it('devuelve verde para >= 80%', () => {
    expect(scoreColor(80)).toBe('text-green-600')
    expect(scoreColor(100)).toBe('text-green-600')
  })

  it('devuelve amarillo para 50-79%', () => {
    expect(scoreColor(50)).toBe('text-yellow-600')
    expect(scoreColor(70)).toBe('text-yellow-600')
  })

  it('devuelve rojo para < 50%', () => {
    expect(scoreColor(0)).toBe('text-red-600')
    expect(scoreColor(49)).toBe('text-red-600')
  })
})
