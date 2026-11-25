import { useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Wallet,
  Bell,
  LogOut,
  Plus,
  ChevronRight,
  Camera,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import DisbursementConfirm from "./DisbursementConfirm"
import {
  mockGroups,
  mockCustomers,
  mockLoans,
  mockReceipts,
  mockNotifications,
  formatNaira,
  formatPct,
} from '../../data/mock'

function COSidebar() {
  const location = useLocation()
  const items = [
    { to: '/co', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/co/groups', label: 'Groups', icon: Users },
    { to: '/co/customers', label: 'Customers', icon: UserPlus },
    { to: '/co/applications', label: 'Loan Applications', icon: FileText },
    { to: '/co/allocations', label: 'Allocations', icon: Wallet },
    { to: '/co/notifications', label: 'Notifications', icon: Bell },
  ]
  return (
    <aside className="w-64 shrink-0 border-r border-[#1A3A42] bg-[#05161A] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-[#1A3A42]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center font-bold text-xs text-[#F59E0B]">CO</div>
          <div>
            <div className="font-semibold text-sm">Chinedu Eze</div>
            <div className="text-[10px] text-[#5A7A82]">Lekki Main · Collection Officer</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)
          return (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'text-[#8BA8B0] hover:bg-[#0A1F24] hover:text-[#E8F4F5]'
              }`}>
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
              {item.to === '/co/allocations' && mockReceipts.length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-[#EF4444] text-[10px] flex items-center justify-center text-white">{mockReceipts.length}</span>
              )}
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

function COOverview() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-1">My Portfolio</h1>
      <p className="text-[#8BA8B0] text-sm mb-6">Today’s expected vs realised and open work</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Expected', value: formatNaira(185000) },
          { label: 'Realised', value: formatNaira(162000) },
          { label: 'Achievement', value: '87.6%' },
          { label: 'Pending allocations', value: mockReceipts.length },
        ].map(c => (
          <div key={c.label} className="p-4 rounded-2xl border border-[#1A3A42] bg-[#0A1F24]">
            <p className="text-xs text-[#8BA8B0] mb-1">{c.label}</p>
            <p className="text-xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Awaiting allocation</h2>
            <Link to="/co/allocations" className="text-sm text-[#0F969C]">View all</Link>
          </div>
          {mockReceipts.length === 0 ? (
            <p className="text-sm text-[#5A7A82]">No payments waiting</p>
          ) : (
            <div className="space-y-3">
              {mockReceipts.map(r => {
                const cus = mockCustomers.find(c => c.id === r.customerId)
                return (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-[#05161A]">
                    <div>
                      <p className="font-medium text-sm">{cus?.fullName}</p>
                      <p className="text-xs text-[#5A7A82]">{new Date(r.receivedAt).toLocaleTimeString()}</p>
                    </div>
                    <p className="font-semibold text-[#0F969C]">{formatNaira(r.amount)}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-5">
          <h2 className="font-semibold mb-4">Quick actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/co/groups" className="p-4 rounded-xl border border-[#1A3A42] hover:border-[#0F969C]/40 text-center text-sm">
              <Users className="w-5 h-5 mx-auto mb-2 text-[#0F969C]" />
              Groups
            </Link>
            <Link to="/co/customers" className="p-4 rounded-xl border border-[#1A3A42] hover:border-[#0F969C]/40 text-center text-sm">
              <UserPlus className="w-5 h-5 mx-auto mb-2 text-[#0F969C]" />
              Customers
            </Link>
            <Link to="/co/applications/new" className="p-4 rounded-xl border border-[#1A3A42] hover:border-[#0F969C]/40 text-center text-sm">
              <FileText className="w-5 h-5 mx-auto mb-2 text-[#0F969C]" />
              New loan
            </Link>
            <Link to="/co/allocations" className="p-4 rounded-xl border border-[#1A3A42] hover:border-[#0F969C]/40 text-center text-sm">
              <Wallet className="w-5 h-5 mx-auto mb-2 text-[#0F969C]" />
              Allocate
            </Link>
            <Link to="/co/disbursement" className="p-4 rounded-xl border border-[#1A3A42] hover:border-[#0F969C]/40 text-center text-sm">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-[#0F969C]" />
              Confirm disbursement
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function GroupsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Groups</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm">
          <Plus className="w-4 h-4" /> New group
        </button>
      </div>
      <div className="space-y-3">
        {mockGroups.map(g => (
          <div key={g.id} className="p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{g.name}</h3>
                <p className="text-sm text-[#8BA8B0]">{g.number} · {g.memberCount} members</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5A7A82]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomersPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <div className="space-y-3">
        {mockCustomers.map(c => (
          <Link key={c.id} to={`/co/customers/${c.id}`}
            className="flex items-center gap-4 p-4 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/40 transition-all">
            <div className="w-11 h-11 rounded-full bg-[#0F969C]/20 flex items-center justify-center text-[#0F969C] font-semibold">
              {c.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{c.fullName}</p>
              <p className="text-xs text-[#5A7A82]">{c.phone}</p>
            </div>
            <div className="text-right">
              {c.hasActiveLoan && <span className="text-xs px-2 py-0.5 rounded-full bg-[#0F969C]/15 text-[#0F969C]">Active loan</span>}
              <p className="text-xs text-[#5A7A82] mt-1">Savings {formatNaira(c.savingsBalance)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function CustomerDetail() {
  const c = mockCustomers[0]
  const loan = mockLoans.find(l => l.customerId === c.id)
  return (
    <div className="p-6 md:p-8">
      <Link to="/co/customers" className="text-sm text-[#8BA8B0] hover:text-[#0F969C] mb-6 inline-block">← Customers</Link>
      <h1 className="text-2xl font-bold mb-1">{c.fullName}</h1>
      <p className="text-[#8BA8B0] text-sm mb-6">{c.phone}</p>

      {c.virtualAccount && (
        <div className="p-4 rounded-xl border border-[#1A3A42] bg-[#0A1F24] mb-6">
          <p className="text-xs text-[#5A7A82] mb-1">Virtual account</p>
          <p className="font-mono text-lg">{c.virtualAccount.accountNumber}</p>
          <p className="text-sm text-[#8BA8B0]">{c.virtualAccount.bankName} · {c.virtualAccount.accountName}</p>
        </div>
      )}

      {loan && (
        <div className="p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Active loan</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981]">{loan.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-[#5A7A82] text-xs">Principal</p><p className="font-medium">{formatNaira(loan.principal)}</p></div>
            <div><p className="text-[#5A7A82] text-xs">Outstanding</p><p className="font-medium">{formatNaira(loan.outstanding)}</p></div>
            <div><p className="text-[#5A7A82] text-xs">Mode</p><p className="font-medium">{loan.repaymentMode}</p></div>
            <div><p className="text-[#5A7A82] text-xs">Per period</p><p className="font-medium">{formatNaira(loan.amountPerPeriod)}</p></div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="font-semibold mb-3">Daily savings & loan repayments</h2>
        <SavingsLoanHistory />
      </div>

      <div className="flex gap-3">
        <Link to="/co/applications/new" className="flex-1 py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm text-center">
          New loan application
        </Link>
      </div>
    </div>
  )
}

function AllocationsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [loanAlloc, setLoanAlloc] = useState('')
  const [savingsAlloc, setSavingsAlloc] = useState('')
  const [posted, setPosted] = useState<string[]>([])

  const receipt = mockReceipts.find(r => r.id === selected)
  const customer = receipt ? mockCustomers.find(c => c.id === receipt.customerId) : null
  const loan = customer ? mockLoans.find(l => l.customerId === customer.id) : null

  const amount = receipt?.amount ?? 0
  const loanVal = Number(loanAlloc) || 0
  const savVal = Number(savingsAlloc) || 0
  const tally = loanVal + savVal === amount && amount > 0
  const overLoan = loan && loanVal > loan.outstanding

  const post = () => {
    if (!selected || !tally || overLoan) return
    setPosted(p => [...p, selected])
    setSelected(null)
    setLoanAlloc('')
    setSavingsAlloc('')
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Payment Allocations</h1>
      <p className="text-sm text-[#8BA8B0] mb-6">
        Loan Allocation + Savings Allocation must equal the exact receipt amount. Manual cash is prohibited.
      </p>

      <div className="space-y-3">
        {mockReceipts.filter(r => !posted.includes(r.id)).map(r => {
          const cus = mockCustomers.find(c => c.id === r.customerId)
          return (
            <button key={r.id} onClick={() => setSelected(r.id)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/40 text-left transition-all">
              <div>
                <p className="font-medium">{cus?.fullName}</p>
                <p className="text-xs text-[#5A7A82]">{r.providerTransactionRef}</p>
              </div>
              <p className="font-semibold text-[#0F969C]">{formatNaira(r.amount)}</p>
            </button>
          )
        })}
        {mockReceipts.filter(r => !posted.includes(r.id)).length === 0 && (
          <div className="p-12 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] text-center text-[#5A7A82]">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#10B981]" />
            All payments allocated
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && receipt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Allocate payment</h2>
                <button onClick={() => setSelected(null)}><X className="w-5 h-5" /></button>
              </div>
              <p className="text-sm text-[#8BA8B0] mb-1">{customer?.fullName}</p>
              <p className="text-2xl font-bold mb-6">{formatNaira(amount)}</p>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-xs text-[#8BA8B0]">Loan allocation</label>
                  <input type="number" value={loanAlloc} onChange={e => setLoanAlloc(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm focus:outline-none focus:border-[#0F969C]"
                    placeholder="0" />
                  {loan && <p className="text-xs text-[#5A7A82] mt-1">Outstanding: {formatNaira(loan.outstanding)}</p>}
                  {overLoan && <p className="text-xs text-[#EF4444] mt-1">Cannot exceed outstanding balance</p>}
                </div>
                <div>
                  <label className="text-xs text-[#8BA8B0]">Savings allocation</label>
                  <input type="number" value={savingsAlloc} onChange={e => setSavingsAlloc(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm focus:outline-none focus:border-[#0F969C]"
                    placeholder="0" />
                </div>
              </div>

              <div className={`p-3 rounded-xl text-sm mb-4 ${tally ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                {tally ? 'Amounts tally' : `Difference: ${formatNaira(amount - loanVal - savVal)}`}
              </div>

              <button onClick={post} disabled={!tally || !!overLoan}
                className="w-full py-3 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm disabled:opacity-40">
                Post allocation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LoanApplicationWizard() {
  const [stage, setStage] = useState(1)
  const totalStages = 12
  const stageNames = [
    'Basic application',
    'Additional customer info',
    'Guarantor information',
    'Customer live face',
    'Guarantor live face',
    'Customer house',
    'Guarantor house',
    'Customer business',
    'Guarantor business',
    'Loan form capture',
    'Repayment terms',
    'Preview & submit',
  ]

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <Link to="/co" className="text-sm text-[#8BA8B0] hover:text-[#0F969C] mb-6 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold mb-2">Loan Application</h1>
      <p className="text-sm text-[#8BA8B0] mb-6">Stage {stage} of {totalStages}: {stageNames[stage - 1]}</p>

      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: totalStages }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < stage ? 'bg-[#0F969C]' : 'bg-[#1A3A42]'}`} />
        ))}
      </div>

      <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6 mb-6">
        {stage === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#8BA8B0]">Repayment mode</label>
              <div className="flex gap-3 mt-1">
                <button className="flex-1 py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-medium text-sm">Weekly</button>
                <button className="flex-1 py-2.5 rounded-xl border border-[#1A3A42] text-sm">Daily</button>
              </div>
            </div>
            <div>
              <label className="text-sm text-[#8BA8B0]">Requested amount (₦)</label>
              <input type="number" defaultValue={50000} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
            </div>
            <div>
              <label className="text-sm text-[#8BA8B0]">Purpose</label>
              <input defaultValue="Business expansion" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
            </div>
          </div>
        )}

        {stage === 4 && (
          <div className="text-center py-8">
            <div className="w-48 h-48 mx-auto rounded-2xl border-2 border-dashed border-[#0F969C]/50 bg-[#0F969C]/5 flex flex-col items-center justify-center mb-4">
              <Camera className="w-10 h-10 text-[#0F969C] mb-2" />
              <p className="text-sm text-[#8BA8B0]">Live face capture</p>
              <p className="text-xs text-[#5A7A82] mt-1">Device camera only · No uploads</p>
            </div>
            <p className="text-xs text-[#5A7A82]">Quality checks: brightness, sharpness, face confidence, liveness</p>
          </div>
        )}

        {stage === 11 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-[#8BA8B0]">Loan amount</label>
                <input type="number" defaultValue={50000} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#8BA8B0]">Interest %</label>
                <input type="number" defaultValue={10} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#8BA8B0]">Amount per week</label>
                <input type="number" defaultValue={5500} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#8BA8B0]">Period (weeks)</label>
                <input type="number" defaultValue={10} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#05161A] border border-[#1A3A42] text-sm" />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#10B981]/10 text-[#10B981] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Amounts tally (₦55,000)
            </div>
          </div>
        )}

        {stage === 12 && (
          <div className="space-y-3 text-sm">
            <p><span className="text-[#5A7A82]">Customer:</span> Ngozi Okonkwo</p>
            <p><span className="text-[#5A7A82]">Amount:</span> ₦50,000 · Weekly · 10 weeks</p>
            <p><span className="text-[#5A7A82]">Total repayable:</span> ₦55,000</p>
            <p className="text-[#8BA8B0] mt-4">Submitting does not disburse funds. After external disbursement, confirm inside Qatavel to activate the loan.</p>
          </div>
        )}

        {![1, 4, 11, 12].includes(stage) && (
          <p className="text-[#8BA8B0] text-sm py-8 text-center">
            Stage {stage}: {stageNames[stage - 1]} — form fields and capture UI (mock)
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button disabled={stage === 1} onClick={() => setStage(s => s - 1)}
          className="px-5 py-2.5 rounded-xl border border-[#1A3A42] text-sm disabled:opacity-40">
          Back
        </button>
        <button onClick={() => stage < 12 ? setStage(s => s + 1) : alert('Application submitted (mock)')}
          className="flex-1 py-2.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold text-sm">
          {stage === 12 ? 'Submit application' : 'Save & Next'}
        </button>
      </div>
    </div>
  )
}

function NotificationsPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-3">
        {mockNotifications.filter(n => n.recipientWorkerId === 'w_co1').map(n => (
          <div key={n.id} className={`p-4 rounded-2xl border ${n.read ? 'border-[#1A3A42] bg-[#0A1F24]' : 'border-[#0F969C]/30 bg-[#0F969C]/5'}`}>
            <p className="font-medium text-sm">{n.title}</p>
            <p className="text-sm text-[#8BA8B0] mt-0.5">{n.body}</p>
            <p className="text-xs text-[#5A7A82] mt-2">{new Date(n.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CODashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--q-deep)] text-[var(--q-text)]">
      <COSidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<COOverview />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="applications" element={<div className="p-8"><h1 className="text-2xl font-bold">Applications</h1><Link to="/co/applications/new" className="text-[#0F969C] text-sm mt-4 inline-block">Start new application →</Link></div>} />
          <Route path="applications/new" element={<LoanApplicationWizard />} />
          <Route path="disbursement" element={<DisbursementConfirm />} />
          <Route path="allocations" element={<AllocationsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Routes>
      </main>
    </div>
  )
}
