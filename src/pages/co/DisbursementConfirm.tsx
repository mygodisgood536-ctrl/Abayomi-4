import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { formatNaira } from '../../data/mock'

/** CO confirms external disbursement → loan becomes ACTIVE immediately */
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
      <div className="p-6 md:p-8 max-w-lg mx-auto text-center">
        <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Loan activated</h1>
        <p className="text-[#8BA8B0] mb-6">
          Disbursement confirmed. The loan is now ACTIVE. Immutable repayment schedule
          has been generated and virtual-account provisioning has started in the background.
        </p>
        <Link to="/co" className="inline-block px-6 py-3 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold">
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-lg mx-auto">
      <Link to="/co" className="text-sm text-[#8BA8B0] hover:text-[#0F969C] mb-6 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold mb-2">Confirm disbursement</h1>
      <p className="text-[#8BA8B0] text-sm mb-8">
        The company has transferred funds outside Qatavel. Confirm only after the customer has received the money.
      </p>

      <div className="rounded-2xl border border-[#1A3A42] bg-[#0A1F24] p-6 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#5A7A82]">Customer</span>
          <span className="font-medium">Ngozi Okonkwo</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#5A7A82]">Loan amount</span>
          <span className="font-medium">{formatNaira(50000)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#5A7A82]">Mode</span>
          <span className="font-medium">Weekly · 10 periods</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#5A7A82]">Total repayable</span>
          <span className="font-medium">{formatNaira(55000)}</span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 mb-6">
        <AlertCircle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
        <p className="text-sm text-[#F59E0B]">
          Confirmation records the date, amount and your identity. The loan becomes ACTIVE immediately.
          Virtual account creation runs asynchronously and will never block activation.
        </p>
      </div>

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold disabled:opacity-60"
      >
        {loading ? 'Confirming…' : 'Confirm disbursement & activate loan'}
      </button>
    </div>
  )
}
