import { cn } from '../../utils/cn'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F7F9F6]'
    const variants = {
      primary: 'bg-[#2F3A36] text-white hover:bg-[#1F2824] focus:ring-[#2F3A36]/30',
      secondary: 'border border-[#E2E8E2] bg-white text-[#2F3A36] hover:border-[#2F3A36]/30 hover:bg-[#F3F6F3]',
      ghost: 'bg-transparent text-[#7D897F] hover:text-[#2F3A36] hover:bg-white/60',
      danger: 'border border-[#C45C5C]/30 text-[#C45C5C] hover:bg-[#C45C5C]/08',
      success: 'border border-[#3D9B6E]/30 text-[#3D9B6E] hover:bg-[#3D9B6E]/08',
    }
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
