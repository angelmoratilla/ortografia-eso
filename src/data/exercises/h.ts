import type { Exercise } from '../../types'

export const H_EXERCISES: Exercise[] = [
  {
    id: 'h-001',
    moduleId: 'h',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál está bien escrito?',
    options: ['uevo', 'huevo', 'guevo'],
    correctIndex: 1,
    explanation:
      'Las palabras que empiezan por el diptongo "hue-" se escriben con H: huevo, hueso, hueco.',
  },
  {
    id: 'h-002',
    moduleId: 'h',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué forma es correcta?',
    options: ['Ola amigos', 'Hola amigos', 'Olla amigos'],
    correctIndex: 1,
    explanation: 'La interjección "hola" siempre se escribe con H.',
  },
  {
    id: 'h-003',
    moduleId: 'h',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'El agua se convirtió en ___ con el frío.',
    options: ['ielo', 'hielo'],
    correctIndex: 1,
    explanation:
      '"Hielo" empieza por "hie-", un diptongo que siempre va precedido de H.',
  },
  {
    id: 'h-004',
    moduleId: 'h',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'Esta mañana Juan ___ llegado tarde a clase.',
    options: ['a', 'ha'],
    correctIndex: 1,
    explanation:
      '"Ha" es una forma del verbo "haber" (ha llegado) y siempre se escribe con H. "A" es una preposición.',
  },
  {
    id: 'h-005',
    moduleId: 'h',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál de estas palabras NO se escribe con H?',
    options: ['hermano', 'ermita', 'hierba'],
    correctIndex: 1,
    explanation:
      '"Ermita" se escribe sin H. "Hermano" (del latín "germanus") y "hierba" (empieza por hie-) sí llevan H.',
  },
  {
    id: 'h-006',
    moduleId: 'h',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'Mañana iremos de excursión al istórico castillo del pueblo.',
    correctSentence: 'Mañana iremos de excursión al histórico castillo del pueblo.',
    errorWord: 'istórico',
    correctWord: 'histórico',
    explanation:
      '"Histórico" lleva H porque deriva del prefijo griego "histor" (historia).',
  },
  {
    id: 'h-007',
    moduleId: 'h',
    type: 'classify',
    difficulty: 'facil',
    instruction: 'Clasifica si estas palabras llevan H o no',
    words: [
      { word: 'humo', correctCategory: 'Con H' },
      { word: 'amor', correctCategory: 'Sin H' },
      { word: 'hielo', correctCategory: 'Con H' },
      { word: 'araña', correctCategory: 'Sin H' },
      { word: 'hermano', correctCategory: 'Con H' },
      { word: 'elefante', correctCategory: 'Sin H' },
    ],
    categories: ['Con H', 'Sin H'],
    explanation:
      '"Humo", "hielo" y "hermano" llevan H. "Amor", "araña" y "elefante" no llevan H.',
  },
  {
    id: 'h-008',
    moduleId: 'h',
    type: 'multiple-choice',
    difficulty: 'dificil',
    question: '¿Cuál de estas formas verbales es correcta?',
    options: ['Nosotros abiamos comido', 'Nosotros habiamos comido', 'Nosotros habíamos comido'],
    correctIndex: 2,
    explanation:
      '"Habíamos" es el pluscuamperfecto del verbo "haber" y siempre se escribe con H. Además lleva tilde en la í.',
  },
]
