import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ArrowLeftRight,
  ChevronRight,
} from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import {
  mockWorkers,
  mockIdentities,
  mockGroups,
  formatNaira,
  formatPct,
} from '../../data/mock'

function BMOverview() {
  const cos = mockWorkers.filter((w) => w.role === 'CO')
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">Branch dashboard</h1>
      <p className="text-[#7D897F] text-sm mb-8">Lekki Main · Full branch visibility</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Expected today', value: formatNaira(845000) },
          { label: 'Realised today', value: formatNaira(712500) },
          { label: 'Achievement', value: '84.3%' },
          { label: 'Active loans', value: '128' },
        ].map((c) => (
          <div key={c.label} className="p-4 sm:p-5 rounded-[20px] border border-[#E2E8E2] bg-white shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
            <p className="text-xs sm:text-sm text-[#7D897F] mb-1">{c.label}</p>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white overflow-hidden shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        <div className="px-4 sm:px-6 py-4 border-b border-[#E2E8E2]">
          <h2 className="font-semibold">Collection officers performance</h2>
        </div>
        <div className="divide-y divide-[#E2E8E2]">
          {cos.map((w) => {
            const id = mockIdentities.find((i) => i.id === w.currentIdentityId)
            return (
              <Link
                key={w.id}
                to={`/bm/officers/${w.id}`}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-[#F7F9F6] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#D4EDE0] flex items-center justify-center text-[#2F3A36] font-semibold shrink-0">
                  {id?.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{id?.fullName}</p>
                  <p className="text-xs text-[#A0ABA3]">{w.portfolioSize} customers</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-semibold text-sm ${(w.achievementPct ?? 0) >= 80 ? 'text-[#3D9B6E]' : 'text-[#D4A017]'}`}>
                    {formatPct(w.achievementPct ?? 0)}
                  </p>
                  <p className="text-xs text-[#A0ABA3]">{formatNaira(w.realisedToday ?? 0)}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0ABA3] shrink-0" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OfficersList() {
  const cos = mockWorkers.filter((w) => w.role === 'CO')
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Collection officers</h1>
      <div className="space-y-3">
        {cos.map((w) => {
          const id = mockIdentities.find((i) => i.id === w.currentIdentityId)
          return (
            <Link
              key={w.id}
              to={`/bm/officers/${w.id}`}
              className="flex items-center gap-4 p-4 rounded-[16px] border border-[#E2E8E2] bg-white hover:border-[#2F3A36]/20 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4EDE0] flex items-center justify-center text-[#2F3A36] font-semibold text-lg shrink-0">
                {id?.fullName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{id?.fullName}</p>
                <p className="text-sm text-[#7D897F] truncate">
                  Expected {formatNaira(w.expectedToday ?? 0)} · Realised {formatNaira(w.realisedToday ?? 0)}
                </p>
              </div>
              <div className={`text-lg font-bold shrink-0 ${(w.achievementPct ?? 0) >= 80 ? 'text-[#3D9B6E]' : 'text-[#D4A017]'}`}>
                {formatPct(w.achievementPct ?? 0)}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function OfficerDetail() {
  const w = mockWorkers.find((x) => x.role === 'CO')!
  const id = mockIdentities.find((i) => i.id === w.currentIdentityId)
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <Link to="/bm/officers" className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6 inline-block">← Back</Link>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">{id?.fullName}</h1>
      <p className="text-[#7D897F] text-sm mb-8">Collection Officer · Full portfolio visibility</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Portfolio size', value: w.portfolioSize },
          { label: 'Expected today', value: formatNaira(w.expectedToday ?? 0) },
          { label: 'Realised today', value: formatNaira(w.realisedToday ?? 0) },
          { label: 'Achievement', value: formatPct(w.achievementPct ?? 0) },
        ].map((c) => (
          <div key={c.label} className="p-4 rounded-[16px] border border-[#E2E8E2] bg-white">
            <p className="text-xs text-[#A0ABA3]">{c.label}</p>
            <p className="text-xl font-semibold mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#7D897F] leading-relaxed">
        BM can inspect groups, customers, loans, schedules and allocations for this CO.
        Inspecting does not transfer ownership.
      </p>
    </div>
  )
}

function GroupsView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Groups & customers</h1>
      <div className="space-y-3">
        {mockGroups.map((g) => (
          <div key={g.id} className="p-5 rounded-[20px] border border-[#E2E8E2] bg-white shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
            <div className="flex items-center justify-between mb-1 gap-2">
              <h3 className="font-semibold truncate">{g.name}</h3>
              <span className="text-xs text-[#A0ABA3] shrink-0">{g.number}</span>
            </div>
            <p className="text-sm text-[#7D897F]">{g.memberCount} members · {g.address}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BMDashboard() {
  const [mode, setMode] = useState<'bm' | 'co'>('bm')

  const nav = mode === 'bm'
    ? [
        { to: '/bm', label: 'Branch dashboard', icon: LayoutDashboard, exact: true },
        { to: '/bm/officers', label: 'Collection officers', icon: Users },
        { to: '/bm/groups', label: 'Groups & customers', icon: UserCircle },
      ]
    : [{ to: '/bm', label: 'My portfolio (CO mode)', icon: LayoutDashboard, exact: true }]

  return (
    <AppShell
      brandTitle="Adaobi Okeke"
      brandSubtitle="Lekki Main · Branch Manager"
      brandAccent="bg-[#3D9B6E]"
      nav={nav}
      footerExtra={
        <button
          type="button"
          onClick={() => setMode(mode === 'bm' ? 'co' : 'bm')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#E2E8E2] text-sm font-medium hover:border-[#2F3A36]/30 transition-colors mb-1"
        >
          <ArrowLeftRight className="w-4 h-4" />
          {mode === 'bm' ? 'Work as CO' : 'Back to BM dashboard'}
        </button>
      }
    >
      {mode === 'co' ? (
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          <div className="mb-6 p-4 rounded-[16px] border border-[#5B8A7A]/30 bg-[#D4EDE0]/40 text-sm">
            You are in <strong>Work as CO</strong> mode. Full Collection Officer workflow for your own portfolio only.
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-4">My CO portfolio</h1>
          <p className="text-[#7D897F] text-sm leading-relaxed">
            Create groups, add members, run loan applications, confirm disbursement and allocate payments for your own portfolio.
          </p>
        </div>
      ) : (
        <Routes>
          <Route index element={<BMOverview />} />
          <Route path="officers" element={<OfficersList />} />
          <Route path="officers/:id" element={<OfficerDetail />} />
          <Route path="groups" element={<GroupsView />} />
        </Routes>
      )}
    </AppShell>
  )
}
