/**
 * Calcula el XP necesario para el siguiente nivel
 */
export const xpForNextLevel = (level: number): number => level * level * 50

/**
 * Porcentaje de progreso hacia el siguiente nivel (0-100)
 */
export const levelProgress = (totalXP: number, level: number): number => {
  const currentLevelXP = (level - 1) * (level - 1) * 50
  const nextLevelXP = xpForNextLevel(level)
  return Math.round(((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100)
}

/**
 * Porcentaje de progreso de un módulo (0-100)
 */
export const moduleProgressPercent = (completed: number, total: number): number =>
  total === 0 ? 0 : Math.round((completed / total) * 100)

/**
 * Mezcla un array aleatoriamente (Fisher-Yates)
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Formatea una fecha ISO en español
 */
export const formatDate = (isoStr: string): string => {
  const date = new Date(isoStr)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Devuelve la clase de color según porcentaje de aciertos
 */
export const scoreColor = (percent: number): string => {
  if (percent >= 80) return 'text-green-600'
  if (percent >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

/**
 * Selecciona BATCH_SIZE ejercicios de forma aleatoria pero con dificultad
 * progresiva: primero los fáciles, luego los de dificultad media y por último
 * los difíciles. Dentro de cada grupo el orden es aleatorio.
 *
 * Distribución objetivo para BATCH_SIZE = 10:
 *   4 × fácil  →  3 × medio  →  3 × difícil
 *
 * Si algún nivel tiene menos ejercicios de los necesarios se compensan
 * tomando más del nivel inmediatamente superior (o del inferior si no queda
 * ningún superior).
 */
export const selectExercisesProgressive = <T extends { difficulty: 'facil' | 'medio' | 'dificil' }>(
  exercises: T[],
  batchSize = 10,
): T[] => {
  const facil  = shuffle(exercises.filter((e) => e.difficulty === 'facil'))
  const medio  = shuffle(exercises.filter((e) => e.difficulty === 'medio'))
  const dificil = shuffle(exercises.filter((e) => e.difficulty === 'dificil'))

  // Cuotas iniciales: 40 % fácil, 30 % medio, 30 % difícil
  const wantFacil   = Math.round(batchSize * 0.4)   // 4
  const wantMedio   = Math.round(batchSize * 0.3)   // 3
  const wantDificil = batchSize - wantFacil - wantMedio // 3

  const takeFacil   = Math.min(wantFacil,   facil.length)
  const takeMedio   = Math.min(wantMedio,   medio.length)
  const takeDificil = Math.min(wantDificil, dificil.length)

  const selected: T[] = [
    ...facil.slice(0, takeFacil),
    ...medio.slice(0, takeMedio),
    ...dificil.slice(0, takeDificil),
  ]

  // Si faltan ejercicios para completar el lote, rellenar con los sobrantes
  // en orden de dificultad (primero los más fáciles disponibles).
  if (selected.length < batchSize) {
    const used = new Set(selected)
    const extras = [
      ...facil.slice(takeFacil),
      ...medio.slice(takeMedio),
      ...dificil.slice(takeDificil),
    ].filter((e) => !used.has(e))

    selected.push(...extras.slice(0, batchSize - selected.length))
  }

  // El orden final es siempre fácil → medio → difícil
  // (ya están en ese orden por la concatenación anterior)
  return selected
}
