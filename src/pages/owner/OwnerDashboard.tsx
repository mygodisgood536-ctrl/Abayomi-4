import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  Plus,
  LogOut,
  Search,
  Ban,
  Pause,
  Play,
  ChevronRight,
  X,
} from 'lucide-react'
import { mockCompanies } from '../../data/mock'
import type { Company } from '../../types'

function Sidebar() {
  const location = useLocation()
  const nav = [
    { to: '/owner', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/owner/companies', label: 'Companies', icon: Building2 },
  ]

  return (
    <aside className="w-64 shrink-0 border-r border-[#E2E8E2] bg-white border-r border-[#E2E8E2] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-[#E2E8E2]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F969C] to-[#6DA5C0] flex items-center justify-center font-bold text-xs text-white">
            Q
          </div>
          <div>
            <div className="font-semibold text-sm">QATAVEL</div>
            <div className="text-[10px] text-[#A0ABA3] uppercase tracking-wider">Infrastructure</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const active = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-[#2F3A36]/15 text-[#2F3A36]'
                  : 'text-[#7D897F] hover:bg-white hover:text-[#2F3A36]'
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-[#E2E8E2]">
        <Link
          to="/dev"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#A0ABA3] hover:text-[#7D897F] transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          Exit to Dev Access
        </Link>
      </div>
    </aside>
  )
}

function OwnerOverview() {
  const active = mockCompanies.filter((c) => c.status === 'active').length
  const warnings = mockCompanies.filter((c) => c.health !== 'healthy').length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Platform Overview</h1>
        <p className="text-[#7D897F] text-sm mt-1">Infrastructure health and tenant summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        {[
          { label: 'Companies', value: mockCompanies.length, sub: `${active} active` },
          { label: 'Total Branches', value: mockCompanies.reduce((s, c) => s + c.branchCount, 0), sub: 'Across all tenants' },
          { label: 'Total Workers', value: mockCompanies.reduce((s, c) => s + c.workerCount, 0), sub: 'BM + CO accounts' },
          { label: 'Health Alerts', value: warnings, sub: warnings ? 'Needs attention' : 'All clear', alert: warnings > 0 },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl border border-[#E2E8E2] bg-white"
          >
            <p className="text-sm text-[#7D897F] mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.alert ? 'text-[#F59E0B]' : 'text-[#2F3A36]'}`}>
              {card.value}
            </p>
            <p className="text-xs text-[#A0ABA3] mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E2E8E2] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8E2] flex items-center justify-between">
          <h2 className="font-semibold">Companies</h2>
          <Link
            to="/owner/companies"
            className="text-sm text-[#2F3A36] hover:underline flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-[#1A3A42]">
          {mockCompanies.map((c) => (
            <CompanyRow key={c.id} company={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CompanyRow({ company }: { company: Company }) {
  const statusColor = {
    active: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
    suspended: 'bg-[#D4A017]/12 text-[#D4A017]',
    deactivated: 'bg-[#EF4444]/15 text-[#EF4444]',
  }[company.status]

  const healthColor = {
    healthy: 'bg-[#10B981]',
    warning: 'bg-[#F59E0B]',
    critical: 'bg-[#EF4444]',
  }[company.health]

  return (
    <Link
      to={`/owner/companies/${company.id}`}
      className="flex items-center gap-4 px-6 py-4 hover:bg-[#F3F6F3] transition-colors"
    >
      <div className={`w-2.5 h-2.5 rounded-full ${healthColor}`} title={company.health} />
      <div className="flex-1 min-w-0">
        <div className="font-medium">{company.name}</div>
        <div className="text-xs text-[#A0ABA3]">{company.url}</div>
      </div>
      <div className="hidden sm:block text-sm text-[#7D897F]">
        {company.branchCount} branches · {company.workerCount} workers
      </div>
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor}`}>
        {company.status}
      </span>
      <ChevronRight className="w-4 h-4 text-[#A0ABA3]" />
    </Link>
  )
}

function CompaniesList() {
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const filtered = mockCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Companies</h1>
          <p className="text-[#7D897F] text-sm mt-1">All tenants on the platform</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2F3A36] text-white font-semibold text-sm hover:bg-[#5B8A7A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create company
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0ABA3]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies…"
          className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/40"
        />
      </div>

      <div className="rounded-2xl border border-[#E2E8E2] bg-white overflow-hidden">
        <div className="divide-y divide-[#1A3A42]">
          {filtered.map((c) => (
            <CompanyRow key={c.id} company={c} />
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-[#A0ABA3]">
              No companies match your search
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCreate && <CreateCompanyModal onClose={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  )
}

function CreateCompanyModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [gmail, setGmail] = useState('')
  const [address, setAddress] = useState('')
  const [domain, setDomain] = useState('')
  const [created, setCreated] = useState<{ url: string; password: string } | null>(null)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setCreated({
      url: domain ? `${slug}.${domain}` : `${slug}.qatavel.app`,
      password: 'TempPass#' + Math.random().toString(36).slice(2, 8),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-[#E2E8E2] bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Create company</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#1A3A42]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {created ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30">
              <p className="text-[#10B981] font-medium mb-1">Company created</p>
              <p className="text-sm text-[#7D897F]">
                Provide the URL and temporary password to the company management.
              </p>
            </div>
            <div>
              <p className="text-xs text-[#A0ABA3] mb-1">Company URL</p>
              <p className="font-mono text-sm bg-[#F7F9F6] px-3 py-2 rounded-lg">{created.url}</p>
            </div>
            <div>
              <p className="text-xs text-[#A0ABA3] mb-1">Temporary password</p>
              <p className="font-mono text-sm bg-[#F7F9F6] px-3 py-2 rounded-lg">{created.password}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#2F3A36] text-white font-semibold text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-[#7D897F] mb-1">Company name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/40"
                placeholder="e.g. Horizon Microfinance"
              />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1">Gmail address *</label>
              <input
                required
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/40"
                placeholder="admin@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1">Company address *</label>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/40"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1">Domain (optional)</label>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/40"
                placeholder="Leave blank for *.qatavel.app"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#2F3A36] text-white font-semibold text-sm hover:bg-[#5B8A7A] transition-colors"
            >
              Create company
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

function CompanyDetail() {
  const company = mockCompanies[0] // simplified for mock
  const navigate = useNavigate()

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/owner/companies')}
        className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6 flex items-center gap-1"
      >
        ← Back to companies
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <p className="text-[#7D897F] text-sm mt-1">{company.url}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#F59E0B]/40 text-[#F59E0B] text-sm hover:bg-[#F59E0B]/10">
            <Pause className="w-4 h-4" /> Suspend
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#EF4444]/40 text-[#EF4444] text-sm hover:bg-[#EF4444]/10">
            <Ban className="w-4 h-4" /> Deactivate
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#10B981]/40 text-[#10B981] text-sm hover:bg-[#10B981]/10">
            <Play className="w-4 h-4" /> Reactivate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-[#E2E8E2] bg-white">
          <p className="text-xs text-[#A0ABA3]">Branches</p>
          <p className="text-2xl font-bold">{company.branchCount}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E2E8E2] bg-white">
          <p className="text-xs text-[#A0ABA3]">Workers (BM + CO)</p>
          <p className="text-2xl font-bold">{company.workerCount}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E2E8E2] bg-white">
          <p className="text-xs text-[#A0ABA3]">Status</p>
          <p className="text-lg font-semibold capitalize">{company.status}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E2E8E2] bg-white">
          <p className="text-xs text-[#A0ABA3]">Health</p>
          <p className="text-lg font-semibold capitalize">{company.health}</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-[#E2E8E2] bg-white">
        <p className="text-sm text-[#7D897F]">
          As Infrastructure Owner you see company structure and health only.
          You do <strong className="text-[#2F3A36]">not</strong> see customer data, loans, payments or money movement.
        </p>
      </div>
    </div>
  )
}

export default function OwnerDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F7F9F6] text-[var(--q-text)]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<OwnerOverview />} />
          <Route path="companies" element={<CompaniesList />} />
          <Route path="companies/:id" element={<CompanyDetail />} />
        </Routes>
      </main>
    </div>
  )
}
