import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CorrectErrorCard } from '../components/exercises/CorrectErrorCard'
import type { CorrectErrorExercise } from '../types'

const exercise: CorrectErrorExercise = {
  id: 'test-ce-001',
  type: 'correct-error',
  moduleId: 'h',
  difficulty: 'facil',
  explanation: '"Había" lleva h porque es una forma del verbo haber.',
  sentence: 'Abia mucha gente en el mercado.',
  correctSentence: 'Había mucha gente en el mercado.',
  errorWord: 'Abia',
  correctWord: 'Había',
}

describe('CorrectErrorCard', () => {
  it('muestra la instrucción de corregir', () => {
    render(<CorrectErrorCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    expect(screen.getByText(/Encuentra y corrige el error/i)).toBeInTheDocument()
  })

  it('muestra la frase con el error resaltado', () => {
    render(<CorrectErrorCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    expect(screen.getByText('Abia')).toBeInTheDocument()
  })

  it('muestra los dos botones de respuesta', () => {
    render(<CorrectErrorCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    expect(screen.getByText(/No sé corregirla/i)).toBeInTheDocument()
    expect(screen.getByText(/Sé la corrección/i)).toBeInTheDocument()
  })

  it('llama a onAnswer(true) al pulsar "Sé la corrección"', () => {
    const onAnswer = vi.fn()
    render(<CorrectErrorCard exercise={exercise} answered={false} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText(/Sé la corrección/i))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('llama a onAnswer(false) al pulsar "No sé corregirla"', () => {
    const onAnswer = vi.fn()
    render(<CorrectErrorCard exercise={exercise} answered={false} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText(/No sé corregirla/i))
    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('oculta los botones cuando ya se ha respondido', () => {
    render(<CorrectErrorCard exercise={exercise} answered={true} onAnswer={vi.fn()} />)
    expect(screen.queryByText(/No sé corregirla/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Sé la corrección/i)).not.toBeInTheDocument()
  })

  it('muestra la frase correcta tras responder', () => {
    render(<CorrectErrorCard exercise={exercise} answered={true} onAnswer={vi.fn()} />)
    expect(screen.getByText(exercise.correctSentence)).toBeInTheDocument()
  })

  it('muestra la etiqueta de forma correcta', () => {
    render(<CorrectErrorCard exercise={exercise} answered={true} onAnswer={vi.fn()} />)
    expect(screen.getByText(/Forma correcta/i)).toBeInTheDocument()
  })
})
