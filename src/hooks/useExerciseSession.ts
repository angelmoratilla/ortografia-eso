import { useState, useCallback, useRef } from 'react'
import type { Exercise, ExerciseResult, SessionResult } from '../types'
import { selectExercisesProgressive } from '../utils'

interface UseExerciseSessionOptions {
  exercises: Exercise[]
  moduleId: string
  onComplete: (session: SessionResult) => void
}

export const useExerciseSession = ({
  exercises,
  moduleId,
  onComplete,
}: UseExerciseSessionOptions) => {
  const [queue] = useState<Exercise[]>(() => selectExercisesProgressive(exercises))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<ExerciseResult[]>([])
  const [answered, setAnswered] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const currentExercise = queue[currentIndex]
  const isLastExercise = currentIndex === queue.length - 1
  const isFinished = currentIndex >= queue.length

  const checkAnswer = useCallback(
    (answerIndex: number) => {
      if (answered) return

      let correct = false
      const ex = currentExercise

      if (ex.type === 'multiple-choice' || ex.type === 'fill-blank') {
        correct = answerIndex === ex.correctIndex
      } else if (ex.type === 'correct-error' || ex.type === 'classify') {
        // 0 = correcto, 1 = incorrecto (convenio de estos tipos)
        correct = answerIndex === 0
      }

      const timeMs = Date.now() - startTimeRef.current
      setSelectedAnswer(answerIndex)
      setAnswered(true)

      // Extraer texto representativo del ejercicio para el resumen
      const question =
        ex.type === 'multiple-choice' ? ex.question
        : ex.type === 'fill-blank' ? ex.sentence.replace('___', '___')
        : ex.type === 'correct-error' ? ex.sentence
        : ex.instruction  // classify

      setResults((prev) => [
        ...prev,
        {
          exerciseId: ex.id,
          question,
          correct,
          selectedAnswer: answerIndex,
          timeMs,
        },
      ])
    },
    [answered, currentExercise],
  )

  const nextExercise = useCallback(() => {
    if (isLastExercise) {
      const allResults = results
      const xpEarned = allResults.filter((r) => r.correct).length * 10 +
        allResults.filter((r) => !r.correct).length * 2

      onComplete({
        moduleId: moduleId as SessionResult['moduleId'],
        results: allResults,
        xpEarned,
        completedAt: new Date().toISOString(),
      })
    } else {
      setCurrentIndex((i) => i + 1)
      setAnswered(false)
      setSelectedAnswer(null)
      startTimeRef.current = Date.now()
    }
  }, [isLastExercise, results, moduleId, onComplete])

  const score = {
    correct: results.filter((r) => r.correct).length,
    total: results.length,
    percent:
      results.length > 0
        ? Math.round((results.filter((r) => r.correct).length / results.length) * 100)
        : 0,
  }

  return {
    currentExercise,
    currentIndex,
    total: queue.length,
    answered,
    selectedAnswer,
    isLastExercise,
    isFinished,
    score,
    checkAnswer,
    nextExercise,
  }
}
