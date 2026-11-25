import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  GitBranch,
  Activity,
  Settings,
  Plus,
  ChevronRight,
  X,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import {
  mockBranches,
  mockWorkers,
  mockIdentities,
  mockProviders,
  mockHealthWarnings,
  companyPerformance,
  formatNaira,
  formatPct,
} from '../../data/mock'
import type { Branch } from '../../types'
import { PerformanceChart } from '../../components/charts/PerformanceChart'
import { StatusBadge } from '../../components/ui/StatusBadge'

function Overview() {
  const perf = companyPerformance
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Company overview</h1>
        <p className="text-[#7D897F] text-sm mt-1">Combined performance across all branches</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Expected today', value: formatNaira(perf.expected), icon: TrendingUp },
          { label: 'Realised today', value: formatNaira(perf.realised), icon: Wallet },
          { label: 'Achievement', value: formatPct(perf.achievementPct), icon: Activity },
          { label: 'Outstanding', value: formatNaira(perf.outstanding), icon: CreditCard },
        ].map((c) => (
          <div key={c.label} className="p-4 sm:p-5 rounded-[20px] border border-[#E2E8E2] bg-white shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
            <div className="flex items-center gap-2 text-[#7D897F] text-xs sm:text-sm mb-2">
              <c.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{c.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-4 sm:p-6 mb-8 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        <h2 className="font-semibold mb-4">Expected vs realised (7 days)</h2>
        <PerformanceChart />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-4 sm:p-6 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
          <h2 className="font-semibold mb-4">Branches</h2>
          <div className="space-y-2">
            {mockBranches.map((b) => (
              <Link
                key={b.id}
                to={`/company/branches/${b.id}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F7F9F6] transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{b.name}</p>
                  <p className="text-xs text-[#A0ABA3]">
                    {formatNaira(b.realisedToday)} / {formatNaira(b.expectedToday)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={b.health} />
                  <ChevronRight className="w-4 h-4 text-[#A0ABA3]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-4 sm:p-6 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
          <h2 className="font-semibold mb-4">Health warnings</h2>
          {mockHealthWarnings.filter((w) => w.companyId === 'cmp_001').length === 0 ? (
            <p className="text-sm text-[#A0ABA3]">No active warnings</p>
          ) : (
            <div className="space-y-3">
              {mockHealthWarnings
                .filter((w) => w.companyId === 'cmp_001')
                .map((w) => (
                  <div key={w.id} className="flex gap-3 p-3 rounded-xl bg-[#D4A017]/08 border border-[#D4A017]/20">
                    <AlertTriangle className="w-5 h-5 text-[#D4A017] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{w.branchName}</p>
                      <p className="text-xs text-[#7D897F] mt-0.5">{w.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function BranchesView() {
  const [showCreate, setShowCreate] = useState(false)
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Branches</h1>
          <p className="text-[#7D897F] text-sm mt-1">All branches belonging to this company</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2F3A36] text-white text-sm font-medium hover:bg-[#1F2824]"
        >
          <Plus className="w-4 h-4" /> Create branch
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBranches.map((b) => (
          <Link
            key={b.id}
            to={`/company/branches/${b.id}`}
            className="p-5 rounded-[20px] border border-[#E2E8E2] bg-white hover:border-[#2F3A36]/20 shadow-[0_4px_20px_rgba(47,58,54,0.04)] transition-all group"
          >
            <div className="flex items-start justify-between mb-4 gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold group-hover:text-[#2F3A36] truncate">{b.name}</h3>
                <p className="text-xs text-[#A0ABA3] mt-0.5 truncate">{b.url}</p>
              </div>
              <StatusBadge status={b.health} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[#A0ABA3] text-xs">Workers</p>
                <p className="font-medium">{b.workerCount}</p>
              </div>
              <div>
                <p className="text-[#A0ABA3] text-xs">Active loans</p>
                <p className="font-medium">{b.activeLoans}</p>
              </div>
              <div>
                <p className="text-[#A0ABA3] text-xs">Expected</p>
                <p className="font-medium text-sm">{formatNaira(b.expectedToday)}</p>
              </div>
              <div>
                <p className="text-[#A0ABA3] text-xs">Realised</p>
                <p className="font-medium text-sm">{formatNaira(b.realisedToday)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {showCreate && <CreateBranchModal onClose={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  )
}

function CreateBranchModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [done, setDone] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    setDone(`${slug}.horizon.qatavel.app`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2F3A36]/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-[24px] sm:rounded-[24px] border border-[#E2E8E2] bg-white p-6 shadow-xl">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold text-lg">Create branch</h2>
          <button type="button" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        {done ? (
          <div className="space-y-4">
            <p className="text-[#3D9B6E] font-medium text-sm">Branch created</p>
            <p className="text-sm text-[#7D897F]">Branch URL:</p>
            <p className="font-mono text-sm bg-[#F7F9F6] px-3 py-2.5 rounded-xl border border-[#E2E8E2] break-all">{done}</p>
            <p className="text-xs text-[#A0ABA3]">No password is generated for a branch. Create workers from the branch view.</p>
            <button type="button" onClick={onClose} className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#7D897F] mb-1.5">Branch name *</label>
              <input required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30" />
            </div>
            <div>
              <label className="block text-sm text-[#7D897F] mb-1.5">Branch address *</label>
              <input required value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30" />
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm">Create branch</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

function BranchDetail() {
  const branch = mockBranches[0]
  const workers = mockWorkers.filter((w) => w.branchId === branch.id)
  const provider = mockProviders.find((p) => p.branchId === branch.id)
  const [showProvider, setShowProvider] = useState(false)
  const [showCreateWorker, setShowCreateWorker] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <button type="button" onClick={() => navigate('/company/branches')} className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6">
        ← Back to branches
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{branch.name}</h1>
          <p className="text-[#7D897F] text-sm break-all">{branch.url}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowProvider(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E2E8E2] bg-white text-sm font-medium hover:border-[#2F3A36]/30"
        >
          <CreditCard className="w-4 h-4" />
          Payment provider
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Expected today', value: formatNaira(branch.expectedToday) },
          { label: 'Realised today', value: formatNaira(branch.realisedToday) },
          { label: 'Active loans', value: branch.activeLoans },
          { label: 'Provider', value: provider?.provider ?? 'None' },
        ].map((c) => (
          <div key={c.label} className="p-4 rounded-[16px] border border-[#E2E8E2] bg-white">
            <p className="text-xs text-[#A0ABA3]">{c.label}</p>
            <p className="text-lg font-semibold capitalize mt-0.5 truncate">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white overflow-hidden shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        <div className="px-4 sm:px-6 py-4 border-b border-[#E2E8E2] flex items-center justify-between">
          <h2 className="font-semibold">Workers</h2>
          <button type="button" onClick={() => setShowCreateWorker(true)} className="text-sm text-[#2F3A36] font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add worker
          </button>
        </div>
        <div className="divide-y divide-[#E2E8E2]">
          {workers.map((w) => {
            const identity = mockIdentities.find((i) => i.id === w.currentIdentityId)
            return (
              <div key={w.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-[#C5DCE0] flex items-center justify-center text-sm font-semibold text-[#2F3A36] shrink-0">
                  {identity?.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{identity?.fullName}</p>
                  <p className="text-xs text-[#A0ABA3]">{w.role} · {w.username}</p>
                </div>
                {w.role === 'CO' && (
                  <div className="text-right text-sm shrink-0 hidden sm:block">
                    <p className="font-medium">{formatPct(w.achievementPct ?? 0)}</p>
                    <p className="text-xs text-[#A0ABA3]">{formatNaira(w.realisedToday ?? 0)}</p>
                  </div>
                )}
                <StatusBadge status={w.status} />
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {showProvider && <ProviderModal branch={branch} provider={provider} onClose={() => setShowProvider(false)} />}
        {showCreateWorker && <CreateWorkerModal onClose={() => setShowCreateWorker(false)} />}
      </AnimatePresence>
    </div>
  )
}

function ProviderModal({ branch, provider, onClose }: { branch: Branch; provider?: { provider: string }; onClose: () => void }) {
  const [selected, setSelected] = useState(provider?.provider ?? 'monnify')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2F3A36]/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ y: 40 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-[24px] sm:rounded-[24px] border border-[#E2E8E2] bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Payment provider — {branch.name}</h2>
          <button type="button" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <p className="text-xs text-[#A0ABA3] mb-4">Each branch has its own exclusive provider. Changing provider migrates customer virtual accounts.</p>
        <div className="space-y-2 mb-6">
          {(['monnify', 'paystack', 'flutterwave', '9japay'] as const).map((p) => (
            <button type="button" key={p} onClick={() => setSelected(p)}
              className={`w-full text-left px-4 py-3 rounded-xl border capitalize transition-all ${
                selected === p ? 'border-[#2F3A36] bg-[#2F3A36]/5' : 'border-[#E2E8E2] hover:border-[#2F3A36]/20'
              }`}>
              {p}
              {provider?.provider === p && <span className="ml-2 text-xs text-[#3D9B6E]">(current)</span>}
            </button>
          ))}
        </div>
        <div className="space-y-3 mb-6">
          <input placeholder="API / Secret key" className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
          <input placeholder="Additional config (if required)" className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" className="flex-1 py-2.5 rounded-full border border-[#E2E8E2] text-sm font-medium">Test connection</button>
          <button type="button" className="flex-1 py-2.5 rounded-full bg-[#2F3A36] text-white font-medium text-sm">Save & activate</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CreateWorkerModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<'BM' | 'CO'>('CO')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState<{ username: string; password: string } | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const username = name.replace(/\s+/g, '')
    setDone({ username, password: username.slice(0, 4) + '@' + Math.floor(1000 + Math.random() * 9000) })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2F3A36]/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ y: 40 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-[24px] sm:rounded-[24px] border border-[#E2E8E2] bg-white p-6 shadow-xl">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold">Create worker</h2>
          <button type="button" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        {done ? (
          <div className="space-y-3">
            <p className="text-[#3D9B6E] font-medium text-sm">Worker created</p>
            <p className="text-sm">Username: <span className="font-mono">{done.username}</span></p>
            <p className="text-sm">Initial password: <span className="font-mono">{done.password}</span></p>
            <p className="text-xs text-[#A0ABA3]">Worker logs in at the branch URL with these credentials.</p>
            <button type="button" onClick={onClose} className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm mt-2">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex gap-2">
              {(['BM', 'CO'] as const).map((r) => (
                <button type="button" key={r} onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium ${role === r ? 'bg-[#2F3A36] text-white' : 'border border-[#E2E8E2]'}`}>
                  {r === 'BM' ? 'Branch Manager' : 'Collection Officer'}
                </button>
              ))}
            </div>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name *"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number *"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
            <div className="border border-dashed border-[#E2E8E2] rounded-xl p-6 text-center text-sm text-[#A0ABA3]">
              Passport photo upload (mock)
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm">Create worker</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

function HealthView() {
  const warnings = mockHealthWarnings.filter((w) => w.companyId === 'cmp_001')
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">Company health</h1>
      <p className="text-[#7D897F] text-sm mb-8">Operational warnings by branch</p>
      {warnings.length === 0 ? (
        <div className="p-12 rounded-[20px] border border-[#E2E8E2] bg-white text-center text-[#A0ABA3] text-sm">
          All systems healthy
        </div>
      ) : (
        <div className="space-y-3">
          {warnings.map((w) => (
            <div key={w.id} className={`p-5 rounded-[20px] border ${
              w.severity === 'critical' ? 'border-[#C45C5C]/30 bg-[#C45C5C]/05' : 'border-[#D4A017]/30 bg-[#D4A017]/05'
            }`}>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <AlertTriangle className={`w-4 h-4 ${w.severity === 'critical' ? 'text-[#C45C5C]' : 'text-[#D4A017]'}`} />
                <span className="font-medium">{w.branchName}</span>
                <span className="text-xs uppercase tracking-wider text-[#A0ABA3]">{w.type.replace('_', ' ')}</span>
              </div>
              <p className="text-sm text-[#7D897F]">{w.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SettingsView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">Settings</h1>
      <p className="text-[#7D897F] text-sm mb-8">Change password, reset password, appearance</p>
      <div className="space-y-3">
        <button type="button" className="w-full text-left px-5 py-4 rounded-[16px] border border-[#E2E8E2] bg-white hover:border-[#2F3A36]/20 transition-colors text-sm font-medium">
          Change password
        </button>
        <button type="button" className="w-full text-left px-5 py-4 rounded-[16px] border border-[#E2E8E2] bg-white hover:border-[#2F3A36]/20 transition-colors text-sm font-medium">
          Reset password
        </button>
        <div className="px-5 py-4 rounded-[16px] border border-[#E2E8E2] bg-white flex items-center justify-between">
          <span className="text-sm font-medium">Appearance</span>
          <div className="flex gap-2">
            <button type="button" className="px-3 py-1.5 rounded-full bg-[#2F3A36] text-white text-xs font-medium">Dark</button>
            <button type="button" className="px-3 py-1.5 rounded-full border border-[#E2E8E2] text-xs font-medium">Light</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompanyDashboard() {
  const nav = [
    { to: '/company', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/company/branches', label: 'Branches', icon: GitBranch },
    { to: '/company/health', label: 'Company health', icon: Activity },
    { to: '/company/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <AppShell
      brandTitle="Horizon Microfinance"
      brandSubtitle="Company workplace"
      brandAccent="bg-[#5B8FA8]"
      nav={nav}
    >
      <Routes>
        <Route index element={<Overview />} />
        <Route path="branches" element={<BranchesView />} />
        <Route path="branches/:id" element={<BranchDetail />} />
        <Route path="health" element={<HealthView />} />
        <Route path="settings" element={<SettingsView />} />
      </Routes>
    </AppShell>
  )
}
