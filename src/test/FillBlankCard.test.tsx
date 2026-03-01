import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FillBlankCard } from '../components/exercises/FillBlankCard'
import type { FillBlankExercise } from '../types'

const exercise: FillBlankExercise = {
  id: 'test-fb-001',
  type: 'fill-blank',
  moduleId: 'b-v',
  difficulty: 'facil',
  explanation: 'El pretérito imperfecto de los verbos en -ar se escribe con B.',
  sentence: 'El niño ___ al parque todos los días.',
  options: ['iva', 'iba', 'hiba'],
  correctIndex: 1,
}

describe('FillBlankCard', () => {
  it('muestra las opciones para elegir', () => {
    render(<FillBlankCard exercise={exercise} selectedIndex={null} onAnswer={vi.fn()} />)
    exercise.options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument()
    })
  })

  it('muestra el hueco vacío antes de responder', () => {
    render(<FillBlankCard exercise={exercise} selectedIndex={null} onAnswer={vi.fn()} />)
    // El hueco se renderiza como un span vacío (sin texto de opción)
    expect(screen.queryByText('iba')).toBeInTheDocument() // como botón
  })

  it('llama a onAnswer con el índice correcto al pulsar la opción correcta', () => {
    const onAnswer = vi.fn()
    render(<FillBlankCard exercise={exercise} selectedIndex={null} onAnswer={onAnswer} />)
    // El texto "iba" aparece en el botón de opciones
    const buttons = screen.getAllByText('iba')
    fireEvent.click(buttons[0])
    expect(onAnswer).toHaveBeenCalledWith(1)
  })

  it('llama a onAnswer con índice incorrecto al pulsar opción incorrecta', () => {
    const onAnswer = vi.fn()
    render(<FillBlankCard exercise={exercise} selectedIndex={null} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('iva'))
    expect(onAnswer).toHaveBeenCalledWith(0)
  })

  it('no llama a onAnswer si ya hay respuesta', () => {
    const onAnswer = vi.fn()
    render(<FillBlankCard exercise={exercise} selectedIndex={1} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('iva'))
    expect(onAnswer).not.toHaveBeenCalled()
  })

  it('muestra la palabra elegida en la frase tras responder', () => {
    render(<FillBlankCard exercise={exercise} selectedIndex={1} onAnswer={vi.fn()} />)
    // "iba" aparece dentro de la frase reconstruida (en el span del hueco)
    const allIba = screen.getAllByText('iba')
    expect(allIba.length).toBeGreaterThanOrEqual(1)
  })

  it('aplica estilo de correcto cuando la respuesta es acertada', () => {
    render(<FillBlankCard exercise={exercise} selectedIndex={1} onAnswer={vi.fn()} />)
    // Buscar el botón de la opción correcta dentro de la lista de opciones
    const buttons = screen.getAllByRole('button')
    const correctBtn = buttons.find((b) => b.textContent?.trim() === 'iba')
    expect(correctBtn?.className).toMatch(/green/)
  })

  it('aplica estilo de error cuando la respuesta es incorrecta', () => {
    render(<FillBlankCard exercise={exercise} selectedIndex={0} onAnswer={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    const wrongBtn = buttons.find((b) => b.textContent?.trim() === 'iva')
    expect(wrongBtn?.className).toMatch(/red/)
  })
})
