# README_IA — Contexto técnico completo para retomar el proyecto

> **Este archivo es para uso exclusivo del asistente de IA.**  
> Contiene el estado exacto del código, convenciones, restricciones conocidas y deuda técnica para retomar el proyecto en cualquier momento sin perder contexto.

---

## 1. Identidad del proyecto

- **Nombre:** OrtografíaESO  
- **Repo GitHub:** `https://github.com/angelmoratilla/ortografia-eso` (rama `main`)  
- **Ruta local:** `/home/angel/almacen/trabajo/git/angel/experimentos/ortografia`  
- **Propósito:** PWA móvil para practicar ortografía española nivel 2.º ESO  
- **Runtime:** Node.js v24.14.0 vía NVM — siempre cargar con:
  ```bash
  export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"
  ```
- **Dev server:** `npx vite --port 5173`  
- **Build:** `npm run build` → genera `dist/`

---

## 2. Stack y versiones exactas

| Paquete | Versión | Notas críticas |
|---|---|---|
| react | 19.2.0 | — |
| typescript | 5.9.3 | — |
| vite | 7.3.1 | config importa de `vitest/config`, NO de `vite` |
| tailwindcss | 4.2.1 | **v4: clases deben ser literales completos, nunca interpoladas** |
| @tailwindcss/vite | 4.2.1 | plugin para Vite, reemplaza el postcss clásico |
| zustand | 5.0.11 | con `persist` middleware, clave localStorage: `ortografia-eso-progress` |
| react-router-dom | 7.13.1 | BrowserRouter, 5 rutas |
| framer-motion | 12.34.3 | Solo en Button, FeedbackBanner, CorrectErrorCard, páginas. NO en cards de ejercicio (conflicto de tipos) |
| vite-plugin-pwa | 1.2.0 | genera sw.js + manifest.webmanifest |
| vitest | 4.0.18 | 47 tests, 5 suites |
| @testing-library/react | 16.3.2 | entorno jsdom |

---

## 3. Restricción crítica — Tailwind v4

En Tailwind v4 las clases se extraen mediante **escaneo estático** del código fuente. Si una clase se construye dinámicamente (`'border-' + color`, template literals, objetos con claves computadas), **no se genera en el CSS** y el estilo no se aplica.

**Patrón correcto** (usado en `MultipleChoiceCard`, `FillBlankCard`):
```typescript
// ✅ Bien: strings literales completos
const getOptionStyle = (idx: number) => {
  if (!answered) return 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
  if (idx === exercise.correctIndex) return 'border-green-400 bg-green-50 text-green-800'
  if (idx === selectedIndex) return 'border-red-400 bg-red-50 text-red-800'
  return 'border-slate-200 bg-white text-slate-400'
}

// ❌ Mal: interpolación dinámica (no funciona en v4)
const style = `border-${color}-400 bg-${color}-50`
```

---

## 4. Convenciones de código

### IDs de ejercicios
Formato: `<módulo>-<número>`. Ejemplos: `bv-001`, `h-008`, `lly-003`, `gj-012`.

### Tipos de ejercicio y cómo se evalúan en `useExerciseSession`

| Tipo | Cómo llama `checkAnswer` | Cómo se evalúa |
|---|---|---|
| `multiple-choice` | `checkAnswer(índiceElegido)` | `answerIndex === ex.correctIndex` |
| `fill-blank` | `checkAnswer(índiceElegido)` | `answerIndex === ex.correctIndex` |
| `correct-error` | `handleCorrectError(bool)` → `checkAnswer(0 o 1)` | `answerIndex === 0` significa correcto |
| `classify` | `handleClassify(bool)` → `checkAnswer(0 o 1)` | `answerIndex === 0` significa correcto |

**Convención 0/1:** para `correct-error` y `classify`, el componente llama a `onAnswer(true/false)` y `ExercisePage` lo convierte a `checkAnswer(correct ? 0 : 1)`. El hook evalúa `answerIndex === 0` como acierto.

### Difficulty
Los valores válidos son: `'facil' | 'medio' | 'dificil'` (en español, con tildes). **No** usar `'easy'`, `'medium'`, `'hard'`.

### Campo `question` en `ExerciseResult`
Se extrae así en `useExerciseSession.ts`:
```typescript
const question =
  ex.type === 'multiple-choice' ? ex.question
  : ex.type === 'fill-blank'    ? ex.sentence
  : ex.type === 'correct-error' ? ex.sentence
  : ex.instruction  // classify
```

---

## 5. Tipos TypeScript completos (`src/types/index.ts`)

```typescript
export type ModuleId = 'b-v' | 'h' | 'll-y' | 'g-j' | 'tilde-diacritica' | 'tilde-general' | 'puntuacion' | 'mayusculas'
export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'correct-error' | 'classify'
export type Difficulty = 'facil' | 'medio' | 'dificil'

export interface BaseExercise {
  id: string; moduleId: ModuleId; type: ExerciseType
  difficulty: Difficulty; explanation: string
}
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice'; question: string; options: string[]; correctIndex: number
}
export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank'; sentence: string; options: string[]; correctIndex: number
  // sentence usa ___ como separador del hueco
}
export interface CorrectErrorExercise extends BaseExercise {
  type: 'correct-error'; sentence: string; correctSentence: string
  errorWord: string; correctWord: string
}
export interface ClassifyExercise extends BaseExercise {
  type: 'classify'; instruction: string
  words: { word: string; correctCategory: string }[]
  categories: string[]
}
export type Exercise = MultipleChoiceExercise | FillBlankExercise | CorrectErrorExercise | ClassifyExercise

export interface ExerciseResult {
  exerciseId: string; question: string; correct: boolean
  selectedAnswer: string | number; timeMs: number
}
export interface SessionResult {
  moduleId: ModuleId; results: ExerciseResult[]; xpEarned: number; completedAt: string
}
export interface UserProgress {
  totalXP: number; level: number; streak: number; lastPlayedDate?: string
  modules: Record<ModuleId, ModuleProgress>; unlockedBadges: BadgeId[]
}
export interface ModuleProgress {
  moduleId: ModuleId; completed: number; total: number
  sessions: number   // tandas completadas; se inicializa a 0 y se incrementa en saveSession
  xp: number; lastPlayed?: string; badges: BadgeId[]
}
export type BadgeId = 'first-exercise' | 'module-complete' | 'perfect-score' | 'streak-3' | 'streak-7' | 'master'
```

---

## 6. Rutas de la aplicación (`src/App.tsx`)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `HomePage` | Lista de módulos con progreso |
| `/modulo/:moduleId` | `ModulePage` | Descripción, reglas y botón de inicio |
| `/modulo/:moduleId/ejercicios` | `ExercisePage` | Motor de ejercicios |
| `/modulo/:moduleId/resultado` | `ResultPage` | Resultado + confeti. Recibe `{ session }` via `location.state` |
| `/perfil` | `ProfilePage` | XP, nivel, racha, insignias, reset |

---

## 7. Estado global — `useProgressStore` (`src/stores/progressStore.ts`)

- Persiste en `localStorage` con la clave `'ortografia-eso-progress'`
- Para **resetear en desarrollo**: abrir DevTools → Application → Local Storage → borrar la clave

### API del store
```typescript
const { progress, saveSession, resetProgress, getModuleProgress } = useProgressStore()
```

### Lógica de XP y nivel
```typescript
const XP_PER_CORRECT = 10
const XP_PER_WRONG   = 2
const xpToLevel = (xp: number) => Math.floor(1 + Math.sqrt(xp / 50))
```

### Lógica de racha
- Si `lastPlayedDate === hoy` → racha sin cambios
- Si `lastPlayedDate === ayer` → `streak + 1`
- Cualquier otro caso → `streak = 1`

### Insignias y sus condiciones
```typescript
if (prev.totalXP === 0 && xpEarned > 0)                               addBadge('first-exercise')
if (correctCount === session.results.length && results.length >= 5)    addBadge('perfect-score')
if (newSessions >= SESSIONS_GOAL)                                      addBadge('module-complete')  // SESSIONS_GOAL = 5
if (newStreak >= 3)                                                    addBadge('streak-3')
if (newStreak >= 7)                                                    addBadge('streak-7')
// 'master' se concede manualmente (no está implementado aún — deuda técnica)
```

### Progreso por tandas (`sessions`)
- `SESSIONS_GOAL = 5` exportado desde `data/modules.ts`
- Cada llamada a `saveSession` incrementa `moduleProgress.sessions` en 1
- La UI muestra `X/5 tandas` y la barra llega al 100 % en la tanda 5
- Superada la meta, el módulo aparece como "✅ Dominado"; se puede seguir practicando sin límite
- **Compatibilidad con localStorage antiguo:** todas las sumas usan `?? 0` para tolerar datos guardados antes de añadir el campo `sessions` (`(moduleProgress.sessions ?? 0) + 1`)

---

## 8. Hook `useExerciseSession` (`src/hooks/useExerciseSession.ts`)

Gestiona la cola de ejercicios de una sesión completa.

```typescript
const {
  currentExercise,  // Exercise actual
  currentIndex,     // 0-based
  total,            // siempre 10 (o menos si hay menos ejercicios en el módulo)
  answered,         // boolean — ya respondió el ejercicio actual
  selectedAnswer,   // number | null — índice elegido
  isLastExercise,   // boolean
  isFinished,       // boolean — ya terminó todos
  score,            // { correct, total, percent }
  checkAnswer,      // (answerIndex: number) => void
  nextExercise,     // () => void — avanza o llama a onComplete
} = useExerciseSession({ exercises, moduleId, onComplete })
```

- Usa `selectExercisesProgressive(exercises)` en lugar de `shuffle().slice(0,10)` para garantizar dificultad creciente
- `checkAnswer` es idempotente: ignora llamadas si `answered === true`
- `nextExercise` en el último ejercicio llama a `onComplete(SessionResult)` en lugar de avanzar

### `selectExercisesProgressive` (`src/utils/index.ts`)
```typescript
selectExercisesProgressive(exercises: Exercise[], batchSize = 10): Exercise[]
```
Selecciona `batchSize` ejercicios con distribución progresiva:
- 40 % fácil (4), 30 % medio (3), 30 % difícil (3)
- Dentro de cada grupo el orden es aleatorio (Fisher-Yates)
- Si un nivel tiene menos ejercicios de los necesarios, los huecos se rellenan con sobrantes de otros niveles manteniendo el orden fácil → medio → difícil

---

## 9. Datos de ejercicios

### Registro central (`src/data/exercises/index.ts`)
```typescript
export const EXERCISES_BY_MODULE: Record<string, Exercise[]> = {
  'b-v': BV_EXERCISES,         // ~74 ejercicios  (bv-001 → bv-074)
  'h': H_EXERCISES,            // ~59 ejercicios  (h-001  → h-059)
  'll-y': LLY_EXERCISES,       // ~60 ejercicios  (lly-001 → lly-060)
  'g-j': GJ_EXERCISES,         // ~60 ejercicios  (gj-001  → gj-060)
  'tilde-diacritica': ...,     // ~52 ejercicios  (td-001  → td-052)
  'tilde-general': ...,        // ~62 ejercicios  (tg-001  → tg-062)
  'puntuacion': ...,           // ~59 ejercicios  (pun-001 → pun-059)
  'mayusculas': ...,           // ~60 ejercicios  (may-001 → may-060)
}
// Total: >430 ejercicios
```

### Distribución por tipo de ejercicio
| Tipo | Total aproximado |
|---|---|
| `multiple-choice` | ~130 |
| `fill-blank` | ~110 |
| `correct-error` | ~87 |
| `classify` | ~103 |

### Distribución por dificultad
Todos los módulos tienen ejercicios en los tres niveles: `'facil'`, `'medio'` y `'dificil'`.

### `modules.ts` — `totalExercises` es dinámico
```typescript
const count = (id: string) => (EXERCISES_BY_MODULE[id] ?? []).length
// Cada módulo usa: totalExercises: count('b-v')
```
Esto evita que el número mostrado en pantalla quede desincronizado si se añaden ejercicios.

### Para añadir un ejercicio
Editar el archivo `.ts` correspondiente y añadir un objeto con la estructura de `Exercise`. El contador se actualiza solo. ID siguiendo el patrón `<modulo>-<NNN>`.

**Próximos IDs libres:**
- B/V: `bv-075`, H: `h-060`, LL/Y: `lly-061`, G/J: `gj-061`
- Tilde general: `tg-063`, Tilde diacrítica: `td-053`
- Puntuación: `pun-060`, Mayúsculas: `may-061`

### Para añadir un módulo nuevo
1. Añadir el literal en `ModuleId` en `types/index.ts`
2. Crear `src/data/exercises/<nombre>.ts` exportando un array `Exercise[]`
3. Importar y registrar en `EXERCISES_BY_MODULE` en `exercises/index.ts`
4. Añadir entrada en `MODULES` en `modules.ts` (el `totalExercises` usará `count()` automáticamente)

---

## 10. Componentes de ejercicio

### `MultipleChoiceCard`
- Props: `exercise`, `selectedIndex: number | null`, `onAnswer: (index) => void`
- Muestra A/B/C. Llama `onAnswer(idx)` al pulsar. Se bloquea si `selectedIndex !== null`.
- Colores feedback mediante `getOptionStyle(idx)` — strings literales completos (Tailwind v4)

### `FillBlankCard`
- Props: `exercise`, `selectedIndex: number | null`, `onAnswer: (index) => void`
- Divide `sentence` por `___`. El hueco se rellena con la opción elegida.
- Mismo patrón de colores con `getOptionStyle(idx)`

### `CorrectErrorCard`
- Props: `exercise`, `answered: boolean`, `onAnswer: (correct: boolean) => void`
- Resalta `exercise.errorWord` con `decoration-wavy text-red-600` mediante regex
- Dos botones: "❌ No sé corregirla" → `onAnswer(false)`, "✅ Sé la corrección" → `onAnswer(true)`
- Al responder (`answered=true`) muestra `correctSentence` en panel verde

### `ClassifyCard`
- Props: `exercise`, `answered: boolean`, `onAnswer: (correct: boolean) => void`
- Estado interno: `placements: Record<word, category>`, `draggedWord: string | null`, `submitted: boolean`
- UX táctil: tap palabra → selecciona (azul) → tap categoría → coloca; tap palabra colocada → la devuelve
- También soporta drag & drop (desktop)
- Botón "Comprobar" activo solo cuando `unplaced.length === 0`
- Tras comprobar: verde/rojo por palabra, las incorrectas muestran `→ categoríaCorrecta`

### `FeedbackBanner`
- Props: `correct: boolean`, `explanation: string`, `visible: boolean`
- Animación spring con framer-motion. Verde si correcto, rojo si no.

### `Button`
- Props: `variant: 'primary'|'secondary'|'success'|'danger'|'ghost'`, `size: 'sm'|'md'|'lg'`, `fullWidth`, más attrs de `<button>`
- Usa `motion.button` con `whileTap` y `whileHover`
- Clases por variante y tamaño definidas como objetos de lookup (compatibles con Tailwind v4)

---

## 11. Confeti en `ResultPage`

Implementado con canvas puro (sin librerías), hook `useConfetti(active: boolean)`:
- Se activa solo cuando `percent >= 70`
- Canvas `fixed inset-0 pointer-events-none z-50` para no bloquear UI
- 120 partículas iniciales + ráfagas cada 3 frames durante 60 frames
- Física: gravedad `+0.07 vy/frame`, resistencia `vx *= 0.99`, fade desde 70% altura
- Colores: `['#6366f1','#a855f7','#ec4899','#f59e0b','#10b981','#3b82f6','#f97316','#14b8a6']`

---

## 12. Iconos PWA

Generados con el script `scripts/gen-icons.mjs` (solo Node nativo, sin dependencias):

```bash
npm run gen-icons
```

Archivos en `public/`:
- `pwa-192x192.png` — 192×192, degradado indigo→purple, letra Ó blanca, esquinas redondeadas
- `pwa-512x512.png` — 512×512, misma estética
- `apple-touch-icon.png` — 180×180
- `favicon.ico` — 16×16 ICO
- `masked-icon.svg` — SVG para iconos adaptables Android (fondo sólido requerido)

Manifiesto en `vite.config.ts` usa `purpose: 'any'` para los PNG y `purpose: 'maskable'` para el SVG.

---

## 13. Tests

**Suite completa: 52 tests en 5 archivos, todos en `src/test/`**

```bash
npx vitest run --reporter=verbose
```

| Archivo | Tests |
|---|---|
| `utils.test.ts` | 16 — shuffle, moduleProgressPercent, levelProgress, scoreColor, **selectExercisesProgressive (5 tests nuevos)** |
| `MultipleChoiceCard.test.tsx` | 9 — render, callbacks, bloqueo, estilos green/red |
| `FillBlankCard.test.tsx` | 8 — opciones, inserción, callbacks, estilos |
| `CorrectErrorCard.test.tsx` | 8 — resaltado error, botones, frase correcta |
| `ClassifyCard.test.tsx` | 11 — selección, colocar, quitar, submit, onAnswer(true/false) |

El entorno de test es **jsdom** (configurado en `vite.config.ts → test.environment`).  
Setup en `src/test/setup.ts`: solo importa `@testing-library/jest-dom`.

---

## 14. CI/CD

### `.github/workflows/ci.yml`
- Trigger: push a `main` o `develop`, PR a `main`
- Pasos: `npm ci` → lint → `npx vitest run` → `npm run build` → upload artefact
- Node 20 en CI (el proyecto usa Node 24 en local, son compatibles)

### `.github/workflows/deploy.yml`
- Trigger: push a `main`
- Despliega a Netlify (o plataforma configurada)
- Para Netlify con CI: añadir secrets `NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID`

---

## 15. Deuda técnica y mejoras pendientes

### Bugs conocidos (ninguno en este momento)
- No hay bugs conocidos en la versión actual.

### Mejoras pendientes identificadas

| Mejora | Dificultad | Descripción |
|---|---|---|
| Insignia `master` | Baja | En `progressStore`, añadir lógica que otorgue `master` cuando `unlockedBadges` contiene las otras 5 |
| Más ejercicios | Baja | >430 ejercicios ya. Próximos IDs libres: bv-075, h-060, lly-061, gj-061, tg-063, td-053, pun-060, may-061 |
| Módulos adicionales | Media | Puntuación avanzada, oraciones subordinadas, verbos irregulares… seguir el proceso del paso 9 |
| Filtrado por dificultad | Media | Permitir al alumno seleccionar solo ejercicios fáciles/medios/difíciles desde `ModulePage` |
| Animación de entrada en móvil | Baja | Las tarjetas de ejercicio ya tienen `AnimatePresence` pero podrían añadir gestos de swipe |
| Sonidos de feedback | Media | Web Audio API para pitido correcto/incorrecto sin dependencias |
| Estadísticas por módulo | Media | En `ProfilePage`, mostrar gráfica de aciertos históricos por módulo |
| Sincronización en la nube | Alta | Reemplazar localStorage por Supabase/Firebase para persistir entre dispositivos |
| Modo multijugador / retos | Alta | Compartir reto por link, comparar puntuaciones |
| Accesibilidad mejorada | Media | Añadir `aria-live` en FeedbackBanner, roles en ClassifyCard |

### Notas de arquitectura para futuras mejoras
- **Añadir un tipo de ejercicio nuevo:** crear componente en `components/exercises/`, añadir el tipo en `ExerciseType` en `types/index.ts`, manejar el tipo en `useExerciseSession.ts` y en `ExercisePage.tsx` (render + handler)
- **Cambiar el sistema de persistencia:** solo hay que cambiar el middleware en `progressStore.ts` (Zustand admite cualquier storage con la interfaz `{ getItem, setItem, removeItem }`)
- **Internacionalización:** el contenido está completamente en español hardcodeado en los archivos de datos; extraer los strings a un objeto `i18n` si se necesita multiidioma

---

## 16. Comandos de referencia rápida

```bash
# Entorno
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"

# Desarrollo
npm run dev                  # servidor HMR en :5173

# Verificación
npx tsc --noEmit             # typecheck sin emitir
npx vitest run               # tests una pasada
npx vitest run --reporter=verbose  # tests con detalle

# Producción
npm run build                # → dist/
npx vite preview --host --port 4173  # preview en red local

# Utilidades
npm run gen-icons            # regenerar PNGs/ICO en public/

# Git
git add . && git commit -m "..." && git push origin main
```

---

## 17. Historial de decisiones técnicas importantes

| Decisión | Motivo |
|---|---|
| Tailwind v4 en lugar de v3 | Proyecto creado con Vite 7 que lo usa por defecto; implica la restricción de clases estáticas |
| Canvas puro para confeti | Evitar dependencias extra (canvas-confetti pesa ~10 kB, el custom pesa ~0) |
| Canvas puro para iconos PWA | No hay `canvas` ni `sharp` instalados en el sistema; el script usa solo módulos nativos de Node |
| Zustand con persist en localStorage | Sin backend — el progreso debe sobrevivir recargas sin necesitar cuenta de usuario |
| `vitest/config` en lugar de `vite/config` | Vite 7 + Vitest 4 requieren importar `defineConfig` desde `vitest/config` para que las opciones de `test` sean reconocidas |
| Framer Motion eliminado de cards de ejercicio | Conflictos de tipos con React 19 en `motion.button`; se usa directamente `<button>` con transiciones CSS |
| Progreso por tandas en lugar de ejercicios | El banco (~60-74 por módulo) nunca se "agota" — contar tandas (meta: 5) da un objetivo claro y alcanzable |
| `?? 0` en sumas del store | Protege contra `undefined` en campos nuevos cuando el localStorage viene de versiones anteriores del esquema |
| `selectExercisesProgressive` en lugar de `shuffle().slice()` | Garantiza que cada tanda empiece con ejercicios fáciles y termine con difíciles, mejorando la curva de aprendizaje |
| Convención 0=correcto para correct-error y classify | Homogeneíza la lógica de `checkAnswer` — el hook solo necesita comparar con 0 en lugar de manejar booleanos |
