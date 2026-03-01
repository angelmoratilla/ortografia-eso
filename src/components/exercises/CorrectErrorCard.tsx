import React from 'react'
import { motion } from 'framer-motion'
import type { CorrectErrorExercise } from '../../types'

interface Props {
  exercise: CorrectErrorExercise
  answered: boolean
  onAnswer: (correct: boolean) => void
}

export const CorrectErrorCard: React.FC<Props> = ({
  exercise,
  answered,
  onAnswer,
}) => {
  // Resalta la palabra errónea en la frase
  const highlightError = (sentence: string, errorWord: string) => {
    const parts = sentence.split(new RegExp(`(${errorWord})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === errorWord.toLowerCase() ? (
        <span key={i} className="underline decoration-red-400 decoration-wavy text-red-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 font-medium">
        📍 Encuentra y corrige el error en esta frase:
      </p>

      {/* Frase con error */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <p className="text-lg text-slate-700 leading-relaxed">
          {answered
            ? exercise.sentence
            : highlightError(exercise.sentence, exercise.errorWord)}
        </p>
      </div>

      {/* Si ya respondió, mostrar la corrección */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 rounded-2xl p-4 border-2 border-green-300"
        >
          <p className="text-sm text-green-700 font-medium mb-1">✅ Forma correcta:</p>
          <p className="text-base text-green-800 font-semibold">
            {exercise.correctSentence}
          </p>
        </motion.div>
      )}

      {/* Botones de respuesta */}
      {!answered && (
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onAnswer(false)}
            className="flex-1 p-4 rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 font-semibold text-base hover:bg-red-100 cursor-pointer"
          >
            ❌ No sé corregirla
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onAnswer(true)}
            className="flex-1 p-4 rounded-2xl border-2 border-green-200 bg-green-50 text-green-700 font-semibold text-base hover:bg-green-100 cursor-pointer"
          >
            ✅ Sé la corrección
          </motion.button>
        </div>
      )}
    </div>
  )
}
