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
