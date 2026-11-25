import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  GitBranch,
  Activity,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
  X,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Wallet,
} from 'lucide-react'
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

function CompanySidebar() {
  const location = useLocation()
  const items = [
    { to: '/company', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/company/branches', label: 'Branches', icon: GitBranch },
    { to: '/company/health', label: 'Company Health', icon: Activity },
    { to: '/company/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 shrink-0 border-r border-[#1A3A42] bg-[#05161A] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-[#1A3A42]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F969C] to-[#6DA5C0] flex items-center justify-center font-bold text-xs text-[#05161A]">
            H
          </div>
          <div>
            <div className="font-semibold text-sm">Horizon Microfinance</div>
            <div className="text-[10px] text-[#5A7A82]">Company Workplace</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const active = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-[#0F969C]/15 text-[#0F969C]'
                  : 'text-[#8BA8B0] hover:bg-[#0A1F24] hover:text-[#E8F4F5]'
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-[#1A3A42]">
        <Link to="/dev" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#5A7A82] hover:text-[#8BA8B0]">
          <LogOut className="w-4.5 h-4.5" /> Exit
        </Link>
      </div>
    </aside>
  )
}

function Overview() {
  const perf = companyPerformance
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Company Overview</h1>
        <p className="text-[#8BA8B0] text-sm mt-1">Combined performance across all branches</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Expected today', value: formatNaira(perf.expected), icon: TrendingUp },
          { label: 'Realised today', value: formatNaira(perf.realised), icon: Wallet },
          { label: 'Achievement', value: formatPct(perf.achievementPct), icon: Activity },
          { label: 'Outstanding', value: formatNaira(perf.outstanding), icon: CreditCard },
        ].map((c) => (
          <div key={c.label} className="p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24]">
            <div className="flex items-center gap-2 text-[#8BA8B0] text-sm mb-2">
              <c.icon className="w-4 h-4" />
              {c.label}
            </div>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6 mb-8">
        <h2 className="font-semibold mb-4">Expected vs Realised (7 days)</h2>
        <PerformanceChart />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6">
          <h2 className="font-semibold mb-4">Branches</h2>
          <div className="space-y-3">
            {mockBranches.map((b) => (
              <Link
                key={b.id}
                to={`/company/branches/${b.id}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0C1F24] transition-colors"
              >
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-[#5A7A82]">
                    {formatNaira(b.realisedToday)} / {formatNaira(b.expectedToday)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    b.health === 'healthy' ? 'bg-[#10B981]/15 text-[#10B981]' :
                    b.health === 'warning' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' :
                    'bg-[#EF4444]/15 text-[#EF4444]'
                  }`}>
                    {b.health}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#5A7A82]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6">
          <h2 className="font-semibold mb-4">Health warnings</h2>
          {mockHealthWarnings.filter(w => w.companyId === 'cmp_001').length === 0 ? (
            <p className="text-sm text-[#5A7A82]">No active warnings</p>
          ) : (
            <div className="space-y-3">
              {mockHealthWarnings.filter(w => w.companyId === 'cmp_001').map((w) => (
                <div key={w.id} className="flex gap-3 p-3 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/20">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{w.branchName}</p>
                    <p className="text-xs text-[#8BA8B0]">{w.message}</p>
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Branches</h1>
          <p className="text-[#8BA8B0] text-sm mt-1">All branches belonging to this company</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Create branch
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockBranches.map((b) => (
          <Link
            key={b.id}
            to={`/company/branches/${b.id}`}
            className="p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/40 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold group-hover:text-[#0F969C] transition-colors">{b.name}</h3>
                <p className="text-xs text-[#5A7A82] mt-0.5">{b.url}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                b.health === 'healthy' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
              }`}>
                {b.health}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[#5A7A82] text-xs">Workers</p>
                <p className="font-medium">{b.workerCount}</p>
              </div>
              <div>
                <p className="text-[#5A7A82] text-xs">Active loans</p>
                <p className="font-medium">{b.activeLoans}</p>
              </div>
              <div>
                <p className="text-[#5A7A82] text-xs">Expected today</p>
                <p className="font-medium">{formatNaira(b.expectedToday)}</p>
              </div>
              <div>
                <p className="text-[#5A7A82] text-xs">Realised today</p>
                <p className="font-medium">{formatNaira(b.realisedToday)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {showCreate && (
          <CreateBranchModal onClose={() => setShowCreate(false)} />
        )}
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6"
      >
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold text-lg">Create branch</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        {done ? (
          <div className="space-y-4">
            <p className="text-[#10B981] font-medium">Branch created</p>
            <p className="text-sm text-[#8BA8B0]">Branch URL:</p>
            <p className="font-mono text-sm bg-[#05161A] px-3 py-2 rounded-lg">{done}</p>
            <p className="text-xs text-[#5A7A82]">No password is generated for a branch. Create workers from the branch view.</p>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#8BA8B0] mb-1">Branch name *</label>
              <input required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm focus:outline-none focus:border-[#0F969C]" />
            </div>
            <div>
              <label className="block text-sm text-[#8BA8B0] mb-1">Branch address *</label>
              <input required value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm focus:outline-none focus:border-[#0F969C]" />
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm">Create branch</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

function BranchDetail() {
  const branch = mockBranches[0]
  const workers = mockWorkers.filter(w => w.branchId === branch.id)
  const provider = mockProviders.find(p => p.branchId === branch.id)
  const [showProvider, setShowProvider] = useState(false)
  const [showCreateWorker, setShowCreateWorker] = useState(false)

  return (
    <div className="p-8">
      <Link to="/company/branches" className="text-sm text-[#8BA8B0] hover:text-[#0F969C] mb-6 inline-block">
        ← Back to branches
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{branch.name}</h1>
          <p className="text-[#8BA8B0] text-sm">{branch.url}</p>
        </div>
        <button
          onClick={() => setShowProvider(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1A3A42] text-sm hover:border-[#0F969C]"
        >
          <CreditCard className="w-4 h-4" />
          Payment provider
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24]">
          <p className="text-xs text-[#5A7A82]">Expected today</p>
          <p className="text-xl font-bold">{formatNaira(branch.expectedToday)}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24]">
          <p className="text-xs text-[#5A7A82]">Realised today</p>
          <p className="text-xl font-bold">{formatNaira(branch.realisedToday)}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24]">
          <p className="text-xs text-[#5A7A82]">Active loans</p>
          <p className="text-xl font-bold">{branch.activeLoans}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24]">
          <p className="text-xs text-[#5A7A82]">Provider</p>
          <p className="text-xl font-bold capitalize">{provider?.provider ?? 'None'}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1A3A42] flex items-center justify-between">
          <h2 className="font-semibold">Workers</h2>
          <button
            onClick={() => setShowCreateWorker(true)}
            className="flex items-center gap-1.5 text-sm text-[#0F969C] hover:underline"
          >
            <Plus className="w-4 h-4" /> Add worker
          </button>
        </div>
        <div className="divide-y divide-[#1A3A42]">
          {workers.map((w) => {
            const identity = mockIdentities.find(i => i.id === w.currentIdentityId)
            return (
              <div key={w.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-[#0F969C]/20 flex items-center justify-center text-sm font-semibold text-[#0F969C]">
                  {identity?.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{identity?.fullName}</p>
                  <p className="text-xs text-[#5A7A82]">{w.role} · {w.username}</p>
                </div>
                {w.role === 'CO' && (
                  <div className="text-right text-sm">
                    <p className="font-medium">{formatPct(w.achievementPct ?? 0)}</p>
                    <p className="text-xs text-[#5A7A82]">{formatNaira(w.realisedToday ?? 0)} realised</p>
                  </div>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  w.status === 'active' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#5A7A82]/20 text-[#8BA8B0]'
                }`}>
                  {w.status}
                </span>
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

function ProviderModal({ branch, provider, onClose }: { branch: Branch; provider?: any; onClose: () => void }) {
  const [selected, setSelected] = useState(provider?.provider ?? 'monnify')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold">Payment provider — {branch.name}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <p className="text-xs text-[#5A7A82] mb-4">Each branch has its own exclusive provider. Changing provider migrates all customer virtual accounts.</p>
        <div className="space-y-2 mb-6">
          {(['monnify', 'paystack', 'flutterwave', '9japay'] as const).map((p) => (
            <button key={p} onClick={() => setSelected(p)}
              className={`w-full text-left px-4 py-3 rounded-xl border capitalize transition-all ${
                selected === p ? 'border-[#0F969C] bg-[#0F969C]/10' : 'border-[#1A3A42] hover:border-[#294D61]'
              }`}>
              {p}
              {provider?.provider === p && <span className="ml-2 text-xs text-[#10B981]">(current)</span>}
            </button>
          ))}
        </div>
        <div className="space-y-3 mb-6">
          <input placeholder="API / Secret key" className="w-full px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
          <input placeholder="Additional config (if required)" className="w-full px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl border border-[#1A3A42] text-sm">Test connection</button>
          <button className="flex-1 py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm">Save & activate</button>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold">Create worker</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        {done ? (
          <div className="space-y-3">
            <p className="text-[#10B981] font-medium">Worker created</p>
            <p className="text-sm">Username: <span className="font-mono">{done.username}</span></p>
            <p className="text-sm">Initial password: <span className="font-mono">{done.password}</span></p>
            <p className="text-xs text-[#5A7A82]">Worker logs in at the branch URL with these credentials.</p>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm mt-2">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex gap-2">
              {(['BM', 'CO'] as const).map((r) => (
                <button type="button" key={r} onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${role === r ? 'bg-[#0F969C] text-[#05161A]' : 'border border-[#1A3A42]'}`}>
                  {r === 'BM' ? 'Branch Manager' : 'Collection Officer'}
                </button>
              ))}
            </div>
            <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full name *"
              className="w-full px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
            <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number *"
              className="w-full px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
            <div className="border border-dashed border-[#1A3A42] rounded-xl p-6 text-center text-sm text-[#5A7A82]">
              Passport photo upload (mock)
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm">Create worker</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

function HealthView() {
  const warnings = mockHealthWarnings.filter(w => w.companyId === 'cmp_001')
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Company Health</h1>
      <p className="text-[#8BA8B0] text-sm mb-8">Operational warnings by branch</p>
      {warnings.length === 0 ? (
        <div className="p-12 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] text-center text-[#5A7A82]">
          All systems healthy
        </div>
      ) : (
        <div className="space-y-4">
          {warnings.map(w => (
            <div key={w.id} className={`p-5 rounded-2xl border ${
              w.severity === 'critical' ? 'border-[#EF4444]/40 bg-[#EF4444]/5' : 'border-[#F59E0B]/40 bg-[#F59E0B]/5'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className={`w-4 h-4 ${w.severity === 'critical' ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`} />
                <span className="font-medium">{w.branchName}</span>
                <span className="text-xs uppercase tracking-wider text-[#5A7A82]">{w.type.replace('_', ' ')}</span>
              </div>
              <p className="text-sm text-[#8BA8B0]">{w.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SettingsView() {
  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-[#8BA8B0] text-sm mb-8">Change password, reset password, appearance</p>
      <div className="space-y-4">
        <button className="w-full text-left px-5 py-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/40 transition-colors">
          Change password
        </button>
        <button className="w-full text-left px-5 py-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/40 transition-colors">
          Reset password
        </button>
        <div className="px-5 py-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24] flex items-center justify-between">
          <span>Appearance</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-[#0F969C] text-[#05161A] text-sm font-medium">Dark</button>
            <button className="px-3 py-1 rounded-lg border border-[#1A3A42] text-sm">Light</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompanyDashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--q-deep)] text-[var(--q-text)]">
      <CompanySidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="branches" element={<BranchesView />} />
          <Route path="branches/:id" element={<BranchDetail />} />
          <Route path="health" element={<HealthView />} />
          <Route path="settings" element={<SettingsView />} />
        </Routes>
      </main>
    </div>
  )
}
