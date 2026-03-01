import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number   // 0-100
  color?: string  // Tailwind gradient class
  height?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
}

const heightClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'bg-indigo-500',
  height = 'md',
  showLabel = false,
  label,
}) => {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-xs text-slate-500">
          <span>{label ?? 'Progreso'}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <motion.div
          className={`${color} ${heightClasses[height]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
