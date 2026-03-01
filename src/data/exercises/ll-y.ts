import type { Exercise } from '../../types'

export const LLY_EXERCISES: Exercise[] = [
  {
    id: 'lly-001',
    moduleId: 'll-y',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál de estas palabras está bien escrita?',
    options: ['rey', 'rell', 'reyll'],
    correctIndex: 0,
    explanation:
      'Se escribe Y al final de palabra cuando es átona y va después de vocal: rey, ley, hoy, buey.',
  },
  {
    id: 'lly-002',
    moduleId: 'll-y',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cómo se escribe correctamente?',
    options: ['tortiya', 'tortilla', 'tortilya'],
    correctIndex: 1,
    explanation:
      'Las palabras terminadas en -illa, -illo se escriben con LL: tortilla, sencillo, cepillo.',
  },
  {
    id: 'lly-003',
    moduleId: 'll-y',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'El ___ brilla en el cielo de noche.',
    options: ['rej', 'rey'],
    correctIndex: 1,
    explanation:
      '"Rey" termina en Y porque es átona y va precedida de vocal. Las palabras que terminan en diptongo con i átona usan Y.',
  },
  {
    id: 'lly-004',
    moduleId: 'll-y',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'La ___ de la puerta estaba rota.',
    options: ['llave', 'yave'],
    correctIndex: 0,
    explanation:
      '"Llave" se escribe con LL. Las palabras que empiezan por el sonido /ʎ/ ante vocal suelen escribirse con LL.',
  },
  {
    id: 'lly-005',
    moduleId: 'll-y',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Qué forma verbal es correcta?',
    options: ['yo construllo', 'yo construyo', 'yo construllo'],
    correctIndex: 1,
    explanation:
      'Los verbos terminados en -uir forman el presente con Y: construyo, destruyo, huyo, incluyo.',
  },
  {
    id: 'lly-006',
    moduleId: 'll-y',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'Marta ___ a casa corriendo cuando empezó a llover.',
    options: ['huyó', 'hulló'],
    correctIndex: 0,
    explanation:
      '"Huir" es un verbo en -uir, por eso usa Y en sus formas: huyo, huyes, huyó, huyeron.',
  },
  {
    id: 'lly-007',
    moduleId: 'll-y',
    type: 'classify',
    difficulty: 'facil',
    instruction: 'Clasifica estas palabras según se escriban con LL o con Y',
    words: [
      { word: 'calle', correctCategory: 'LL' },
      { word: 'yema', correctCategory: 'Y' },
      { word: 'silla', correctCategory: 'LL' },
      { word: 'mayo', correctCategory: 'Y' },
      { word: 'olla', correctCategory: 'LL' },
      { word: 'payaso', correctCategory: 'Y' },
    ],
    categories: ['LL', 'Y'],
    explanation:
      '"Calle", "silla" y "olla" llevan LL. "Yema", "mayo" y "payaso" llevan Y.',
  },
  {
    id: 'lly-008',
    moduleId: 'll-y',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'El cabayo galopaba por el campo a gran velocidad.',
    correctSentence: 'El caballo galopaba por el campo a gran velocidad.',
    errorWord: 'cabayo',
    correctWord: 'caballo',
    explanation:
      '"Caballo" se escribe con LL. No existe ninguna regla que justifique Y en esta posición interior de palabra.',
  },
  {
    id: 'lly-009',
    moduleId: 'll-y',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál es la forma correcta del verbo "oír" en pasado?',
    options: ['ellos oieron', 'ellos oyeron', 'ellos olleron'],
    correctIndex: 1,
    explanation:
      'Los verbos cuya raíz termina en vocal forman el pretérito con -yeron: oyeron, cayeron, leyeron, creyeron.',
  },
  {
    id: 'lly-010',
    moduleId: 'll-y',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'Los exploradores ___ el mapa con atención antes de partir.',
    options: ['hallaron', 'hayaron'],
    correctIndex: 0,
    explanation:
      '"Hallar" (encontrar) se escribe con LL. No confundir con "hayar" que no existe; "haya" es del verbo haber.',
  },
  {
    id: 'lly-011',
    moduleId: 'll-y',
    type: 'correct-error',
    difficulty: 'dificil',
    sentence: 'No sé si mi madre halla llegado ya a casa.',
    correctSentence: 'No sé si mi madre habrá llegado ya a casa.',
    errorWord: 'halla',
    correctWord: 'habrá',
    explanation:
      'Aquí "halla" (de hallar = encontrar) está mal usado. Lo correcto es "habrá" (futuro de haber). Son palabras homófonas que se confunden fácilmente.',
  },
  {
    id: 'lly-012',
    moduleId: 'll-y',
    type: 'classify',
    difficulty: 'medio',
    instruction: 'Clasifica estas palabras en la categoría correcta',
    words: [
      { word: 'leyes', correctCategory: 'Y' },
      { word: 'llanto', correctCategory: 'LL' },
      { word: 'yerno', correctCategory: 'Y' },
      { word: 'ballena', correctCategory: 'LL' },
      { word: 'rayar', correctCategory: 'Y' },
      { word: 'brillar', correctCategory: 'LL' },
    ],
    categories: ['LL', 'Y'],
    explanation:
      '"Llanto", "ballena" y "brillar" llevan LL. "Leyes", "yerno" y "rayar" llevan Y.',
  },
]
