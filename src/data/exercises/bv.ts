import type { Exercise } from '../../types'

export const BV_EXERCISES: Exercise[] = [
  {
    id: 'bv-001',
    moduleId: 'b-v',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál es la forma correcta del verbo "ir" en pasado?',
    options: ['iva', 'iba', 'hiba'],
    correctIndex: 1,
    explanation:
      'El pretérito imperfecto de los verbos en -ar y del verbo "ir" se escribe siempre con B: iba, cantaba, amaba.',
  },
  {
    id: 'bv-002',
    moduleId: 'b-v',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué palabra está bien escrita?',
    options: ['vicicleta', 'bicicleta', 'bizizleta'],
    correctIndex: 1,
    explanation:
      'Las palabras con el prefijo bi- (dos) se escriben con B: bicicleta, bilingüe, bisabuelo.',
  },
  {
    id: 'bv-003',
    moduleId: 'b-v',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'Ayer mi madre ___ al mercado muy temprano.',
    options: ['fue', 'fué'],
    correctIndex: 0,
    explanation:
      'El verbo "ir" en pasado es "fue" y no lleva tilde por ser monosílabo.',
  },
  {
    id: 'bv-004',
    moduleId: 'b-v',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál es la forma correcta del verbo?',
    options: ['recivir', 'recibir', 'rrecibir'],
    correctIndex: 1,
    explanation:
      'Los verbos terminados en -bir se escriben con B: recibir, subir, exhibir (salvo vivir, servir, hervir).',
  },
  {
    id: 'bv-005',
    moduleId: 'b-v',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'El jugador ___ la pelota con mucha fuerza.',
    options: ['golveó', 'golpeó'],
    correctIndex: 1,
    explanation:
      '"Golpear" se escribe con P y su conjugado es "golpeó".',
  },
  {
    id: 'bv-006',
    moduleId: 'b-v',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'Mañana devemos entregar el trabajo de ciencias.',
    correctSentence: 'Mañana debemos entregar el trabajo de ciencias.',
    errorWord: 'devemos',
    correctWord: 'debemos',
    explanation:
      '"Deber" se escribe con B. La regla general es que se escribe B ante consonante y en muchos verbos comunes.',
  },
  {
    id: 'bv-007',
    moduleId: 'b-v',
    type: 'classify',
    difficulty: 'facil',
    instruction: 'Clasifica estas palabras según se escriban con B o con V',
    words: [
      { word: 'beso', correctCategory: 'B' },
      { word: 'vela', correctCategory: 'V' },
      { word: 'banco', correctCategory: 'B' },
      { word: 'vivir', correctCategory: 'V' },
      { word: 'libro', correctCategory: 'B' },
      { word: 'favor', correctCategory: 'V' },
    ],
    categories: ['B', 'V'],
    explanation:
      'Recuerda: "beso", "banco" y "libro" llevan B. "Vela", "vivir" y "favor" llevan V.',
  },
  {
    id: 'bv-008',
    moduleId: 'b-v',
    type: 'multiple-choice',
    difficulty: 'dificil',
    question: '¿Cuál de estas palabras se escribe con V?',
    options: ['abrigo', 'nieve', 'caballo'],
    correctIndex: 1,
    explanation:
      '"Nieve" se escribe con V. Los sustantivos y adjetivos terminados en -ieve, -eve, -ave suelen escribirse con V: nieve, breve, clave.',
  },
  {
    id: 'bv-009',
    moduleId: 'b-v',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'Es ___ que los alumnos traigan los libros cada día.',
    options: ['obligatorio', 'ovligatorio'],
    correctIndex: 0,
    explanation:
      '"Obligatorio" se escribe con B. Se escribe B delante de consonante: ob-li-ga-to-rio.',
  },
  {
    id: 'bv-010',
    moduleId: 'b-v',
    type: 'correct-error',
    difficulty: 'dificil',
    sentence: 'El nuebo director del instituto llegará la semana que viene.',
    correctSentence: 'El nuevo director del instituto llegará la semana que viene.',
    errorWord: 'nuebo',
    correctWord: 'nuevo',
    explanation:
      '"Nuevo" se escribe con V. Los adjetivos terminados en -evo, -eva se escriben con V: nuevo, breve, leve.',
  },
]
