import React, { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getModuleById } from '../data/modules'
import { getExercisesForModule } from '../data/exercises'
import { useProgressStore } from '../stores/progressStore'
import { useExerciseSession } from '../hooks/useExerciseSession'
import { FeedbackBanner } from '../components/ui/FeedbackBanner'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Button } from '../components/ui/Button'
import { MultipleChoiceCard } from '../components/exercises/MultipleChoiceCard'
import { FillBlankCard } from '../components/exercises/FillBlankCard'
import { CorrectErrorCard } from '../components/exercises/CorrectErrorCard'
import { ClassifyCard } from '../components/exercises/ClassifyCard'
import type { ModuleId, SessionResult, Exercise } from '../types'

export const ExercisePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { saveSession } = useProgressStore()

  const module = getModuleById(moduleId ?? '')
  const exercises = getExercisesForModule((moduleId ?? '') as ModuleId)

  const handleComplete = useCallback(
    (session: SessionResult) => {
      saveSession(session)
      navigate(`/modulo/${moduleId}/resultado`, { state: { session } })
    },
    [saveSession, navigate, moduleId],
  )

  const {
    currentExercise,
    currentIndex,
    total,
    answered,
    selectedAnswer,
    isLastExercise,
    checkAnswer,
    nextExercise,
    score,
  } = useExerciseSession({
    exercises,
    moduleId: moduleId ?? '',
    onComplete: handleComplete,
  })

  if (!module || !currentExercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No hay ejercicios disponibles</p>
      </div>
    )
  }

  const progressPct = Math.round((currentIndex / total) * 100)

  const handleCorrectError = (correct: boolean) => {
    checkAnswer(correct ? 0 : 1)
  }

  const handleClassify = (correct: boolean) => {
    checkAnswer(correct ? 0 : 1)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Barra superior */}
      <div className={`bg-gradient-to-r ${module.color} px-4 pt-10 pb-4`}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white text-sm cursor-pointer"
            >
              ✕ Salir
            </button>
            <span className="text-white font-semibold text-sm">
              {currentIndex + 1} / {total}
            </span>
            <span className="text-white/80 text-sm">
              ✅ {score.correct}
            </span>
          </div>
          <ProgressBar value={progressPct} color="bg-white/80" height="sm" />
        </div>
      </div>

      {/* Contenido del ejercicio */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex-1"
          >
            {/* Tipo de ejercicio */}
            <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-3">
              {currentExercise.type === 'multiple-choice' && '🔤 Elige la respuesta correcta'}
              {currentExercise.type === 'fill-blank' && '✏️ Completa el hueco'}
              {currentExercise.type === 'correct-error' && '🔍 Corrige el error'}
              {currentExercise.type === 'classify' && '📂 Clasifica las palabras'}
            </p>

            {/* Renderizado según tipo */}
            {currentExercise.type === 'multiple-choice' && (
              <MultipleChoiceCard
                exercise={currentExercise}
                selectedIndex={selectedAnswer}
                onAnswer={checkAnswer}
              />
            )}
            {currentExercise.type === 'fill-blank' && (
              <FillBlankCard
                exercise={currentExercise}
                selectedIndex={selectedAnswer}
                onAnswer={checkAnswer}
              />
            )}
            {currentExercise.type === 'correct-error' && (
              <CorrectErrorCard
                exercise={currentExercise}
                answered={answered}
                onAnswer={handleCorrectError}
              />
            )}
            {currentExercise.type === 'classify' && (
              <ClassifyCard
                exercise={currentExercise}
                answered={answered}
                onAnswer={handleClassify}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        {answered && (
          <FeedbackBanner
            correct={
              currentExercise.type === 'correct-error' || currentExercise.type === 'classify'
                ? selectedAnswer === 0
                : selectedAnswer === (currentExercise as Extract<Exercise, { correctIndex: number }>).correctIndex
            }
            explanation={currentExercise.explanation}
            visible={answered}
          />
        )}

        {/* Botón siguiente */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button fullWidth size="lg" onClick={nextExercise}>
              {isLastExercise ? '🏁 Ver resultados' : 'Siguiente →'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
