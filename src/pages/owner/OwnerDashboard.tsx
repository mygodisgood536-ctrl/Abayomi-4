import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  Plus,
  Search,
  Ban,
  Pause,
  Play,
  ChevronRight,
  X,
} from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { mockCompanies } from '../../data/mock'
import type { Company } from '../../types'
import { StatusBadge } from '../../components/ui/StatusBadge'

function OwnerOverview() {
  const active = mockCompanies.filter((c) => c.status === 'active').length
  const warnings = mockCompanies.filter((c) => c.health !== 'healthy').length

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Platform overview</h1>
        <p className="text-[#7D897F] text-sm mt-1">Infrastructure health and tenant summary</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Companies', value: mockCompanies.length, sub: `${active} active` },
          { label: 'Total branches', value: mockCompanies.reduce((s, c) => s + c.branchCount, 0), sub: 'Across tenants' },
          { label: 'Total workers', value: mockCompanies.reduce((s, c) => s + c.workerCount, 0), sub: 'BM + CO' },
          { label: 'Health alerts', value: warnings, sub: warnings ? 'Needs attention' : 'All clear', alert: warnings > 0 },
        ].map((card) => (
          <div key={card.label} className="p-4 sm:p-5 rounded-[20px] border border-[#E2E8E2] bg-white shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
            <p className="text-xs sm:text-sm text-[#7D897F] mb-1">{card.label}</p>
            <p className={`text-2xl sm:text-3xl font-semibold tracking-tight ${card.alert ? 'text-[#D4A017]' : 'text-[#2F3A36]'}`}>
              {card.value}
            </p>
            <p className="text-[11px] text-[#A0ABA3] mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white overflow-hidden shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        <div className="px-4 sm:px-6 py-4 border-b border-[#E2E8E2] flex items-center justify-between">
          <h2 className="font-semibold">Companies</h2>
          <Link to="/owner/companies" className="text-sm text-[#2F3A36] font-medium flex items-center gap-1 hover:opacity-70">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-[#E2E8E2]">
          {mockCompanies.map((c) => (
            <CompanyRow key={c.id} company={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CompanyRow({ company }: { company: Company }) {
  const healthDot = {
    healthy: 'bg-[#3D9B6E]',
    warning: 'bg-[#D4A017]',
    critical: 'bg-[#C45C5C]',
  }[company.health]

  return (
    <Link
      to={`/owner/companies/${company.id}`}
      className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-[#F7F9F6] transition-colors"
    >
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${healthDot}`} title={company.health} />
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{company.name}</div>
        <div className="text-xs text-[#A0ABA3] truncate">{company.url}</div>
      </div>
      <div className="hidden sm:block text-sm text-[#7D897F] shrink-0">
        {company.branchCount} branches · {company.workerCount} workers
      </div>
      <StatusBadge status={company.status} />
      <ChevronRight className="w-4 h-4 text-[#A0ABA3] shrink-0" />
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Companies</h1>
          <p className="text-[#7D897F] text-sm mt-1">All tenants on the platform</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2F3A36] text-white text-sm font-medium hover:bg-[#1F2824] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create company
        </button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0ABA3]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30 focus:ring-2 focus:ring-[#2F3A36]/10"
        />
      </div>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white overflow-hidden shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        <div className="divide-y divide-[#E2E8E2]">
          {filtered.map((c) => (
            <CompanyRow key={c.id} company={c} />
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-14 text-center text-[#A0ABA3] text-sm">
              No companies match your search. Create the first company to get started.
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
      url: domain.trim() ? `${slug}.${domain.trim()}` : `${slug}.qatavel.app`,
      password: 'Temp#' + Math.random().toString(36).slice(2, 8),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2F3A36]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg rounded-t-[24px] sm:rounded-[24px] border border-[#E2E8E2] bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold tracking-tight">Create company</h2>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F3F6F3]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {created ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#3D9B6E]/10 border border-[#3D9B6E]/25">
              <p className="text-[#3D9B6E] font-medium text-sm mb-1">Company created</p>
              <p className="text-sm text-[#7D897F]">
                Provide the URL and temporary password to the company management.
              </p>
            </div>
            <div>
              <p className="text-xs text-[#A0ABA3] mb-1">Company URL</p>
              <p className="font-mono text-sm bg-[#F7F9F6] px-3 py-2.5 rounded-xl border border-[#E2E8E2] break-all">{created.url}</p>
            </div>
            <div>
              <p className="text-xs text-[#A0ABA3] mb-1">Temporary password</p>
              <p className="font-mono text-sm bg-[#F7F9F6] px-3 py-2.5 rounded-xl border border-[#E2E8E2]">{created.password}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm hover:bg-[#1F2824]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-[#7D897F] mb-1.5">Company name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30"
                placeholder="e.g. Horizon Microfinance"
              />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1.5">Gmail address *</label>
              <input
                required
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30"
                placeholder="admin@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1.5">Company address *</label>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1.5">Domain (optional)</label>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30"
                placeholder="Leave blank for *.qatavel.app"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm hover:bg-[#1F2824]"
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
  const company = mockCompanies[0]
  const navigate = useNavigate()

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <button
        type="button"
        onClick={() => navigate('/owner/companies')}
        className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6 flex items-center gap-1"
      >
        ← Back to companies
      </button>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{company.name}</h1>
          <p className="text-[#7D897F] text-sm mt-1 break-all">{company.url}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D4A017]/40 text-[#D4A017] text-sm hover:bg-[#D4A017]/08">
            <Pause className="w-4 h-4" /> Suspend
          </button>
          <button type="button" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#C45C5C]/40 text-[#C45C5C] text-sm hover:bg-[#C45C5C]/08">
            <Ban className="w-4 h-4" /> Deactivate
          </button>
          <button type="button" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#3D9B6E]/40 text-[#3D9B6E] text-sm hover:bg-[#3D9B6E]/08">
            <Play className="w-4 h-4" /> Reactivate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Branches', value: company.branchCount },
          { label: 'Workers (BM + CO)', value: company.workerCount },
          { label: 'Status', value: company.status },
          { label: 'Health', value: company.health },
        ].map((c) => (
          <div key={c.label} className="p-4 rounded-[16px] border border-[#E2E8E2] bg-white">
            <p className="text-xs text-[#A0ABA3]">{c.label}</p>
            <p className="text-lg sm:text-xl font-semibold capitalize mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-[20px] border border-[#E2E8E2] bg-white">
        <p className="text-sm text-[#7D897F] leading-relaxed">
          As Infrastructure Owner you see company structure and health only.
          You do <strong className="text-[#2F3A36]">not</strong> see customer data, loans, payments or money movement.
        </p>
      </div>
    </div>
  )
}

export default function OwnerDashboard() {
  const nav = [
    { to: '/owner', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/owner/companies', label: 'Companies', icon: Building2 },
  ]

  return (
    <AppShell
      brandTitle="QATAVEL"
      brandSubtitle="Infrastructure"
      brandAccent="bg-[#2F3A36]"
      nav={nav}
    >
      <Routes>
        <Route index element={<OwnerOverview />} />
        <Route path="companies" element={<CompaniesList />} />
        <Route path="companies/:id" element={<CompanyDetail />} />
      </Routes>
    </AppShell>
  )
}
