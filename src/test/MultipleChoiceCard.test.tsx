import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MultipleChoiceCard } from '../components/exercises/MultipleChoiceCard'
import type { MultipleChoiceExercise } from '../types'

const exercise: MultipleChoiceExercise = {
  id: 'test-mc-001',
  type: 'multiple-choice',
  moduleId: 'b-v',
  difficulty: 'facil',
  explanation: 'Barco se escribe con B porque va antes de consonante.',
  question: '¿Cuál de estas palabras se escribe con B?',
  options: ['Vaca', 'Barco', 'Vivir'],
  correctIndex: 1,
}

describe('MultipleChoiceCard', () => {
  it('muestra la pregunta', () => {
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={null} onAnswer={vi.fn()} />)
    expect(screen.getByText(exercise.question)).toBeInTheDocument()
  })

  it('muestra todas las opciones', () => {
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={null} onAnswer={vi.fn()} />)
    exercise.options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument()
    })
  })

  it('muestra los badges A, B, C', () => {
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={null} onAnswer={vi.fn()} />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('llama a onAnswer con el índice correcto al pulsar una opción', () => {
    const onAnswer = vi.fn()
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={null} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('Barco'))
    expect(onAnswer).toHaveBeenCalledWith(1)
  })

  it('llama a onAnswer con el índice incorrecto al pulsar una opción incorrecta', () => {
    const onAnswer = vi.fn()
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={null} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('Vaca'))
    expect(onAnswer).toHaveBeenCalledWith(0)
  })

  it('no vuelve a llamar a onAnswer si ya hay respuesta seleccionada', () => {
    const onAnswer = vi.fn()
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={1} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('Vaca'))
    expect(onAnswer).not.toHaveBeenCalled()
  })

  it('no permite responder tras haber respondido', () => {
    const onAnswer = vi.fn()
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={0} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('Barco'))
    expect(onAnswer).not.toHaveBeenCalled()
  })

  it('aplica clases de correcto a la opción correcta tras responder', () => {
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={2} onAnswer={vi.fn()} />)
    const correctButton = screen.getByText('Barco').closest('button')
    expect(correctButton?.className).toMatch(/green/)
  })

  it('aplica clases de error a la opción incorrecta seleccionada', () => {
    render(<MultipleChoiceCard exercise={exercise} selectedIndex={2} onAnswer={vi.fn()} />)
    const wrongButton = screen.getByText('Vivir').closest('button')
    expect(wrongButton?.className).toMatch(/red/)
  })
})
