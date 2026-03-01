import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgressStore } from '../stores/progressStore'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Button } from '../components/ui/Button'
import { MODULES } from '../data/modules'
import { levelProgress, moduleProgressPercent } from '../utils'

const BADGES = [
  { id: 'first-exercise', icon: '🌟', name: 'Primera práctica' },
  { id: 'perfect-score', icon: '💯', name: 'Puntuación perfecta' },
  { id: 'module-complete', icon: '🏅', name: 'Módulo completado' },
  { id: 'streak-3', icon: '🔥', name: 'Racha de 3 días' },
  { id: 'streak-7', icon: '🏆', name: 'Racha de 7 días' },
  { id: 'master', icon: '🎓', name: 'Maestro de la ortografía' },
]

export const ProfilePage: React.FC = () => {
  const { progress, resetProgress } = useProgressStore()
  const lvlPct = levelProgress(progress.totalXP, progress.level)

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-4 pt-12 pb-8 text-white">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="text-white/70 hover:text-white text-sm mb-4 block">← Volver</Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
              🎓
            </div>
            <div>
              <h1 className="text-xl font-extrabold">Mi perfil</h1>
              <p className="text-indigo-200 text-sm">Nivel {progress.level} · {progress.totalXP} XP total</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-sm text-indigo-200 mb-1">
              <span>Nivel {progress.level}</span>
              <span>{lvlPct}% → Nivel {progress.level + 1}</span>
            </div>
            <ProgressBar value={lvlPct} color="bg-white/80" height="md" />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm"
          >
            <p className="text-2xl font-extrabold text-orange-500">🔥 {progress.streak}</p>
            <p className="text-xs text-slate-500 mt-1">Días seguidos</p>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm"
          >
            <p className="text-2xl font-extrabold text-indigo-600">{progress.totalXP}</p>
            <p className="text-xs text-slate-500 mt-1">XP total</p>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm"
          >
            <p className="text-2xl font-extrabold text-purple-600">
              {progress.unlockedBadges.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Insignias</p>
          </motion.div>
        </div>

        {/* Insignias */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-700">🏅 Insignias</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            {BADGES.map((badge) => {
              const unlocked = progress.unlockedBadges.includes(badge.id as never)
              return (
                <motion.div
                  key={badge.id}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border ${
                    unlocked
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'bg-slate-50 border-slate-200 opacity-40'
                  }`}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <span className="text-xs text-center text-slate-600 font-medium leading-tight">
                    {badge.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progreso por módulo */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-700">📊 Progreso por módulo</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {MODULES.map((mod) => {
              const mp = progress.modules[mod.id]
              const pct = moduleProgressPercent(mp.completed, mp.total)
              return (
                <div key={mod.id} className="px-4 py-3 flex items-center gap-3">
                  <span className="text-xl">{mod.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{mod.title}</span>
                      <span className="text-slate-400">{mp.completed}/{mp.total}</span>
                    </div>
                    <ProgressBar value={pct} height="sm" color={`bg-gradient-to-r ${mod.color}`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Zona peligrosa */}
        <div className="bg-red-50 rounded-2xl border border-red-100 p-4">
          <p className="text-sm text-red-600 mb-3 font-medium">
            ⚠️ Esto eliminará todo tu progreso de forma permanente.
          </p>
          <Button
            variant="danger"
            fullWidth
            onClick={() => {
              if (window.confirm('¿Seguro que quieres reiniciar todo el progreso?')) {
                resetProgress()
              }
            }}
          >
            🗑️ Reiniciar progreso
          </Button>
        </div>
      </div>
    </div>
  )
}
