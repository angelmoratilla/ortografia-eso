import type { Exercise } from '../../types'

export const TILDE_GENERAL_EXERCISES: Exercise[] = [
  {
    id: 'tg-001',
    moduleId: 'tilde-general',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Qué tipo de palabra es "canción"?',
    options: ['Llana', 'Aguda', 'Esdrújula'],
    correctIndex: 1,
    explanation:
      '"Canción" es aguda (la sílaba tónica es la última: can-CIÓN) y termina en N, por eso lleva tilde. Regla: las agudas llevan tilde cuando terminan en vocal, N o S.',
  },
  {
    id: 'tg-002',
    moduleId: 'tilde-general',
    type: 'multiple-choice',
    difficulty: 'facil',
    question: '¿Cuál de estas palabras es esdrújula?',
    options: ['árbol', 'música', 'cantar'],
    correctIndex: 1,
    explanation:
      '"Música" es esdrújula (la sílaba tónica es la antepenúltima: MÚ-si-ca). Todas las esdrújulas llevan tilde siempre.',
  },
  {
    id: 'tg-003',
    moduleId: 'tilde-general',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'El ___ de matemáticas es muy difícil.',
    options: ['examen', 'exámen'],
    correctIndex: 0,
    explanation:
      '"Examen" es una palabra llana (ex-A-men) que termina en N. Las llanas que terminan en N o S NO llevan tilde.',
  },
  {
    id: 'tg-004',
    moduleId: 'tilde-general',
    type: 'fill-blank',
    difficulty: 'facil',
    sentence: 'Mi ___ favorito es el fútbol.',
    options: ['deporte', 'depórte'],
    correctIndex: 0,
    explanation:
      '"Deporte" es llana (de-POR-te) y termina en vocal E. Las llanas que terminan en vocal NO llevan tilde.',
  },
  {
    id: 'tg-005',
    moduleId: 'tilde-general',
    type: 'classify',
    difficulty: 'facil',
    instruction: 'Clasifica estas palabras según su tipo de acento',
    words: [
      { word: 'café', correctCategory: 'Aguda' },
      { word: 'mesa', correctCategory: 'Llana' },
      { word: 'pájaro', correctCategory: 'Esdrújula' },
      { word: 'reloj', correctCategory: 'Aguda' },
      { word: 'fácil', correctCategory: 'Llana' },
      { word: 'médico', correctCategory: 'Esdrújula' },
    ],
    categories: ['Aguda', 'Llana', 'Esdrújula'],
    explanation:
      'Agudas: café (ca-FÉ), reloj (re-LOJ). Llanas: mesa (ME-sa), fácil (FÁ-cil). Esdrújulas: pájaro (PÁ-ja-ro), médico (MÉ-di-co).',
  },
  {
    id: 'tg-006',
    moduleId: 'tilde-general',
    type: 'multiple-choice',
    difficulty: 'medio',
    question: '¿Cuál de estas palabras lleva tilde?',
    options: ['imagen', 'camion', 'jardín'],
    correctIndex: 2,
    explanation:
      '"Jardín" es aguda (jar-DÍN) y termina en N, por lo que lleva tilde. "Imagen" es llana que termina en N (no lleva tilde). "Camion" está mal: lo correcto es "camión" (aguda + N = tilde).',
  },
  {
    id: 'tg-007',
    moduleId: 'tilde-general',
    type: 'correct-error',
    difficulty: 'medio',
    sentence: 'El arbitro pitó falta al final del partido.',
    correctSentence: 'El árbitro pitó falta al final del partido.',
    errorWord: 'arbitro',
    correctWord: 'árbitro',
    explanation:
      '"Árbitro" es esdrújula (ÁR-bi-tro). Todas las esdrújulas llevan tilde obligatoriamente.',
  },
  {
    id: 'tg-008',
    moduleId: 'tilde-general',
    type: 'fill-blank',
    difficulty: 'medio',
    sentence: 'Necesito comprar un ___ nuevo para el colegio.',
    options: ['bolígrafo', 'boligrafo'],
    correctIndex: 0,
    explanation:
      '"Bolígrafo" es esdrújula (bo-LÍ-gra-fo) y todas las esdrújulas llevan tilde. La sílaba tónica es la antepenúltima.',
  },
  {
    id: 'tg-009',
    moduleId: 'tilde-general',
    type: 'classify',
    difficulty: 'medio',
    instruction: 'Indica si estas palabras llevan tilde o no',
    words: [
      { word: 'música', correctCategory: 'Lleva tilde' },
      { word: 'ciudad', correctCategory: 'Sin tilde' },
      { word: 'árbol', correctCategory: 'Lleva tilde' },
      { word: 'camino', correctCategory: 'Sin tilde' },
      { word: 'autobús', correctCategory: 'Lleva tilde' },
      { word: 'comen', correctCategory: 'Sin tilde' },
    ],
    categories: ['Lleva tilde', 'Sin tilde'],
    explanation:
      'Llevan tilde: "música" (esdrújula), "árbol" (llana que termina en L), "autobús" (aguda que termina en S). Sin tilde: "ciudad" (aguda que termina en D), "camino" (llana en vocal), "comen" (llana en N).',
  },
  {
    id: 'tg-010',
    moduleId: 'tilde-general',
    type: 'multiple-choice',
    difficulty: 'dificil',
    question: '¿Cuál de estas palabras lleva tilde correctamente puesta?',
    options: ['exámen', 'examen', 'examén'],
    correctIndex: 1,
    explanation:
      '"Examen" es llana (ex-A-men) y termina en N. Las palabras llanas que terminan en N o S NO llevan tilde. "Exámen" y "examén" son incorrectas.',
  },
  {
    id: 'tg-011',
    moduleId: 'tilde-general',
    type: 'correct-error',
    difficulty: 'dificil',
    sentence: 'Los jovenes de hoy usan mucho el móvil.',
    correctSentence: 'Los jóvenes de hoy usan mucho el móvil.',
    errorWord: 'jovenes',
    correctWord: 'jóvenes',
    explanation:
      '"Jóvenes" es esdrújula (JÓ-ve-nes) y todas las esdrújulas llevan tilde. Es un error muy frecuente olvidar la tilde en esta palabra.',
  },
  {
    id: 'tg-012',
    moduleId: 'tilde-general',
    type: 'fill-blank',
    difficulty: 'dificil',
    sentence: 'El ___ de la película me pareció increíble.',
    options: ['climax', 'clímax'],
    correctIndex: 1,
    explanation:
      '"Clímax" es llana (CLÍ-max) y termina en X, que cuenta como consonante que no es N ni S. Por eso las llanas acabadas en X llevan tilde.',
  },
]
