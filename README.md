# OrtografíaESO 📚

Aplicación web progresiva (PWA) para practicar ortografía española al nivel de **2.º de la ESO**. Diseñada para ser totalmente utilizable desde un dispositivo móvil, funciona sin conexión una vez instalada y guarda el progreso localmente en el dispositivo.

---

## Índice

1. [Características](#características)
2. [Módulos de contenido](#módulos-de-contenido)
3. [Tipos de ejercicio](#tipos-de-ejercicio)
4. [Sistema de gamificación](#sistema-de-gamificación)
5. [Arquitectura](#arquitectura)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Stack tecnológico](#stack-tecnológico)
8. [Desarrollo local](#desarrollo-local)
9. [Tests](#tests)
10. [Despliegue](#despliegue)
11. [Instalación como app móvil](#instalación-como-app-móvil)

---

## Características

- 📱 **Mobile-first** — interfaz optimizada para pantallas pequeñas con gestos táctiles
- ✈️ **Offline** — funciona sin conexión a internet tras la primera visita
- 💾 **Progreso persistente** — guardado automático en `localStorage`, sin registro ni cuenta
- 🎮 **Gamificación** — XP, niveles, rachas diarias e insignias
- 🎉 **Confeti** — animación de celebración al superar el 70% de aciertos
- ♿ **Accesible** — contraste adecuado, áreas de toque generosas, feedback inmediato

---

## Módulos de contenido

| Módulo | Descripción | Ejercicios |
|---|---|---|
| **B y V** | Uso correcto de b y v en palabras y verbos | 10 |
| **La H** | Palabras con h inicial, intercalada y dígrafos | 8 |
| **LL e Y** | Distinción entre ll e y en escritura | 12 |
| **G y J** | Uso de g y j ante e, i y en distintas posiciones | 12 |
| **Tilde diacrítica** | él/el, tú/tu, mí/mi, sé/se, más/mas… | 9 |
| **La tilde** | Agudas, llanas, esdrújulas y sobresdrújulas | 12 |
| **Puntuación** | Coma, punto y coma, dos puntos, puntos suspensivos | 12 |
| **Mayúsculas** | Cuándo y cómo usar las letras mayúsculas | 12 |

El número de ejercicios se calcula automáticamente desde los datos reales — no hay valores hardcodeados.

---

## Tipos de ejercicio

### 1. Opción múltiple (`multiple-choice`)
Se muestra una pregunta y tres opciones (A/B/C). Al responder, las opciones se colorean en verde (correcta) y rojo (elegida incorrecta). No se puede cambiar la respuesta.

### 2. Rellena el hueco (`fill-blank`)
Una frase con un hueco `___` y tres palabras para elegir. Al seleccionar, la palabra se inserta en la frase con color de feedback.

### 3. Corrige el error (`correct-error`)
Se muestra una frase con una palabra errónea subrayada en rojo ondulado. El alumno decide si sabe corregirla (✅) o no (❌). Tras responder se muestra la frase correcta.

### 4. Clasifica palabras (`classify`)
Un conjunto de palabras que hay que arrastrar (o tocar en móvil) a las categorías correctas. Se habilita el botón "Comprobar" cuando todas están colocadas. Tras comprobar, cada palabra muestra verde/rojo y, si es incorrecta, a qué categoría pertenecía realmente.

---

## Sistema de gamificación

### XP y niveles
- **+10 XP** por respuesta correcta
- **+2 XP** por respuesta incorrecta (se premia el intento)
- Fórmula de nivel: `nivel = floor(1 + √(XP / 50))`

### Rachas
Se incrementa 1 punto por cada día consecutivo que se practica. Si se salta un día, la racha vuelve a 1.

### Insignias

| Insignia | Condición |
|---|---|
| 🥇 Primer ejercicio | Completar cualquier ejercicio por primera vez |
| ⭐ Puntuación perfecta | 10/10 en una sesión |
| 🏅 Módulo completado | Terminar todos los ejercicios de un módulo |
| 🔥 Racha de 3 días | Practicar 3 días seguidos |
| 🔥🔥 Racha de 7 días | Practicar 7 días seguidos |
| 👑 Maestro | Desbloquear todas las demás insignias |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                        Páginas                          │
│  HomePage  ModulePage  ExercisePage  ResultPage  ProfilePage │
└────────────────────────┬────────────────────────────────┘
                         │ usa
┌────────────────────────▼────────────────────────────────┐
│                     Componentes                         │
│  MultipleChoiceCard  FillBlankCard                      │
│  CorrectErrorCard    ClassifyCard                       │
│  Button  ProgressBar  FeedbackBanner                    │
└────────────────────────┬────────────────────────────────┘
                         │ usa
┌────────────────────────▼────────────────────────────────┐
│                  Hooks / Estado                         │
│  useExerciseSession (lógica de sesión)                  │
│  useProgressStore   (Zustand + localStorage)            │
└────────────────────────┬────────────────────────────────┘
                         │ lee
┌────────────────────────▼────────────────────────────────┐
│                      Datos                              │
│  data/modules.ts        — definición de los 8 módulos   │
│  data/exercises/*.ts    — ejercicios por módulo         │
│  data/exercises/index.ts — registro central             │
└─────────────────────────────────────────────────────────┘
```

### Flujo de una sesión de ejercicios

1. El usuario entra en un módulo → `ModulePage` muestra descripción y reglas
2. Pulsa "Empezar" → `ExercisePage` carga los ejercicios del módulo
3. `useExerciseSession` baraja los ejercicios y selecciona los primeros 10
4. Por cada ejercicio: se renderiza el componente correspondiente → el usuario responde → `checkAnswer()` evalúa y registra el resultado con timestamp
5. Al terminar el último ejercicio, `onComplete()` calcula el XP y navega a `ResultPage`
6. `ResultPage` muestra el porcentaje, detalle por pregunta, XP ganado y confeti si ≥70%
7. `saveSession()` persiste el progreso en Zustand/localStorage

---

## Estructura del proyecto

```
ortografia/
├── public/                        # Activos estáticos (iconos PWA)
│   ├── favicon.ico
│   ├── apple-touch-icon.png       # Icono iOS 180×180
│   ├── pwa-192x192.png            # Icono Android
│   ├── pwa-512x512.png            # Icono splash
│   └── masked-icon.svg            # Icono adaptable Android
│
├── scripts/
│   └── gen-icons.mjs              # Genera los PNGs con Node nativo (npm run gen-icons)
│
├── src/
│   ├── types/
│   │   └── index.ts               # Todos los tipos TypeScript
│   │
│   ├── data/
│   │   ├── modules.ts             # Definición de los 8 módulos
│   │   └── exercises/
│   │       ├── index.ts           # Registro central + helpers
│   │       ├── bv.ts              # 10 ejercicios B/V
│   │       ├── h.ts               # 8 ejercicios H
│   │       ├── ll-y.ts            # 12 ejercicios LL/Y
│   │       ├── g-j.ts             # 12 ejercicios G/J
│   │       ├── tilde-diacritica.ts # 9 ejercicios tilde diacrítica
│   │       ├── tilde-general.ts   # 12 ejercicios tilde general
│   │       ├── puntuacion.ts      # 12 ejercicios puntuación
│   │       └── mayusculas.ts      # 12 ejercicios mayúsculas
│   │
│   ├── stores/
│   │   └── progressStore.ts       # Zustand store persistido en localStorage
│   │
│   ├── hooks/
│   │   └── useExerciseSession.ts  # Lógica de sesión: cola, puntuación, navegación
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── FeedbackBanner.tsx
│   │   └── exercises/
│   │       ├── MultipleChoiceCard.tsx
│   │       ├── FillBlankCard.tsx
│   │       ├── CorrectErrorCard.tsx
│   │       └── ClassifyCard.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx           # Lista de módulos con progreso
│   │   ├── ModulePage.tsx         # Detalle del módulo y reglas
│   │   ├── ExercisePage.tsx       # Motor de ejercicios
│   │   ├── ResultPage.tsx         # Resultados + confeti
│   │   └── ProfilePage.tsx        # XP, nivel, racha, insignias
│   │
│   ├── utils/
│   │   └── index.ts               # shuffle, scoreColor, levelProgress…
│   │
│   └── test/
│       ├── setup.ts
│       ├── utils.test.ts
│       ├── MultipleChoiceCard.test.tsx
│       ├── FillBlankCard.test.tsx
│       ├── CorrectErrorCard.test.tsx
│       └── ClassifyCard.test.tsx
│
├── .github/workflows/
│   ├── ci.yml                     # CI: lint + test + build en cada push
│   └── deploy.yml                 # Deploy automático a Vercel en main
│
├── vite.config.ts                 # Vite + Tailwind v4 + PWA + Vitest
├── vercel.json                    # Reescritura SPA + caché de assets
└── package.json
```

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7 | Build y dev server |
| Tailwind CSS | 4 (via `@tailwindcss/vite`) | Estilos |
| Zustand | 5 | Estado global + persistencia |
| React Router | 7 | Navegación SPA |
| Framer Motion | 12 | Animaciones |
| vite-plugin-pwa | 1.2 | Service worker + manifiesto |
| Vitest | 4 | Tests unitarios |
| Testing Library | 16 | Tests de componentes |

> **Importante — Tailwind v4:** en esta versión los nombres de clase se escanean estáticamente. Nunca se deben construir mediante interpolación de strings (`'border-' + color`). Todas las clases dinámicas deben ser strings literales completos.

---

## Desarrollo local

### Requisitos

- Node.js ≥ 18 (el proyecto usa Node 24 vía NVM)
- npm ≥ 9

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd ortografia

# Instalar dependencias
npm install
```

### Comandos disponibles

```bash
# Servidor de desarrollo con HMR
npm run dev                  # → http://localhost:5173

# Build de producción
npm run build                # genera dist/

# Vista previa del build
npm run preview              # → http://localhost:4173

# Tests (modo watch)
npm test

# Tests (una sola pasada)
npx vitest run

# Tests con cobertura
npm run coverage

# Regenerar iconos PWA
npm run gen-icons
```

### Añadir ejercicios

1. Abre el archivo correspondiente en `src/data/exercises/` (p. ej. `bv.ts`)
2. Añade un nuevo objeto siguiendo el tipo `Exercise` de `src/types/index.ts`
3. El contador de ejercicios en `modules.ts` se actualiza automáticamente

### Añadir un módulo nuevo

1. Añade el `ModuleId` en `src/types/index.ts`
2. Crea `src/data/exercises/<nombre>.ts` con los ejercicios
3. Registra el módulo en `src/data/exercises/index.ts`
4. Añade la definición del módulo en `src/data/modules.ts`

---

## Tests

```bash
npx vitest run --reporter=verbose
```

**47 tests en 5 suites:**

| Suite | Tests | Qué cubre |
|---|---|---|
| `utils.test.ts` | 11 | `shuffle`, `moduleProgressPercent`, `levelProgress`, `scoreColor` |
| `MultipleChoiceCard.test.tsx` | 9 | Renderizado, callbacks, bloqueo tras respuesta, estilos verde/rojo |
| `FillBlankCard.test.tsx` | 8 | Hueco vacío, inserción de palabra, callbacks, estilos |
| `CorrectErrorCard.test.tsx` | 8 | Resaltado del error, botones, frase correcta tras responder |
| `ClassifyCard.test.tsx` | 11 | Tap-selección, colocar, quitar, habilitar botón, `onAnswer(true/false)` |

---

## Despliegue

### Vercel (recomendado)

El repositorio incluye `vercel.json` con configuración para SPA y caché de assets:

```bash
npm install -g vercel
npm run build
vercel --prod
```

O de forma automática: el workflow `.github/workflows/deploy.yml` despliega a Vercel en cada push a `main`. Requiere los secrets de GitHub:

| Secret | Descripción |
|---|---|
| `VERCEL_TOKEN` | Token de API de Vercel |
| `VERCEL_ORG_ID` | ID de organización de Vercel |
| `VERCEL_PROJECT_ID` | ID del proyecto en Vercel |

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir dist
```

### GitHub Pages

Cambiar el `base` en `vite.config.ts` al nombre del repositorio:

```ts
base: '/nombre-del-repo/',
```

Y desplegar la carpeta `dist/` en la rama `gh-pages`.

### Servidor propio (nginx)

```nginx
server {
    listen 443 ssl;
    root /var/www/ortografia/dist;
    index index.html;

    # SPA: redirigir todo a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché larga para assets con hash
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Instalación como app móvil

La app es una PWA completamente funcional offline tras la primera visita.

### Android (Chrome)

1. Abre la URL de la app en Chrome
2. Aparece un banner automático **"Añadir a pantalla de inicio"**, o usa el menú ⋮ → **"Instalar aplicación"**
3. La app se instala con icono propio y se abre sin barra de navegación

### iOS (Safari)

1. Abre la URL en Safari
2. Pulsa el botón compartir (□↑) → **"Añadir a pantalla de inicio"**
3. Confirma el nombre y pulsa **"Añadir"**

> El service worker (Workbox) precachea todos los assets en la primera visita, lo que permite usar la app completamente sin conexión a partir de entonces.

---

## Licencia

MIT

