import { cn } from '../../utils/cn'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--q-bg)]'
    const variants = {
      primary: 'bg-[#0F969C] text-[#05161A] hover:bg-[#6DA5C0] focus:ring-[#0F969C]',
      secondary: 'border border-[#1A3A42] bg-transparent text-[#E8F4F5] hover:border-[#0F969C]/50 hover:bg-[#0A1F24]',
      ghost: 'bg-transparent text-[#8BA8B0] hover:text-[#E8F4F5] hover:bg-[#0A1F24]',
      danger: 'border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/10',
      success: 'border border-[#10B981]/40 text-[#10B981] hover:bg-[#10B981]/10',
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
