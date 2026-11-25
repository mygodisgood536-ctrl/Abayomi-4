import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { cn } from '../../utils/cn'

export type NavItem = {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  badge?: number
}

type AppShellProps = {
  brandTitle: string
  brandSubtitle: string
  brandAccent?: string // e.g. bg-[#2F3A36] or pastel
  nav: NavItem[]
  children: ReactNode
  footerExtra?: ReactNode
}

export function AppShell({
  brandTitle,
  brandSubtitle,
  brandAccent = 'bg-[#2F3A36]',
  nav,
  children,
  footerExtra,
}: AppShellProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (item: NavItem) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)

  const NavContent = () => (
    <>
      <div className="p-5 border-b border-[#E2E8E2]">
        <div className="flex items-center gap-3">
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold', brandAccent)}>
            {brandTitle.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm tracking-tight truncate text-[#2F3A36]">{brandTitle}</div>
            <div className="text-[10px] text-[#7D897F] truncate">{brandSubtitle}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-[#2F3A36]/8 text-[#2F3A36]'
                  : 'text-[#7D897F] hover:bg-[#F3F6F3] hover:text-[#2F3A36]'
              )}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#C45C5C] text-white text-[10px] font-semibold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-[#E2E8E2] space-y-1">
        {footerExtra}
        <Link
          to="/dev"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A0ABA3] hover:text-[#7D897F] hover:bg-[#F3F6F3] transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          Exit
        </Link>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#2F3A36] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-[#E2E8E2] flex-col h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-[#E2E8E2] px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0', brandAccent)}>
            {brandTitle.charAt(0)}
          </div>
          <span className="font-semibold text-sm truncate">{brandTitle}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#2F3A36] hover:bg-[#F3F6F3]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-[#2F3A36]/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[min(100%,280px)] bg-white shadow-xl flex flex-col animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-[#E2E8E2]">
              <span className="font-semibold text-sm">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F3F6F3]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
