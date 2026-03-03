import { describe, it, expect } from 'vitest'
import { shuffle, moduleProgressPercent, levelProgress, scoreColor, selectExercisesProgressive } from '../utils'

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

// Helper para crear ejercicios de prueba
type MockExercise = { id: string; difficulty: 'facil' | 'medio' | 'dificil' }
const makeExercises = (counts: [number, number, number]): MockExercise[] => {
  const [nF, nM, nD] = counts
  const result: MockExercise[] = []
  for (let i = 0; i < nF; i++) result.push({ id: `f${i}`, difficulty: 'facil' })
  for (let i = 0; i < nM; i++) result.push({ id: `m${i}`, difficulty: 'medio' })
  for (let i = 0; i < nD; i++) result.push({ id: `d${i}`, difficulty: 'dificil' })
  return result
}

describe('selectExercisesProgressive', () => {
  it('devuelve exactamente 10 ejercicios cuando hay suficientes', () => {
    const pool = makeExercises([20, 20, 20])
    expect(selectExercisesProgressive(pool)).toHaveLength(10)
  })

  it('los primeros ejercicios son fáciles y los últimos difíciles', () => {
    const pool = makeExercises([20, 20, 20])
    const batch = selectExercisesProgressive(pool)
    const difficulties = batch.map((e) => e.difficulty)
    // Comprobamos que ningún fácil aparece detrás de un difícil
    const lastFacil = difficulties.lastIndexOf('facil')
    const firstDificil = difficulties.indexOf('dificil')
    if (lastFacil !== -1 && firstDificil !== -1) {
      expect(lastFacil).toBeLessThan(firstDificil)
    }
  })

  it('completa el lote aunque falten ejercicios de un nivel', () => {
    const pool = makeExercises([2, 2, 20]) // solo 2 fáciles y 2 medios
    const batch = selectExercisesProgressive(pool)
    expect(batch).toHaveLength(10)
  })

  it('devuelve todos los ejercicios si el banco es menor que el lote', () => {
    const pool = makeExercises([2, 2, 2]) // solo 6 en total
    const batch = selectExercisesProgressive(pool)
    expect(batch).toHaveLength(6)
  })

  it('no repite ejercicios dentro del mismo lote', () => {
    const pool = makeExercises([10, 10, 10])
    const batch = selectExercisesProgressive(pool)
    const ids = batch.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
