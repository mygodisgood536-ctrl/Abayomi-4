import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  LogOut,
  ArrowLeftRight,
  ChevronRight,
} from 'lucide-react'
import {
  mockWorkers,
  mockIdentities,
  mockGroups,
  formatNaira,
  formatPct,
} from '../../data/mock'

function BMSidebar({ mode, setMode }: { mode: 'bm' | 'co'; setMode: (m: 'bm' | 'co') => void }) {
  const location = useLocation()
  const items = mode === 'bm'
    ? [
        { to: '/bm', label: 'Branch Dashboard', icon: LayoutDashboard, exact: true },
        { to: '/bm/officers', label: 'Collection Officers', icon: Users },
        { to: '/bm/groups', label: 'Groups & Customers', icon: UserCircle },
      ]
    : [{ to: '/bm', label: 'My Portfolio (CO mode)', icon: LayoutDashboard, exact: true }]

  return (
    <aside className="w-64 shrink-0 border-r border-[#1A3A42] bg-[#05161A] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-[#1A3A42]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center font-bold text-xs text-[#10B981]">BM</div>
          <div>
            <div className="font-semibold text-sm">Adaobi Okeke</div>
            <div className="text-[10px] text-[#5A7A82]">Lekki Main · Branch Manager</div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <button onClick={() => setMode(mode === 'bm' ? 'co' : 'bm')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#1A3A42] text-sm font-medium hover:border-[#0F969C] transition-colors">
          <ArrowLeftRight className="w-4 h-4" />
          {mode === 'bm' ? 'Work as CO' : 'Back to BM Dashboard'}
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)
          return (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? 'bg-[#10B981]/15 text-[#10B981]' : 'text-[#8BA8B0] hover:bg-[#0A1F24] hover:text-[#E8F4F5]'
              }`}>
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

function BMOverview() {
  const cos = mockWorkers.filter(w => w.role === 'CO')
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Branch Dashboard</h1>
      <p className="text-[#8BA8B0] text-sm mb-8">Lekki Main · Full branch visibility</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Expected today', value: formatNaira(845000) },
          { label: 'Realised today', value: formatNaira(712500) },
          { label: 'Achievement', value: '84.3%' },
          { label: 'Active loans', value: '128' },
        ].map(c => (
          <div key={c.label} className="p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24]">
            <p className="text-sm text-[#8BA8B0] mb-1">{c.label}</p>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1A3A42]"><h2 className="font-semibold">Collection Officers performance</h2></div>
        <div className="divide-y divide-[#1A3A42]">
          {cos.map(w => {
            const id = mockIdentities.find(i => i.id === w.currentIdentityId)
            return (
              <Link key={w.id} to={`/bm/officers/${w.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-[#0C1F24] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#0F969C]/20 flex items-center justify-center text-[#0F969C] font-semibold">{id?.fullName.charAt(0)}</div>
                <div className="flex-1">
                  <p className="font-medium">{id?.fullName}</p>
                  <p className="text-xs text-[#5A7A82]">{w.portfolioSize} customers</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${(w.achievementPct ?? 0) >= 80 ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{formatPct(w.achievementPct ?? 0)}</p>
                  <p className="text-xs text-[#5A7A82]">{formatNaira(w.realisedToday ?? 0)}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#5A7A82]" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OfficersList() {
  const cos = mockWorkers.filter(w => w.role === 'CO')
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Collection Officers</h1>
      <div className="space-y-3">
        {cos.map(w => {
          const id = mockIdentities.find(i => i.id === w.currentIdentityId)
          return (
            <Link key={w.id} to={`/bm/officers/${w.id}`} className="flex items-center gap-4 p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#0F969C]/20 flex items-center justify-center text-[#0F969C] font-semibold text-lg">{id?.fullName.charAt(0)}</div>
              <div className="flex-1">
                <p className="font-medium">{id?.fullName}</p>
                <p className="text-sm text-[#8BA8B0]">Expected {formatNaira(w.expectedToday ?? 0)} · Realised {formatNaira(w.realisedToday ?? 0)}</p>
              </div>
              <div className={`text-lg font-bold ${(w.achievementPct ?? 0) >= 80 ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{formatPct(w.achievementPct ?? 0)}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function OfficerDetail() {
  const w = mockWorkers.find(x => x.role === 'CO')!
  const id = mockIdentities.find(i => i.id === w.currentIdentityId)
  return (
    <div className="p-8">
      <Link to="/bm/officers" className="text-sm text-[#8BA8B0] hover:text-[#0F969C] mb-6 inline-block">← Back</Link>
      <h1 className="text-2xl font-bold mb-1">{id?.fullName}</h1>
      <p className="text-[#8BA8B0] text-sm mb-8">Collection Officer · Full portfolio visibility</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Portfolio size', value: w.portfolioSize },
          { label: 'Expected today', value: formatNaira(w.expectedToday ?? 0) },
          { label: 'Realised today', value: formatNaira(w.realisedToday ?? 0) },
          { label: 'Achievement', value: formatPct(w.achievementPct ?? 0) },
        ].map(c => (
          <div key={c.label} className="p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24]">
            <p className="text-xs text-[#5A7A82]">{c.label}</p>
            <p className="text-xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#8BA8B0]">BM can inspect groups, customers, loans, schedules and allocations. Inspecting does not transfer ownership.</p>
    </div>
  )
}

function GroupsView() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Groups & Customers</h1>
      <div className="space-y-4">
        {mockGroups.map(g => (
          <div key={g.id} className="p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{g.name}</h3>
              <span className="text-xs text-[#5A7A82]">{g.number}</span>
            </div>
            <p className="text-sm text-[#8BA8B0]">{g.memberCount} members · {g.address}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BMDashboard() {
  const [mode, setMode] = useState<'bm' | 'co'>('bm')
  return (
    <div className="flex min-h-screen bg-[var(--q-deep)] text-[var(--q-text)]">
      <BMSidebar mode={mode} setMode={setMode} />
      <main className="flex-1 overflow-auto">
        {mode === 'co' ? (
          <div className="p-8">
            <div className="mb-6 p-4 rounded-xl border border-[#0F969C]/30 bg-[#0F969C]/10 text-sm">
              You are in <strong>Work as CO</strong> mode. Full Collection Officer workflow for your own portfolio only.
            </div>
            <h1 className="text-2xl font-bold mb-4">My CO Portfolio</h1>
            <p className="text-[#8BA8B0]">Create groups, add members, run loan applications, confirm disbursement and allocate payments for your own portfolio.</p>
          </div>
        ) : (
          <Routes>
            <Route index element={<BMOverview />} />
            <Route path="officers" element={<OfficersList />} />
            <Route path="officers/:id" element={<OfficerDetail />} />
            <Route path="groups" element={<GroupsView />} />
          </Routes>
        )}
      </main>
    </div>
  )
}
