import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProgressStore } from '../stores/progressStore'
import { ProgressBar } from '../components/ui/ProgressBar'
import { MODULES } from '../data/modules'
import { levelProgress, moduleProgressPercent } from '../utils'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export const HomePage: React.FC = () => {
  const { progress } = useProgressStore()
  const lvlPct = levelProgress(progress.totalXP, progress.level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-indigo-700">OrtografíaESO</h1>
            <p className="text-xs text-slate-500">2º de la ESO</p>
          </div>
          <Link to="/perfil">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1.5"
            >
              <span className="text-lg">🎓</span>
              <div className="text-right">
                <p className="text-xs font-bold text-indigo-700">Nivel {progress.level}</p>
                <p className="text-xs text-slate-500">{progress.totalXP} XP</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Banner de bienvenida */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-5 text-white shadow-lg shadow-indigo-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="font-bold text-lg">¡Racha de {progress.streak} {progress.streak === 1 ? 'día' : 'días'}!</p>
              <p className="text-indigo-200 text-sm">Sigue practicando cada día</p>
            </div>
          </div>
          <ProgressBar value={lvlPct} color="bg-white/80" height="sm" />
          <p className="text-xs text-indigo-200 mt-1">{lvlPct}% para el nivel {progress.level + 1}</p>
        </motion.div>

        {/* Módulos */}
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-3">📚 Módulos</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-3"
          >
            {MODULES.map((mod) => {
              const modProgress = progress.modules[mod.id]
              const pct = moduleProgressPercent(modProgress.completed, modProgress.total)
              const hasExercises = modProgress.total > 0

              return (
                <motion.div key={mod.id} variants={item}>
                  <Link
                    to={hasExercises ? `/modulo/${mod.id}` : '#'}
                    className={hasExercises ? '' : 'cursor-not-allowed'}
                  >
                    <motion.div
                      whileTap={{ scale: hasExercises ? 0.97 : 1 }}
                      className={`bg-white rounded-2xl p-4 border-2 shadow-sm transition-colors ${
                        hasExercises
                          ? 'border-slate-100 hover:border-indigo-200 hover:shadow-md'
                          : 'border-slate-100 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-2xl flex-shrink-0`}
                        >
                          {mod.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-slate-800">{mod.title}</h3>
                            <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                              {modProgress.completed}/{modProgress.total}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mb-2 line-clamp-1">
                            {mod.description}
                          </p>
                          {hasExercises ? (
                            <ProgressBar value={pct} color="bg-indigo-500" height="sm" />
                          ) : (
                            <p className="text-xs text-amber-600 font-medium">🚧 Próximamente</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
