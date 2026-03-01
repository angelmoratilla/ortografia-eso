import type { Exercise } from '../../types'

export const GJ_EXERCISES: Exercise[] = [
  {
    id: 'gj-001',
    moduleId: 'g-j',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál de estas palabras está bien escrita?',
    options: ['jitarra', 'guitarra', 'gittara'],
    correctIndex: 1,
    explanation:
      'Se escribe GU ante E e I para mantener el sonido /g/: guitarra, guerra, guión. La U no suena.',
  },
  {
    id: 'gj-002',
    moduleId: 'g-j',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué palabra está bien escrita?',
    options: ['girafo', 'jirafa', 'girafa'],
    correctIndex: 1,
    explanation:
      '"Jirafa" se escribe con J. Cuando el sonido /x/ va ante A, O, U o en final de sílaba se escribe J: jarra, joya, reloj.',
  },
  {
    id: 'gj-003',
    moduleId: 'g-j',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'La ___ de mi colegio tiene muchos libros.',
    options: ['viblioteca', 'biblioteca'],
    correctIndex: 1,
    explanation:
      '"Biblioteca" se escribe con B y con T. La B va antes de consonante (bl) y la T forma el grupo -teca.',
  },
  {
    id: 'gj-004',
    moduleId: 'g-j',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'En clase de gimnasia tenemos que ___ mucho.',
    options: ['ejercitarnos', 'ejerçitarnos'],
    correctIndex: 0,
    explanation:
      '"Ejercitar" se escribe con J. El sonido /x/ ante E se puede escribir con G o con J; "ejercitar" lleva J.',
  },
  {
    id: 'gj-005',
    moduleId: 'g-j',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál es la forma correcta del verbo "coger"?',
    options: ['yo cojo', 'yo cogo', 'yo coxo'],
    correctIndex: 0,
    explanation:
      'Los verbos terminados en -ger y -gir cambian la G por J ante A y O para mantener el sonido: coger → cojo, coja; elegir → elijo.',
  },
  {
    id: 'gj-006',
    moduleId: 'g-j',
    type: 'classify',
    difficulty: 'facil',
    instruction: 'Clasifica estas palabras según se escriban con G o con J',
    words: [
      { word: 'gente', correctCategory: 'G' },
      { word: 'jabón', correctCategory: 'J' },
      { word: 'girar', correctCategory: 'G' },
      { word: 'caja', correctCategory: 'J' },
      { word: 'general', correctCategory: 'G' },
      { word: 'viaje', correctCategory: 'J' },
    ],
    categories: ['G', 'J'],
    explanation:
      '"Gente", "girar" y "general" llevan G (sonido /x/ ante E, I en palabras de origen latino/griego). "Jabón", "caja" y "viaje" llevan J.',
  },
  {
    id: 'gj-007',
    moduleId: 'g-j',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'El conserje del edificio recojió el paquete.',
    correctSentence: 'El conserje del edificio recogió el paquete.',
    errorWord: 'recojió',
    correctWord: 'recogió',
    explanation:
      '"Recoger" se escribe con G excepto ante A y O: recojo, recoja. Ante IO, IÓ mantiene la G: recogió, recogieron.',
  },
  {
    id: 'gj-008',
    moduleId: 'g-j',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'El ___ de biología explicó la fotosíntesis.',
    options: ['profesor', 'progesor'],
    correctIndex: 0,
    explanation:
      '"Profesor" lleva S, no G. Ojo con las confusiones de G/J ante E: "profesor" no tiene ese sonido.',
  },
  {
    id: 'gj-009',
    moduleId: 'g-j',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál de estas palabras usa correctamente la G?',
    options: ['tejido', 'regir', 'jesto'],
    correctIndex: 1,
    explanation:
      '"Regir" se escribe con G porque los verbos terminados en -gir se escriben con G: regir, dirigir, elegir, exigir.',
  },
  {
    id: 'gj-010',
    moduleId: 'g-j',
    type: 'correct-error',
    difficulty: 'dificil',
    sentence: 'La agencia de viajes me sugirió un destino exótico.',
    correctSentence: 'La agencia de viajes me sugirió un destino exótico.',
    errorWord: 'sugirió',
    correctWord: 'sugirió',
    explanation:
      '"Sugerir" es un verbo en -erir que mantiene la G en todas sus formas. Esta oración ya es correcta: ¡cuidado con las trampas!',
  },
  {
    id: 'gj-011',
    moduleId: 'g-j',
    type: 'classify',
    difficulty: 'medio',
    instruction: 'Clasifica estas palabras en G o J',
    words: [
      { word: 'ángel', correctCategory: 'G' },
      { word: 'reloj', correctCategory: 'J' },
      { word: 'mágico', correctCategory: 'G' },
      { word: 'cajón', correctCategory: 'J' },
      { word: 'urgente', correctCategory: 'G' },
      { word: 'tejado', correctCategory: 'J' },
    ],
    categories: ['G', 'J'],
    explanation:
      '"Ángel", "mágico" y "urgente" llevan G. "Reloj", "cajón" y "tejado" llevan J.',
  },
  {
    id: 'gj-012',
    moduleId: 'g-j',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'El ___ de la orquesta saludó al público.',
    options: ['director', 'dirjector'],
    correctIndex: 0,
    explanation:
      '"Director" viene del verbo "dirigir" (con G), pero el sustantivo se escribe con C: director. No se escribe con J.',
  },
]
