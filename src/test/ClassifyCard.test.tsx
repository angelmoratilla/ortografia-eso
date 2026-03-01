import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ClassifyCard } from '../components/exercises/ClassifyCard'
import type { ClassifyExercise } from '../types'

const exercise: ClassifyExercise = {
  id: 'test-cl-001',
  type: 'classify',
  moduleId: 'b-v',
  difficulty: 'medio',
  explanation: 'Las palabras con prefijo bi- se escriben con B; los adjetivos en -ivo con V.',
  instruction: 'Clasifica estas palabras según si se escriben con B o con V',
  categories: ['B', 'V'],
  words: [
    { word: 'bicicleta', correctCategory: 'B' },
    { word: 'bisabuelo', correctCategory: 'B' },
    { word: 'activo', correctCategory: 'V' },
    { word: 'nuevo', correctCategory: 'V' },
  ],
}

describe('ClassifyCard', () => {
  it('muestra la instrucción', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    expect(screen.getByText(exercise.instruction)).toBeInTheDocument()
  })

  it('muestra todas las palabras por clasificar', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    exercise.words.forEach((w) => {
      expect(screen.getByText(w.word)).toBeInTheDocument()
    })
  })

  it('muestra las categorías', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    exercise.categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument()
    })
  })

  it('el botón comprobar está deshabilitado al inicio', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    const btn = screen.getByRole('button', { name: /Faltan/i })
    expect(btn).toBeDisabled()
  })

  it('al tocar una palabra la marca como seleccionada', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    fireEvent.click(screen.getByText('bicicleta'))
    expect(screen.getByText('Toca una categoría para colocar «bicicleta»')).toBeInTheDocument()
  })

  it('al tocar una palabra dos veces la deselecciona', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    fireEvent.click(screen.getByText('bicicleta'))
    fireEvent.click(screen.getByText('bicicleta'))
    expect(screen.queryByText(/Toca una categoría/)).not.toBeInTheDocument()
  })

  it('coloca la palabra en la categoría al tocar la categoría', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    // Seleccionar palabra
    fireEvent.click(screen.getByText('bicicleta'))
    // Tocar la categoría B (encabezado del panel)
    const categoryPanels = screen.getAllByText('B')
    fireEvent.click(categoryPanels[0])
    // La palabra ya no debe estar en "por clasificar"
    expect(screen.queryByText('Palabras por clasificar:')).toBeInTheDocument()
    // La pista de selección desaparece
    expect(screen.queryByText(/Toca una categoría/)).not.toBeInTheDocument()
  })

  it('permite quitar una palabra de su categoría tocándola', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    // Colocar bicicleta en B
    fireEvent.click(screen.getByText('bicicleta'))
    fireEvent.click(screen.getAllByText('B')[0])
    // Ahora bicicleta está en la categoría; tocamos para quitarla
    fireEvent.click(screen.getByText('bicicleta'))
    // Vuelve a aparecer en las palabras por clasificar
    expect(screen.queryByText(/Toca una categoría/)).not.toBeInTheDocument()
  })

  it('habilita el botón comprobar cuando todas las palabras están colocadas', () => {
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={vi.fn()} />)
    const placeWord = (word: string, cat: string) => {
      fireEvent.click(screen.getByText(word))
      fireEvent.click(screen.getAllByText(cat)[0])
    }
    placeWord('bicicleta', 'B')
    placeWord('bisabuelo', 'B')
    placeWord('activo', 'V')
    placeWord('nuevo', 'V')
    const btn = screen.getByRole('button', { name: /Comprobar/i })
    expect(btn).not.toBeDisabled()
  })

  it('llama a onAnswer(true) cuando todas las respuestas son correctas', () => {
    const onAnswer = vi.fn()
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={onAnswer} />)
    const placeWord = (word: string, cat: string) => {
      fireEvent.click(screen.getByText(word))
      fireEvent.click(screen.getAllByText(cat)[0])
    }
    placeWord('bicicleta', 'B')
    placeWord('bisabuelo', 'B')
    placeWord('activo', 'V')
    placeWord('nuevo', 'V')
    fireEvent.click(screen.getByRole('button', { name: /Comprobar/i }))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('llama a onAnswer(false) cuando alguna respuesta es incorrecta', () => {
    const onAnswer = vi.fn()
    render(<ClassifyCard exercise={exercise} answered={false} onAnswer={onAnswer} />)
    const placeWord = (word: string, cat: string) => {
      fireEvent.click(screen.getByText(word))
      fireEvent.click(screen.getAllByText(cat)[0])
    }
    // Poner bicicleta en V (incorrecto)
    placeWord('bicicleta', 'V')
    placeWord('bisabuelo', 'B')
    placeWord('activo', 'V')
    placeWord('nuevo', 'B') // incorrecto
    fireEvent.click(screen.getByRole('button', { name: /Comprobar/i }))
    expect(onAnswer).toHaveBeenCalledWith(false)
  })
})
