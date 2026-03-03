import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress, ModuleId, SessionResult, BadgeId } from '../types'
import { MODULES, SESSIONS_GOAL } from '../data/modules'

// ──────────────────────────────────────────────
// Estado inicial
// ──────────────────────────────────────────────

const buildInitialModules = (): UserProgress['modules'] => {
  const modules = {} as UserProgress['modules']
  for (const mod of MODULES) {
    modules[mod.id] = {
      moduleId: mod.id,
      completed: 0,
      total: mod.totalExercises,
      sessions: 0,
      xp: 0,
      badges: [],
    }
  }
  return modules
}

const INITIAL_PROGRESS: UserProgress = {
  totalXP: 0,
  level: 1,
  streak: 0,
  lastPlayedDate: undefined,
  modules: buildInitialModules(),
  unlockedBadges: [],
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

const XP_PER_CORRECT = 10
const XP_PER_WRONG = 2

const xpToLevel = (xp: number): number => Math.floor(1 + Math.sqrt(xp / 50))

const todayStr = () => new Date().toISOString().split('T')[0]

const isYesterday = (dateStr: string): boolean => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0] === dateStr
}

// ──────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────

interface ProgressStore {
  progress: UserProgress
  saveSession: (session: SessionResult) => void
  resetProgress: () => void
  getModuleProgress: (moduleId: ModuleId) => UserProgress['modules'][ModuleId]
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: INITIAL_PROGRESS,

      saveSession: (session: SessionResult) => {
        set((state) => {
          const prev = state.progress
          const today = todayStr()

          // Calcular XP ganado
          const correctCount = session.results.filter((r) => r.correct).length
          const wrongCount = session.results.length - correctCount
          const xpEarned =
            correctCount * XP_PER_CORRECT + wrongCount * XP_PER_WRONG

          // Actualizar racha
          let newStreak = prev.streak
          if (prev.lastPlayedDate === today) {
            // ya jugó hoy, racha sin cambios
          } else if (prev.lastPlayedDate && isYesterday(prev.lastPlayedDate)) {
            newStreak = prev.streak + 1
          } else {
            newStreak = 1
          }

          // Actualizar módulo
          const moduleProgress = prev.modules[session.moduleId]
          const newCompleted = Math.min(
            moduleProgress.completed + session.results.length,
            moduleProgress.total,
          )
          const newSessions = moduleProgress.sessions + 1

          // Insignias nuevas
          const newBadges: BadgeId[] = [...prev.unlockedBadges]
          const addBadge = (id: BadgeId) => {
            if (!newBadges.includes(id)) newBadges.push(id)
          }

          if (prev.totalXP === 0 && xpEarned > 0) addBadge('first-exercise')
          if (correctCount === session.results.length && session.results.length >= 5) addBadge('perfect-score')
          if (newSessions >= SESSIONS_GOAL) addBadge('module-complete')
          if (newStreak >= 3) addBadge('streak-3')
          if (newStreak >= 7) addBadge('streak-7')

          const newTotalXP = prev.totalXP + xpEarned
          const newLevel = xpToLevel(newTotalXP)

          return {
            progress: {
              ...prev,
              totalXP: newTotalXP,
              level: newLevel,
              streak: newStreak,
              lastPlayedDate: today,
              unlockedBadges: newBadges,
              modules: {
                ...prev.modules,
                [session.moduleId]: {
                  ...moduleProgress,
                  completed: newCompleted,
                  sessions: newSessions,
                  xp: moduleProgress.xp + xpEarned,
                  lastPlayed: today,
                },
              },
            },
          }
        })
      },

      resetProgress: () =>
        set({ progress: { ...INITIAL_PROGRESS, modules: buildInitialModules() } }),

      getModuleProgress: (moduleId: ModuleId) =>
        get().progress.modules[moduleId],
    }),
    {
      name: 'ortografia-eso-progress', // clave en localStorage
    },
  ),
)
