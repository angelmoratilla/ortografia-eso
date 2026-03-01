import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-md shadow-indigo-200',
  secondary:
    'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm',
  success:
    'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md shadow-green-200',
  danger:
    'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md shadow-red-200',
  ghost:
    'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-600',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-3 text-base rounded-xl',
  lg: 'px-6 py-4 text-lg rounded-2xl',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const classes = [
    'font-semibold transition-colors duration-150 select-none',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ].join(' ')

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={classes}
      disabled={disabled}
      onClick={props.onClick}
      type={props.type ?? 'button'}
    >
      {children}
    </motion.button>
  )
}
