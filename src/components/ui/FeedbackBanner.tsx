import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeedbackBannerProps {
  correct: boolean
  explanation: string
  visible: boolean
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  correct,
  explanation,
  visible,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`rounded-2xl p-4 border-2 ${
            correct
              ? 'bg-green-50 border-green-300 text-green-800'
              : 'bg-red-50 border-red-300 text-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">{correct ? '✅' : '❌'}</span>
            <div>
              <p className="font-bold text-base mb-1">
                {correct ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-sm leading-relaxed">{explanation}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
