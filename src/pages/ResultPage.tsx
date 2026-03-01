import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import type { SessionResult } from '../types'
import { scoreColor } from '../utils'

// ── Confeti canvas ────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number
  vx: number; vy: number
  angle: number; spin: number
  color: string
  w: number; h: number
  opacity: number
}

const COLORS = [
  '#6366f1', '#a855f7', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#f97316', '#14b8a6',
]

function createParticle(canvas: HTMLCanvasElement): Particle {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    w: Math.random() * 10 + 6,
    h: Math.random() * 5 + 3,
    opacity: 1,
  }
}

function useConfetti(active: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: 120 }, () => createParticle(canvas))
    let frame: number
    let elapsed = 0

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      elapsed++

      // Añadir nuevas partículas en ráfagas (primeros 60 frames)
      if (elapsed < 60 && elapsed % 3 === 0) {
        particles.push(...Array.from({ length: 8 }, () => createParticle(canvas)))
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.07          // gravedad
        p.vx *= 0.99          // resistencia
        p.angle += p.spin
        if (p.y > canvas.height * 0.7) p.opacity -= 0.03

        if (p.opacity <= 0) { particles.splice(i, 1); continue }

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (particles.length > 0) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return canvasRef
}
// ─────────────────────────────────────────────────────────────────────────────

export const ResultPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { state } = useLocation()
  const navigate = useNavigate()

  const session: SessionResult | null = state?.session ?? null

  if (!session) {
    navigate('/')
    return null
  }

  const correct = session.results.filter((r) => r.correct).length
  const total = session.results.length
  const percent = Math.round((correct / total) * 100)

  const confettiRef = useConfetti(percent >= 70)

  const emoji =
    percent >= 90 ? '🏆' : percent >= 70 ? '🎉' : percent >= 50 ? '👍' : '💪'

  const message =
    percent >= 90
      ? '¡Excelente trabajo!'
      : percent >= 70
      ? '¡Muy bien!'
      : percent >= 50
      ? 'Vas por buen camino'
      : '¡Sigue practicando!'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-10">
      {/* Canvas de confeti (pointer-events:none para no bloquear clicks) */}
      <canvas
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      <div className="max-w-md w-full space-y-6">
        {/* Resultado principal */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center"
        >
          <span className="text-6xl">{emoji}</span>
          <h1 className="text-2xl font-extrabold text-slate-800 mt-3">{message}</h1>

          <div className={`text-5xl font-extrabold mt-4 ${scoreColor(percent)}`}>
            {percent}%
          </div>
          <p className="text-slate-500 mt-1">
            {correct} de {total} correctas
          </p>

          <div className="mt-5">
            <ProgressBar
              value={percent}
              color={percent >= 70 ? 'bg-green-500' : percent >= 50 ? 'bg-yellow-500' : 'bg-red-400'}
              height="lg"
            />
          </div>

          {/* XP ganados */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 bg-indigo-50 rounded-2xl p-3 border border-indigo-100"
          >
            <p className="text-indigo-700 font-bold text-lg">+{session.xpEarned} XP</p>
            <p className="text-indigo-500 text-sm">Puntos de experiencia ganados</p>
          </motion.div>
        </motion.div>

        {/* Detalle de respuestas */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5">
          <h2 className="font-bold text-slate-700 mb-3">📋 Detalle de respuestas</h2>
          <div className="space-y-2">
            {session.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className={`flex items-start gap-3 p-3 rounded-xl text-sm border ${
                  r.correct
                    ? 'bg-green-50 border-green-100'
                    : 'bg-red-50 border-red-100'
                }`}
              >
                <span className="text-base mt-0.5 flex-shrink-0">
                  {r.correct ? '✅' : '❌'}
                </span>
                <span className={`flex-1 leading-snug ${r.correct ? 'text-green-800' : 'text-red-800'}`}>
                  {r.question}
                </span>
                <span className="text-xs text-slate-400 flex-shrink-0 mt-0.5">
                  {(r.timeMs / 1000).toFixed(1)}s
                </span>
              </motion.div>
            ))}
          </div>

          {/* Mini-resumen de aciertos */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-sm">
            <span className="text-green-700 font-semibold">
              ✅ {session.results.filter((r) => r.correct).length} correctas
            </span>
            <span className="text-red-600 font-semibold">
              ❌ {session.results.filter((r) => !r.correct).length} incorrectas
            </span>
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <Button fullWidth size="lg" onClick={() => navigate(`/modulo/${moduleId}/ejercicios`)}>
            🔁 Volver a practicar
          </Button>
          <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/')}>
            🏠 Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
