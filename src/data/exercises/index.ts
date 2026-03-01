import type { ModuleId, Exercise } from '../../types'
import { BV_EXERCISES } from './bv'
import { H_EXERCISES } from './h'
import { TILDE_DIACRITICA_EXERCISES } from './tilde-diacritica'
import { LLY_EXERCISES } from './ll-y'
import { GJ_EXERCISES } from './g-j'
import { TILDE_GENERAL_EXERCISES } from './tilde-general'
import { PUNTUACION_EXERCISES } from './puntuacion'
import { MAYUSCULAS_EXERCISES } from './mayusculas'

// Banco central de ejercicios por módulo
export const EXERCISES_BY_MODULE: Record<string, Exercise[]> = {
  'b-v': BV_EXERCISES,
  'h': H_EXERCISES,
  'tilde-diacritica': TILDE_DIACRITICA_EXERCISES,
  'll-y': LLY_EXERCISES,
  'g-j': GJ_EXERCISES,
  'tilde-general': TILDE_GENERAL_EXERCISES,
  'puntuacion': PUNTUACION_EXERCISES,
  'mayusculas': MAYUSCULAS_EXERCISES,
}

export const getExercisesForModule = (moduleId: ModuleId): Exercise[] =>
  EXERCISES_BY_MODULE[moduleId] ?? []

export const getExerciseById = (id: string): Exercise | undefined =>
  Object.values(EXERCISES_BY_MODULE)
    .flat()
    .find((ex) => ex.id === id)

export const getModuleExerciseCount = (moduleId: ModuleId): number =>
  (EXERCISES_BY_MODULE[moduleId] ?? []).length
