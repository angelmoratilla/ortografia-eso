import React from 'react'
import type { FillBlankExercise } from '../../types'

interface Props {
  exercise: FillBlankExercise
  selectedIndex: number | null
  onAnswer: (index: number) => void
}

// Parte la frase en dos mitades usando ___ como separador
const splitSentence = (sentence: string): [string, string] => {
  const parts = sentence.split('___')
  return [parts[0] ?? '', parts[1] ?? '']
}

export const FillBlankCard: React.FC<Props> = ({
  exercise,
  selectedIndex,
  onAnswer,
}) => {
  const answered = selectedIndex !== null
  const [before, after] = splitSentence(exercise.sentence)

  const filledWord =
    selectedIndex !== null ? exercise.options[selectedIndex] : null

  const getFilledWordStyle = () => {
    if (!filledWord) return ''
    if (selectedIndex === exercise.correctIndex) return 'text-green-700 bg-green-100'
    return 'text-red-700 bg-red-100'
  }

  const getOptionStyle = (idx: number) => {
    if (!answered) {
      return 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
    }
    if (idx === exercise.correctIndex) {
      return 'border-green-400 bg-green-50 text-green-800 cursor-default'
    }
    if (idx === selectedIndex) {
      return 'border-red-400 bg-red-50 text-red-800 cursor-default'
    }
    return 'border-slate-200 bg-white text-slate-400 cursor-default'
  }

  return (
    <div className="space-y-5">
      {/* Frase con hueco */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <p className="text-lg text-slate-700 leading-relaxed">
          {before}
          {filledWord ? (
            <span className={`font-bold px-1 rounded ${getFilledWordStyle()}`}>
              {filledWord}
            </span>
          ) : (
            <span className="inline-block w-20 border-b-2 border-indigo-400 mx-1 align-bottom" />
          )}
          {after}
        </p>
      </div>

      {/* Opciones */}
      <div className="flex flex-col gap-3">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !answered && onAnswer(idx)}
            className={`w-full p-3.5 rounded-2xl border-2 font-semibold text-base transition-all duration-200 ${getOptionStyle(idx)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
