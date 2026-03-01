import type { Exercise } from '../../types'

export const MAYUSCULAS_EXERCISES: Exercise[] = [
  {
    id: 'may-001',
    moduleId: 'mayusculas',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál de estas opciones está correctamente escrita?',
    options: ['vivo en madrid', 'Vivo en Madrid', 'vivo en Madrid'],
    correctIndex: 1,
    explanation:
      'Se escribe con mayúscula: la primera palabra de un enunciado y los nombres propios (Madrid es un nombre propio de ciudad).',
  },
  {
    id: 'may-002',
    moduleId: 'mayusculas',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué palabra lleva mayúscula correctamente?',
    options: ['Me llamo Juan, soy Español.', 'Me llamo Juan, soy español.', 'me llamo juan, soy español.'],
    correctIndex: 1,
    explanation:
      'Los gentilicios (español, francés, madrileño…) se escriben con minúscula en español. Solo lleva mayúscula el nombre propio "Juan".',
  },
  {
    id: 'may-003',
    moduleId: 'mayusculas',
    type: 'correct-error',
    difficulty: 'facil',
    sentence: 'el lunes tenemos examen de historia.',
    correctSentence: 'El lunes tenemos examen de historia.',
    errorWord: 'el',
    correctWord: 'El',
    explanation:
      'La primera palabra de un enunciado siempre empieza con mayúscula. "El" inicia la oración, así que debe escribirse "El".',
  },
  {
    id: 'may-004',
    moduleId: 'mayusculas',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'Mi profesor favorito se llama ___ García.',
    options: ['carlos', 'Carlos'],
    correctIndex: 1,
    explanation:
      'Los nombres propios de personas siempre se escriben con mayúscula inicial: Carlos, María, Lucía, Pedro.',
  },
  {
    id: 'may-005',
    moduleId: 'mayusculas',
    type: 'classify',
    difficulty: 'facil',
    instruction: 'Clasifica si estas palabras deben escribirse con mayúscula o minúscula',
    words: [
      { word: 'barcelona', correctCategory: 'Mayúscula' },
      { word: 'libro', correctCategory: 'Minúscula' },
      { word: 'europa', correctCategory: 'Mayúscula' },
      { word: 'ciudad', correctCategory: 'Minúscula' },
      { word: 'amazon', correctCategory: 'Mayúscula' },
      { word: 'río', correctCategory: 'Minúscula' },
    ],
    categories: ['Mayúscula', 'Minúscula'],
    explanation:
      'Los nombres propios (Barcelona, Europa, Amazonas) llevan mayúscula. Los nombres comunes (libro, ciudad, río) llevan minúscula.',
  },
  {
    id: 'may-006',
    moduleId: 'mayusculas',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál de estas frases está correctamente escrita?',
    options: [
      'El Papa Francisco visitó España.',
      'El papa Francisco visitó españa.',
      'El papa francisco visitó España.',
    ],
    correctIndex: 0,
    explanation:
      '"Papa" como título que acompaña al nombre propio se escribe con mayúscula. "España" es nombre propio de país. "Francisco" es nombre propio de persona.',
  },
  {
    id: 'may-007',
    moduleId: 'mayusculas',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'Esta semana celebramos la navidad con toda la familia.',
    correctSentence: 'Esta semana celebramos la Navidad con toda la familia.',
    errorWord: 'navidad',
    correctWord: 'Navidad',
    explanation:
      'Los nombres de fiestas y celebraciones se escriben con mayúscula: Navidad, Semana Santa, Año Nuevo, Carnaval.',
  },
  {
    id: 'may-008',
    moduleId: 'mayusculas',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'Leímos el ___ Quijote en clase de lengua.',
    options: ['quijote', 'Quijote'],
    correctIndex: 1,
    explanation:
      'Los títulos de obras literarias, películas o canciones llevan mayúscula en la primera palabra: El Quijote, La Celestina, Romeo y Julieta.',
  },
  {
    id: 'may-009',
    moduleId: 'mayusculas',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál de estas opciones usa correctamente las mayúsculas?',
    options: [
      'El río Tajo nace en Teruel.',
      'El Río tajo nace en Teruel.',
      'El río tajo nace en teruel.',
    ],
    correctIndex: 0,
    explanation:
      '"Tajo" es nombre propio del río (lleva mayúscula), pero la palabra genérica "río" va en minúscula. "Teruel" es nombre propio de ciudad (mayúscula).',
  },
  {
    id: 'may-010',
    moduleId: 'mayusculas',
    type: 'correct-error',
    difficulty: 'dificil',
    sentence: 'El Presidente del gobierno habló ante el congreso de los diputados.',
    correctSentence: 'El presidente del gobierno habló ante el Congreso de los Diputados.',
    errorWord: 'Presidente',
    correctWord: 'presidente',
    explanation:
      'Los cargos como "presidente", "ministro" o "rey" se escriben con minúscula cuando no acompañan al nombre propio. En cambio, el nombre completo de instituciones como "Congreso de los Diputados" sí lleva mayúsculas.',
  },
  {
    id: 'may-011',
    moduleId: 'mayusculas',
    type: 'classify',
    difficulty: 'medio',
    instruction: 'Indica si la palabra subrayada debe ir en mayúscula o minúscula en cada contexto',
    words: [
      { word: '"tierra" (el planeta)', correctCategory: 'Mayúscula' },
      { word: '"tierra" (el suelo)', correctCategory: 'Minúscula' },
      { word: '"luna" (satélite)', correctCategory: 'Mayúscula' },
      { word: '"luna" (de miel)', correctCategory: 'Minúscula' },
      { word: '"sol" (la estrella)', correctCategory: 'Mayúscula' },
      { word: '"sol" (hace calor)', correctCategory: 'Minúscula' },
    ],
    categories: ['Mayúscula', 'Minúscula'],
    explanation:
      'Cuando "tierra", "luna" y "sol" se refieren a los astros como nombres propios, llevan mayúscula. Como nombres comunes (el suelo, la luna de miel, el calor del sol), llevan minúscula.',
  },
  {
    id: 'may-012',
    moduleId: 'mayusculas',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'El ___ de Cervantes es una obra universal.',
    options: ['quijote', 'Quijote'],
    correctIndex: 1,
    explanation:
      'El título de la obra se escribe con mayúscula: "El Quijote". Los títulos abreviados de obras literarias se tratan como nombres propios.',
  },
]
