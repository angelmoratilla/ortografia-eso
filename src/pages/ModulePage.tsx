import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getModuleById } from '../data/modules'
import { SESSIONS_GOAL } from '../data/modules'
import { getExercisesForModule } from '../data/exercises'
import { useProgressStore } from '../stores/progressStore'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { moduleProgressPercent } from '../utils'
import type { ModuleId, ModuleProgress } from '../types'

export const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { progress } = useProgressStore()

  const module = getModuleById(moduleId ?? '')
  const exercises = getExercisesForModule((moduleId ?? '') as ModuleId)
  const modProgress: ModuleProgress | null = moduleId
    ? (progress.modules[moduleId as ModuleId] ?? null)
    : null

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Módulo no encontrado</p>
          <Link to="/" className="text-indigo-600 underline mt-2 block">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  const pct = modProgress
    ? moduleProgressPercent(Math.min(modProgress.sessions ?? 0, SESSIONS_GOAL), SESSIONS_GOAL)
    : 0
  const sessions = modProgress?.sessions ?? 0
  const isDone = sessions >= SESSIONS_GOAL

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-br ${module.color} px-4 pt-12 pb-8 text-white`}>
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white mb-4 flex items-center gap-1 text-sm cursor-pointer"
          >
            ← Volver
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{module.icon}</span>
            <div>
              <h1 className="text-2xl font-extrabold">{module.title}</h1>
              <p className="text-white/80 text-sm">{module.description}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-2xl p-3">
            <div className="flex justify-between text-sm mb-1.5">
              <span>Progreso</span>
              <span>
                {isDone
                  ? '✅ Módulo dominado'
                  : `${sessions} de ${SESSIONS_GOAL} tandas completadas`}
              </span>
            </div>
            <ProgressBar value={pct} color="bg-white" height="md" />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 space-y-6">
        {/* Reglas */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-700">📖 Reglas clave</h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {module.rules.map((rule, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-3 text-sm text-slate-600 flex gap-3"
              >
                <span className="text-indigo-400 flex-shrink-0 mt-0.5">•</span>
                {rule}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Estadísticas rápidas */}
        {modProgress && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-3 text-center border border-slate-100 shadow-sm">
              <p className="text-2xl font-extrabold text-indigo-600">{modProgress.xp}</p>
              <p className="text-xs text-slate-500 mt-0.5">XP ganados</p>
            </div>
            <div className="bg-white rounded-2xl p-3 text-center border border-slate-100 shadow-sm">
              <p className="text-2xl font-extrabold text-green-600">{sessions}</p>
              <p className="text-xs text-slate-500 mt-0.5">Tandas hechas</p>
            </div>
            <div className="bg-white rounded-2xl p-3 text-center border border-slate-100 shadow-sm">
              <p className="text-2xl font-extrabold text-purple-600">{pct}%</p>
              <p className="text-xs text-slate-500 mt-0.5">Progreso</p>
            </div>
          </div>
        )}

        {/* Botón de comenzar */}
        <div className="pb-4">
          {exercises.length > 0 ? (
            <Button
              fullWidth
              size="lg"
              onClick={() => navigate(`/modulo/${moduleId}/ejercicios`)}
            >
              🚀 {isDone ? '🔁 Seguir practicando' : sessions > 0 ? 'Continuar practicando' : 'Empezar a practicar'}
            </Button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <p className="text-amber-700 font-semibold">🚧 Ejercicios en desarrollo</p>
              <p className="text-amber-600 text-sm mt-1">Próximamente disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
