import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { formatNaira } from '../../data/mock'

export default function DisbursementConfirm() {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setConfirmed(true)
      setLoading(false)
    }, 800)
  }

  if (confirmed) {
    return (
      <div className="p-4 sm:p-8 max-w-lg mx-auto text-center">
        <CheckCircle2 className="w-16 h-16 text-[#3D9B6E] mx-auto mb-4" />
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Loan activated</h1>
        <p className="text-[#7D897F] text-sm leading-relaxed mb-6">
          Disbursement confirmed. The loan is now ACTIVE. Immutable repayment schedule
          has been generated and virtual-account provisioning has started in the background.
        </p>
        <Link
          to="/co"
          className="inline-block px-6 py-3 rounded-full bg-[#2F3A36] text-white font-medium text-sm hover:bg-[#1F2824]"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-lg mx-auto">
      <Link to="/co" className="text-sm text-[#7D897F] hover:text-[#2F3A36] mb-6 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Confirm disbursement</h1>
      <p className="text-[#7D897F] text-sm mb-8 leading-relaxed">
        The company has transferred funds outside Qatavel. Confirm only after the customer has received the money.
      </p>

      <div className="rounded-[20px] border border-[#E2E8E2] bg-white p-5 mb-6 space-y-3 shadow-[0_4px_20px_rgba(47,58,54,0.04)]">
        <div className="flex justify-between text-sm">
          <span className="text-[#A0ABA3]">Customer</span>
          <span className="font-medium">Ngozi Okonkwo</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#A0ABA3]">Loan amount</span>
          <span className="font-medium">{formatNaira(50000)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#A0ABA3]">Mode</span>
          <span className="font-medium">Weekly · 10 periods</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#A0ABA3]">Total repayable</span>
          <span className="font-medium">{formatNaira(55000)}</span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-[16px] bg-[#D4A017]/10 border border-[#D4A017]/25 mb-6">
        <AlertCircle className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
        <p className="text-sm text-[#D4A017] leading-relaxed">
          Confirmation records the date, amount and your identity. The loan becomes ACTIVE immediately.
          Virtual account creation runs asynchronously and will never block activation.
        </p>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="w-full py-3.5 rounded-full bg-[#2F3A36] text-white font-medium disabled:opacity-60 hover:bg-[#1F2824]"
      >
        {loading ? 'Confirming…' : 'Confirm disbursement & activate loan'}
      </button>
    </div>
  )
}
