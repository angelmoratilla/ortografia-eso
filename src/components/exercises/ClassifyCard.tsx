import React, { useState } from 'react'
import type { ClassifyExercise } from '../../types'

interface Props {
  exercise: ClassifyExercise
  answered: boolean
  onAnswer: (correct: boolean) => void
}

type Placement = Record<string, string> // word → category

export const ClassifyCard: React.FC<Props> = ({ exercise, answered, onAnswer }) => {
  const [placements, setPlacements] = useState<Placement>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const unplaced = exercise.words.filter((w) => !(w.word in placements))
  const placed = (cat: string) =>
    exercise.words.filter((w) => placements[w.word] === cat)

  const handleDrop = (category: string) => {
    if (answered || submitted || !draggedWord) return
    setPlacements((prev) => ({ ...prev, [draggedWord]: category }))
    setDraggedWord(null)
  }

  const handleTap = (word: string) => {
    if (answered || submitted) return
    // En móvil: si no hay palabra seleccionada, la selecciona
    // Si ya hay una seleccionada, la mueve de vuelta a sin clasificar
    if (draggedWord === word) {
      setDraggedWord(null)
    } else {
      setDraggedWord(word)
    }
  }

  const handleCategoryTap = (category: string) => {
    if (answered || submitted || !draggedWord) return
    setPlacements((prev) => ({ ...prev, [draggedWord]: category }))
    setDraggedWord(null)
  }

  const handleRemoveFromCategory = (word: string) => {
    if (answered || submitted) return
    setPlacements((prev) => {
      const next = { ...prev }
      delete next[word]
      return next
    })
  }

  const handleSubmit = () => {
    if (submitted) return
    setSubmitted(true)
    const allCorrect = exercise.words.every(
      (w) => placements[w.word] === w.correctCategory,
    )
    onAnswer(allCorrect)
  }

  const getWordResult = (word: string) => {
    if (!submitted) return 'default'
    const correct = exercise.words.find((w) => w.word === word)?.correctCategory
    return placements[word] === correct ? 'correct' : 'wrong'
  }

  const wordStyle = (word: string, context: 'unplaced' | 'placed') => {
    const isDragging = draggedWord === word
    if (context === 'unplaced') {
      if (isDragging) return 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-lg'
      return 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer'
    }
    // placed
    const result = getWordResult(word)
    if (!submitted) {
      if (isDragging) return 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-lg'
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 cursor-pointer'
    }
    if (result === 'correct') return 'bg-green-50 text-green-700 border-green-400'
    return 'bg-red-50 text-red-700 border-red-400'
  }

  const allPlaced = unplaced.length === 0

  return (
    <div className="space-y-4">
      <p className="text-base font-semibold text-slate-700">{exercise.instruction}</p>

      {draggedWord && !submitted && (
        <p className="text-xs text-indigo-600 font-medium text-center animate-pulse">
          Toca una categoría para colocar «{draggedWord}»
        </p>
      )}

      {/* Palabras sin clasificar */}
      {unplaced.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 min-h-14">
          <p className="text-xs text-slate-400 font-medium mb-2">Palabras por clasificar:</p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((w) => (
              <button
                key={w.word}
                onClick={() => handleTap(w.word)}
                className={`px-3 py-1.5 rounded-xl border-2 text-sm font-semibold transition-all duration-150 select-none ${wordStyle(w.word, 'unplaced')}`}
              >
                {w.word}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categorías */}
      <div className="grid grid-cols-2 gap-3">
        {exercise.categories.map((cat) => (
          <div
            key={cat}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(cat)}
            onClick={() => handleCategoryTap(cat)}
            className={`rounded-2xl border-2 p-3 min-h-24 transition-all duration-150 ${
              draggedWord && !submitted
                ? 'border-indigo-300 bg-indigo-50 cursor-pointer'
                : 'border-slate-200 bg-white'
            }`}
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 text-center">
              {cat}
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {placed(cat).map((w) => (
                <button
                  key={w.word}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!submitted) handleRemoveFromCategory(w.word)
                  }}
                  className={`px-2.5 py-1 rounded-lg border-2 text-xs font-semibold transition-all duration-150 select-none ${wordStyle(w.word, 'placed')}`}
                >
                  {w.word}
                  {!submitted && (
                    <span className="ml-1 opacity-50 text-xs">×</span>
                  )}
                  {submitted && getWordResult(w.word) === 'wrong' && (
                    <span className="ml-1 text-xs">
                      → {exercise.words.find((x) => x.word === w.word)?.correctCategory}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón comprobar */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allPlaced}
          className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-150 ${
            allPlaced
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {allPlaced ? '✅ Comprobar' : `Faltan ${unplaced.length} palabra${unplaced.length > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  )
}
