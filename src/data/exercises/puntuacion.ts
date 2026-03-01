import type { Exercise } from '../../types'

export const PUNTUACION_EXERCISES: Exercise[] = [
  {
    id: 'pun-001',
    moduleId: 'puntuacion',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué signo va al final de esta oración: "Qué bonito día"?',
    options: ['Punto (.)', 'Signo de exclamación (¡!)', 'Signo de interrogación (¿?)'],
    correctIndex: 1,
    explanation:
      'La oración expresa admiración o emoción, por lo que necesita signos de exclamación: ¡Qué bonito día! En español se pone signo de apertura (¡) al inicio.',
  },
  {
    id: 'pun-002',
    moduleId: 'puntuacion',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué signo separa los elementos de una enumeración?',
    options: ['El punto (.)', 'La coma (,)', 'Los dos puntos (:)'],
    correctIndex: 1,
    explanation:
      'La coma separa los elementos de una enumeración: Compré pan, leche, huevos y mantequilla.',
  },
  {
    id: 'pun-003',
    moduleId: 'puntuacion',
    type: 'correct-error',
    difficulty: 'facil',
    sentence: 'Hoy tenemos clase de inglés, matemáticas y educación física',
    correctSentence: 'Hoy tenemos clase de inglés, matemáticas y educación física.',
    errorWord: 'física',
    correctWord: 'física.',
    explanation:
      'Toda oración que termina un enunciado debe acabar con un punto. Faltaba el punto final.',
  },
  {
    id: 'pun-004',
    moduleId: 'puntuacion',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'María___ ¿puedes venir un momento?',
    options: [',', ';'],
    correctIndex: 0,
    explanation:
      'Se usa la coma para separar el vocativo (la persona a quien nos dirigimos) del resto de la oración: "María, ¿puedes venir?"',
  },
  {
    id: 'pun-005',
    moduleId: 'puntuacion',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál de estas oraciones está correctamente puntuada?',
    options: [
      'Llegué tarde, porque perdí el autobús.',
      'Llegué tarde porque perdí el autobús.',
      'Llegué, tarde porque perdí el autobús.',
    ],
    correctIndex: 1,
    explanation:
      'No se pone coma antes de "porque" cuando introduce una oración causal. La coma antes de "porque" solo se usa cuando significa "por qué razón" (interrogativa indirecta).',
  },
  {
    id: 'pun-006',
    moduleId: 'puntuacion',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'El profesor dijo: los deberes son para mañana.',
    correctSentence: 'El profesor dijo: «Los deberes son para mañana».',
    errorWord: 'mañana.',
    correctWord: '«Los deberes son para mañana».',
    explanation:
      'Cuando se reproduce lo que alguien dijo (estilo directo), las comillas rodean las palabras citadas y la primera lleva mayúscula: «Los deberes son para mañana».',
  },
  {
    id: 'pun-007',
    moduleId: 'puntuacion',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'Estudié mucho___ sin embargo, no aprobé el examen.',
    options: [';', ','],
    correctIndex: 0,
    explanation:
      'El punto y coma (;) separa oraciones relacionadas entre sí cuando la segunda comienza con un conector como "sin embargo", "no obstante", "por eso".',
  },
  {
    id: 'pun-008',
    moduleId: 'puntuacion',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Qué signo se usa correctamente en esta oración?',
    options: [
      'Necesito tres cosas, dinero, tiempo y paciencia.',
      'Necesito tres cosas: dinero, tiempo y paciencia.',
      'Necesito tres cosas; dinero, tiempo y paciencia.',
    ],
    correctIndex: 1,
    explanation:
      'Los dos puntos (:) anuncian una enumeración. Se usan cuando antes se indica de forma general lo que se va a enumerar.',
  },
  {
    id: 'pun-009',
    moduleId: 'puntuacion',
    type: 'classify',
    difficulty: 'medio',
    instruction: 'Clasifica cada signo según su uso principal',
    words: [
      { word: 'Enumerar elementos', correctCategory: 'Coma' },
      { word: 'Anunciar cita', correctCategory: 'Dos puntos' },
      { word: 'Separar vocativo', correctCategory: 'Coma' },
      { word: 'Unir oraciones relacionadas', correctCategory: 'Punto y coma' },
      { word: 'Introducir enumeración', correctCategory: 'Dos puntos' },
      { word: 'Separar oraciones largas', correctCategory: 'Punto y coma' },
    ],
    categories: ['Coma', 'Dos puntos', 'Punto y coma'],
    explanation:
      'La coma enumera y separa vocativos. Los dos puntos anuncian citas y enumeraciones. El punto y coma une oraciones largas y relacionadas.',
  },
  {
    id: 'pun-010',
    moduleId: 'puntuacion',
    type: 'correct-error',
    difficulty: 'dificil',
    sentence: 'Juan, Pedro y Ana vinieron a la fiesta, y lo pasaron muy bien.',
    correctSentence: 'Juan, Pedro y Ana vinieron a la fiesta y lo pasaron muy bien.',
    errorWord: 'fiesta,',
    correctWord: 'fiesta',
    explanation:
      'No se pone coma delante de "y" cuando une dos oraciones simples que comparten el mismo sujeto. La coma ante "y" solo se usa en enumeraciones o cuando la segunda oración tiene sujeto distinto.',
  },
  {
    id: 'pun-011',
    moduleId: 'puntuacion',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'Me gustan varios deportes___ el fútbol, la natación y el baloncesto.',
    options: [':', ';'],
    correctIndex: 0,
    explanation:
      'Los dos puntos (:) se usan para introducir una enumeración cuando antes se hace una mención general ("varios deportes").',
  },
  {
    id: 'pun-012',
    moduleId: 'puntuacion',
    type: 'multiple-choice',
    difficulty: 'dificil',
    question: '¿Cuál de estas oraciones está correctamente puntuada?',
    options: [
      'Sin embargo no pudimos terminar el proyecto a tiempo.',
      'Sin embargo, no pudimos terminar el proyecto a tiempo.',
      'Sin embargo; no pudimos terminar el proyecto a tiempo.',
    ],
    correctIndex: 1,
    explanation:
      'Los conectores de adversatividad como "sin embargo", "no obstante", "además" van seguidos de coma cuando aparecen al inicio de la oración.',
  },
]
