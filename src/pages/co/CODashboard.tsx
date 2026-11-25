import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Wallet,
  Bell,
  Plus,
  ChevronRight,
  Camera,
  CheckCircle2,
  X,
} from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import DisbursementConfirm from './DisbursementConfirm'
import { SavingsLoanHistory } from '../../components/co/SavingsLoanHistory'
import {
  mockGroups,
  mockCustomers,
  mockLoans,
  mockReceipts,
  mockNotifications,
  formatNaira,
} from '../../data/mock'

function COOverview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">My portfolio</h1>
      <p className="text-[#7D897F] text-sm mb-6">Today’s expected vs realised and open work</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Expected', value: formatNaira(185000) },
          { label: 'Realised', value: formatNaira(162000) },
          { label: 'Achievement', value: '87.6%' },
          { label: 'Pending allocations', value: mockReceipts.length },
        ].map((c) => (
          <div key={c.label} className="p-4 rounded-[16px] border border-[#E2E8E2] bg-white shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
            <p className="text-xs text-[#7D897F] mb-1">{c.label}</p>
            <p className="text-lg sm:text-xl font-semibold tracking-tight">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Awaiting allocation</h2>
            <Link to="/co/allocations" className="text-sm text-[#2F3A36] font-medium">View all</Link>
          </div>
          {mockReceipts.length === 0 ? (
            <p className="text-sm text-[#A0ABA3]">No payments waiting</p>
          ) : (
            <div className="space-y-2">
              {mockReceipts.map((r) => {
                const cus = mockCustomers.find((c) => c.id === r.customerId)
                return (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9F6]">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{cus?.fullName}</p>
                      <p className="text-xs text-[#A0ABA3]">{new Date(r.receivedAt).toLocaleTimeString()}</p>
                    </div>
                    <p className="font-semibold text-[#2F3A36] text-sm shrink-0">{formatNaira(r.amount)}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
          <h2 className="font-semibold mb-4">Quick actions</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { to: '/co/groups', icon: Users, label: 'Groups' },
              { to: '/co/customers', icon: UserPlus, label: 'Customers' },
              { to: '/co/applications/new', icon: FileText, label: 'New loan' },
              { to: '/co/allocations', icon: Wallet, label: 'Allocate' },
              { to: '/co/disbursement', icon: CheckCircle2, label: 'Confirm disbursement' },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="p-3 sm:p-4 rounded-xl border border-[#E2E8E2] hover:border-[#2F3A36]/25 text-center text-xs sm:text-sm font-medium transition-colors"
              >
                <a.icon className="w-5 h-5 mx-auto mb-1.5 text-[#2F3A36]" />
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GroupsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
        <button type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2F3A36] text-white text-sm font-medium">
          <Plus className="w-4 h-4" /> New group
        </button>
      </div>
      <div className="space-y-3">
        {mockGroups.map((g) => (
          <div key={g.id} className="p-4 sm:p-5 rounded-[16px] border border-[#E2E8E2] bg-white">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{g.name}</h3>
                <p className="text-sm text-[#7D897F]">{g.number} · {g.memberCount} members</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0ABA3] shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Customers</h1>
      <div className="space-y-3">
        {mockCustomers.map((c) => (
          <Link
            key={c.id}
            to={`/co/customers/${c.id}`}
            className="flex items-center gap-3 sm:gap-4 p-4 rounded-[16px] border border-[#E2E8E2] bg-white hover:border-[#2F3A36]/20 transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-[#F3E4D4] flex items-center justify-center text-[#2F3A36] font-semibold shrink-0">
              {c.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{c.fullName}</p>
              <p className="text-xs text-[#A0ABA3]">{c.phone}</p>
            </div>
            <div className="text-right shrink-0">
              {c.hasActiveLoan && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2F3A36]/8 text-[#2F3A36] font-medium">Active loan</span>
              )}
              <p className="text-xs text-[#A0ABA3] mt-1">Savings {formatNaira(c.savingsBalance)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function CustomerDetail() {
  const c = mockCustomers[0]
  const loan = mockLoans.find((l) => l.customerId === c.id)
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <Link to="/co/customers" className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6 inline-block">← Customers</Link>
      <h1 className="text-2xl font-semibold tracking-tight mb-1">{c.fullName}</h1>
      <p className="text-[#7D897F] text-sm mb-6">{c.phone}</p>

      {c.virtualAccount && (
        <div className="p-4 rounded-[16px] border border-[#E2E8E2] bg-white mb-6">
          <p className="text-xs text-[#A0ABA3] mb-1">Virtual account</p>
          <p className="font-mono text-lg tracking-tight">{c.virtualAccount.accountNumber}</p>
          <p className="text-sm text-[#7D897F]">{c.virtualAccount.bankName} · {c.virtualAccount.accountName}</p>
        </div>
      )}

      {loan && (
        <div className="p-5 rounded-[20px] border border-[#E2E8E2] bg-white mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Active loan</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#3D9B6E]/12 text-[#3D9B6E] font-medium">{loan.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-[#A0ABA3] text-xs">Principal</p><p className="font-medium">{formatNaira(loan.principal)}</p></div>
            <div><p className="text-[#A0ABA3] text-xs">Outstanding</p><p className="font-medium">{formatNaira(loan.outstanding)}</p></div>
            <div><p className="text-[#A0ABA3] text-xs">Mode</p><p className="font-medium">{loan.repaymentMode}</p></div>
            <div><p className="text-[#A0ABA3] text-xs">Per period</p><p className="font-medium">{formatNaira(loan.amountPerPeriod)}</p></div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="font-semibold mb-3">Daily savings & loan repayments</h2>
        <SavingsLoanHistory />
      </div>

      <Link
        to="/co/applications/new"
        className="block w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm text-center hover:bg-[#1F2824]"
      >
        New loan application
      </Link>
    </div>
  )
}

function AllocationsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [loanAlloc, setLoanAlloc] = useState('')
  const [savingsAlloc, setSavingsAlloc] = useState('')
  const [posted, setPosted] = useState<string[]>([])

  const receipt = mockReceipts.find((r) => r.id === selected)
  const customer = receipt ? mockCustomers.find((c) => c.id === receipt.customerId) : null
  const loan = customer ? mockLoans.find((l) => l.customerId === customer.id) : null

  const amount = receipt?.amount ?? 0
  const loanVal = Number(loanAlloc) || 0
  const savVal = Number(savingsAlloc) || 0
  const tally = loanVal + savVal === amount && amount > 0
  const overLoan = loan && loanVal > loan.outstanding

  const post = () => {
    if (!selected || !tally || overLoan) return
    setPosted((p) => [...p, selected])
    setSelected(null)
    setLoanAlloc('')
    setSavingsAlloc('')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Payment allocations</h1>
      <p className="text-sm text-[#7D897F] mb-6">
        Loan allocation + savings allocation must equal the exact receipt amount. Manual cash is prohibited.
      </p>

      <div className="space-y-3">
        {mockReceipts.filter((r) => !posted.includes(r.id)).map((r) => {
          const cus = mockCustomers.find((c) => c.id === r.customerId)
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelected(r.id)}
              className="w-full flex items-center justify-between p-4 rounded-[16px] border border-[#E2E8E2] bg-white hover:border-[#2F3A36]/25 text-left transition-all"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{cus?.fullName}</p>
                <p className="text-xs text-[#A0ABA3] truncate">{r.providerTransactionRef}</p>
              </div>
              <p className="font-semibold text-[#2F3A36] shrink-0">{formatNaira(r.amount)}</p>
            </button>
          )
        })}
        {mockReceipts.filter((r) => !posted.includes(r.id)).length === 0 && (
          <div className="p-12 rounded-[20px] border border-[#E2E8E2] bg-white text-center text-[#A0ABA3] text-sm">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#3D9B6E]" />
            All payments allocated
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && receipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2F3A36]/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md rounded-t-[24px] sm:rounded-[24px] border border-[#E2E8E2] bg-white p-6 shadow-xl"
            >
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Allocate payment</h2>
                <button type="button" onClick={() => setSelected(null)}><X className="w-5 h-5" /></button>
              </div>
              <p className="text-sm text-[#7D897F] mb-1">{customer?.fullName}</p>
              <p className="text-2xl font-semibold mb-6">{formatNaira(amount)}</p>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-xs text-[#7D897F]">Loan allocation</label>
                  <input
                    type="number"
                    value={loanAlloc}
                    onChange={(e) => setLoanAlloc(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30"
                    placeholder="0"
                  />
                  {loan && <p className="text-xs text-[#A0ABA3] mt-1">Outstanding: {formatNaira(loan.outstanding)}</p>}
                  {overLoan && <p className="text-xs text-[#C45C5C] mt-1">Cannot exceed outstanding balance</p>}
                </div>
                <div>
                  <label className="text-xs text-[#7D897F]">Savings allocation</label>
                  <input
                    type="number"
                    value={savingsAlloc}
                    onChange={(e) => setSavingsAlloc(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm focus:outline-none focus:border-[#2F3A36]/30"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className={`p-3 rounded-xl text-sm mb-4 ${tally ? 'bg-[#3D9B6E]/10 text-[#3D9B6E]' : 'bg-[#D4A017]/10 text-[#D4A017]'}`}>
                {tally ? 'Amounts tally' : `Difference: ${formatNaira(amount - loanVal - savVal)}`}
              </div>

              <button
                type="button"
                onClick={post}
                disabled={!tally || !!overLoan}
                className="w-full py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm disabled:opacity-40"
              >
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-xl mx-auto">
      <Link to="/co" className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Loan application</h1>
      <p className="text-sm text-[#7D897F] mb-6">Stage {stage} of {totalStages}: {stageNames[stage - 1]}</p>

      <div className="flex gap-1 mb-8">
        {Array.from({ length: totalStages }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < stage ? 'bg-[#2F3A36]' : 'bg-[#E2E8E2]'}`} />
        ))}
      </div>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-5 sm:p-6 mb-6 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        {stage === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#7D897F]">Repayment mode</label>
              <div className="flex gap-2 mt-1.5">
                <button type="button" className="flex-1 py-2.5 rounded-full bg-[#2F3A36] text-white font-medium text-sm">Weekly</button>
                <button type="button" className="flex-1 py-2.5 rounded-full border border-[#E2E8E2] text-sm font-medium">Daily</button>
              </div>
            </div>
            <div>
              <label className="text-sm text-[#7D897F]">Requested amount (₦)</label>
              <input type="number" defaultValue={50000} className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
            </div>
            <div>
              <label className="text-sm text-[#7D897F]">Purpose</label>
              <input defaultValue="Business expansion" className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
            </div>
          </div>
        )}

        {stage === 4 && (
          <div className="text-center py-6">
            <div className="w-40 h-40 mx-auto rounded-2xl border-2 border-dashed border-[#2F3A36]/30 bg-[#F7F9F6] flex flex-col items-center justify-center mb-4">
              <Camera className="w-10 h-10 text-[#2F3A36] mb-2" />
              <p className="text-sm text-[#7D897F]">Live face capture</p>
              <p className="text-xs text-[#A0ABA3] mt-1">Device camera only · No uploads</p>
            </div>
            <p className="text-xs text-[#A0ABA3]">Quality checks: brightness, sharpness, face confidence, liveness</p>
          </div>
        )}

        {stage === 11 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-[#7D897F]">Loan amount</label>
                <input type="number" defaultValue={50000} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#7D897F]">Interest %</label>
                <input type="number" defaultValue={10} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#7D897F]">Amount per week</label>
                <input type="number" defaultValue={5500} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
              </div>
              <div>
                <label className="text-sm text-[#7D897F]">Period (weeks)</label>
                <input type="number" defaultValue={10} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#F7F9F6] border border-[#E2E8E2] text-sm" />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#3D9B6E]/10 text-[#3D9B6E] text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Amounts tally (₦55,000)
            </div>
          </div>
        )}

        {stage === 12 && (
          <div className="space-y-2 text-sm">
            <p><span className="text-[#A0ABA3]">Customer:</span> Ngozi Okonkwo</p>
            <p><span className="text-[#A0ABA3]">Amount:</span> ₦50,000 · Weekly · 10 weeks</p>
            <p><span className="text-[#A0ABA3]">Total repayable:</span> ₦55,000</p>
            <p className="text-[#7D897F] mt-4 text-sm leading-relaxed">
              Submitting does not disburse funds. After external disbursement, confirm inside Qatavel to activate the loan.
            </p>
          </div>
        )}

        {![1, 4, 11, 12].includes(stage) && (
          <p className="text-[#7D897F] text-sm py-8 text-center">
            Stage {stage}: {stageNames[stage - 1]} — form fields and capture UI (mock)
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={stage === 1}
          onClick={() => setStage((s) => s - 1)}
          className="px-5 py-2.5 rounded-full border border-[#E2E8E2] text-sm font-medium disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => (stage < 12 ? setStage((s) => s + 1) : alert('Application submitted (mock)'))}
          className="flex-1 py-2.5 rounded-full bg-[#2F3A36] text-white font-medium text-sm"
        >
          {stage === 12 ? 'Submit application' : 'Save & Next'}
        </button>
      </div>
    </div>
  )
}

function NotificationsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Notifications</h1>
      <div className="space-y-3">
        {mockNotifications
          .filter((n) => n.recipientWorkerId === 'w_co1')
          .map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-[16px] border ${
                n.read ? 'border-[#E2E8E2] bg-white' : 'border-[#2F3A36]/15 bg-[#2F3A36]/3'
              }`}
            >
              <p className="font-medium text-sm">{n.title}</p>
              <p className="text-sm text-[#7D897F] mt-0.5">{n.body}</p>
              <p className="text-xs text-[#A0ABA3] mt-2">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default function CODashboard() {
  const nav = [
    { to: '/co', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/co/groups', label: 'Groups', icon: Users },
    { to: '/co/customers', label: 'Customers', icon: UserPlus },
    { to: '/co/applications', label: 'Loan applications', icon: FileText },
    { to: '/co/allocations', label: 'Allocations', icon: Wallet, badge: mockReceipts.length },
    { to: '/co/notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <AppShell
      brandTitle="Chinedu Eze"
      brandSubtitle="Lekki Main · Collection Officer"
      brandAccent="bg-[#D4A017]"
      nav={nav}
    >
      <Routes>
        <Route index element={<COOverview />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route
          path="applications"
          element={
            <div className="p-4 sm:p-8">
              <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
              <Link to="/co/applications/new" className="text-[#2F3A36] text-sm mt-4 inline-block font-medium">
                Start new application →
              </Link>
            </div>
          }
        />
        <Route path="applications/new" element={<LoanApplicationWizard />} />
        <Route path="disbursement" element={<DisbursementConfirm />} />
        <Route path="allocations" element={<AllocationsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Routes>
    </AppShell>
  )
}
