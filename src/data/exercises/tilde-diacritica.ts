import type { Exercise } from '../../types'

export const TILDE_DIACRITICA_EXERCISES: Exercise[] = [
  {
    id: 'td-001',
    moduleId: 'tilde-diacritica',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: '___ eres el mejor estudiante de la clase.',
    options: ['Tu', 'Tú'],
    correctIndex: 1,
    explanation:
      '"Tú" con tilde es el pronombre personal (sujeto de la oración). "Tu" sin tilde es el posesivo (tu libro, tu casa).',
  },
  {
    id: 'td-002',
    moduleId: 'tilde-diacritica',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: '¿Dónde está ___ mochila?',
    options: ['tu', 'tú'],
    correctIndex: 0,
    explanation:
      'Aquí "tu" es un adjetivo posesivo (acompaña a un nombre) y no lleva tilde: "tu mochila".',
  },
  {
    id: 'td-003',
    moduleId: 'tilde-diacritica',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: '___ llegó antes que todos los demás.',
    options: ['El', 'Él'],
    correctIndex: 1,
    explanation:
      '"Él" con tilde es el pronombre personal masculino. "El" sin tilde es el artículo: "el libro".',
  },
  {
    id: 'td-004',
    moduleId: 'tilde-diacritica',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál es la oración correcta?',
    options: [
      'Se que tienes razón.',
      'Sé que tienes razón.',
    ],
    correctIndex: 1,
    explanation:
      '"Sé" con tilde es la primera persona del verbo "saber" (yo sé). "Se" sin tilde es un pronombre reflexivo.',
  },
  {
    id: 'td-005',
    moduleId: 'tilde-diacritica',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Qué oración está bien escrita?',
    options: [
      'Si quieres, yo sí lo hago.',
      'Sí quieres, yo si lo hago.',
    ],
    correctIndex: 0,
    explanation:
      '"Si" sin tilde es la conjunción condicional. "Sí" con tilde es afirmación o pronombre reflexivo.',
  },
  {
    id: 'td-006',
    moduleId: 'tilde-diacritica',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'Ese regalo es para ___, no para ti.',
    options: ['mi', 'mí'],
    correctIndex: 1,
    explanation:
      '"Mí" con tilde es el pronombre personal de primera persona con preposición: "para mí". "Mi" sin tilde es posesivo.',
  },
  {
    id: 'td-007',
    moduleId: 'tilde-diacritica',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'Te apetece un te con leche antes de estudiar?',
    correctSentence: '¿Te apetece un té con leche antes de estudiar?',
    errorWord: 'te',
    correctWord: 'té',
    explanation:
      '"Té" con tilde es la bebida (infusión). "Te" sin tilde es el pronombre: "te llamo", "te quiero".',
  },
  {
    id: 'td-008',
    moduleId: 'tilde-diacritica',
    type: 'multiple-choice',
    difficulty: 'dificil',
    question: '¿Cuál de estas oraciones es correcta?',
    options: [
      'Dé gracias de que llegaste a tiempo.',
      'De gracias de que llegaste a tiempo.',
    ],
    correctIndex: 0,
    explanation:
      '"Dé" con tilde es el subjuntivo del verbo "dar". "De" sin tilde es la preposición: "vengo de casa".',
  },
  {
    id: 'td-009',
    moduleId: 'tilde-diacritica',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'Quiero ___ azúcar en mi café.',
    options: ['más', 'mas'],
    correctIndex: 0,
    explanation:
      '"Más" con tilde indica cantidad o suma. "Mas" sin tilde es una conjunción adversativa equivalente a "pero" (uso literario).',
  },
]
