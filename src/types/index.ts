// ──────────────────────────────────────────────
// Tipos principales de la aplicación OrtografíaESO
// ──────────────────────────────────────────────

export type ModuleId =
  | 'b-v'
  | 'h'
  | 'll-y'
  | 'g-j'
  | 'tilde-diacritica'
  | 'tilde-general'
  | 'puntuacion'
  | 'mayusculas'

export type ExerciseType =
  | 'multiple-choice'   // Elige la opción correcta
  | 'fill-blank'        // Completa el hueco
  | 'correct-error'     // Corrige el error en la frase
  | 'classify'          // Clasifica palabras en categorías

export type Difficulty = 'facil' | 'medio' | 'dificil'

// ──────────────────────────────────────────────
// Módulo de ortografía
// ──────────────────────────────────────────────

export interface OrtografiaModule {
  id: ModuleId
  title: string
  description: string
  icon: string
  color: string
  colorLight: string
  rules: string[]
  totalExercises: number
}

// ──────────────────────────────────────────────
// Ejercicios
// ──────────────────────────────────────────────

export interface BaseExercise {
  id: string
  moduleId: ModuleId
  type: ExerciseType
  difficulty: Difficulty
  explanation: string   // Explicación tras responder
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice'
  question: string      // Ej: "¿Cuál es la forma correcta?"
  options: string[]     // Ej: ["iba", "iva"]
  correctIndex: number
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank'
  sentence: string      // Frase con ___ en el hueco
  options: string[]     // Opciones para rellenar
  correctIndex: number
}

export interface CorrectErrorExercise extends BaseExercise {
  type: 'correct-error'
  sentence: string      // Frase con un error
  correctSentence: string
  errorWord: string     // Palabra incorrecta
  correctWord: string   // Palabra correcta
}

export interface ClassifyExercise extends BaseExercise {
  type: 'classify'
  instruction: string
  words: ClassifyWord[]
  categories: string[]
}

export interface ClassifyWord {
  word: string
  correctCategory: string
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | CorrectErrorExercise
  | ClassifyExercise

// ──────────────────────────────────────────────
// Progreso del usuario
// ──────────────────────────────────────────────

export interface ModuleProgress {
  moduleId: ModuleId
  completed: number
  total: number
  xp: number
  lastPlayed?: string   // ISO date string
  badges: BadgeId[]
}

export type BadgeId =
  | 'first-exercise'
  | 'module-complete'
  | 'perfect-score'
  | 'streak-3'
  | 'streak-7'
  | 'master'

export interface Badge {
  id: BadgeId
  name: string
  description: string
  icon: string
}

export interface UserProgress {
  totalXP: number
  level: number
  streak: number
  lastPlayedDate?: string
  modules: Record<ModuleId, ModuleProgress>
  unlockedBadges: BadgeId[]
}

// ──────────────────────────────────────────────
// Resultado de una sesión de ejercicio
// ──────────────────────────────────────────────

export interface ExerciseResult {
  exerciseId: string
  question: string      // Texto de la pregunta/frase para mostrar en el resumen
  correct: boolean
  selectedAnswer: string | number
  timeMs: number
}

export interface SessionResult {
  moduleId: ModuleId
  results: ExerciseResult[]
  xpEarned: number
  completedAt: string
}
