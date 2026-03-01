import React from 'react'
import type { MultipleChoiceExercise } from '../../types'

interface Props {
  exercise: MultipleChoiceExercise
  selectedIndex: number | null
  onAnswer: (index: number) => void
}

export const MultipleChoiceCard: React.FC<Props> = ({
  exercise,
  selectedIndex,
  onAnswer,
}) => {
  const answered = selectedIndex !== null

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

  const getBadgeStyle = (idx: number) => {
    if (!answered) return 'bg-slate-100 text-slate-500'
    if (idx === exercise.correctIndex) return 'bg-green-500 text-white'
    if (idx === selectedIndex) return 'bg-red-400 text-white'
    return 'bg-slate-100 text-slate-400'
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-slate-700 leading-snug">
        {exercise.question}
      </p>

      <div className="flex flex-col gap-3">
        {exercise.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !answered && onAnswer(idx)}
            className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-base transition-all duration-200 ${getOptionStyle(idx)}`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors duration-200 ${getBadgeStyle(idx)}`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
