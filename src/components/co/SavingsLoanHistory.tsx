/** Daily savings vs loan repayment view as specified in vision */
import { formatNaira } from '../../data/mock'

const rows = [
  { date: '23/3/2026', savings: 500, loan: 10000 },
  { date: '24/3/2026', savings: 600, loan: 20000 },
  { date: '25/3/2026', savings: 0, loan: 10000 },
  { date: '26/3/2026', savings: 0, loan: 0 },
  { date: '27/3/2026', savings: 1200, loan: 5500 },
]

export function SavingsLoanHistory() {
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-4 min-w-full pb-2">
        {rows.map((r) => (
          <div
            key={r.date}
            className="shrink-0 w-36 p-3 rounded-xl border border-[#1A3A42] bg-[#05161A]"
          >
            <p className="text-xs text-[#5A7A82] mb-2 font-medium">{r.date}</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8BA8B0]">Savings</span>
                <span className="font-medium">{r.savings === 0 ? '0' : formatNaira(r.savings)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8BA8B0]">L. repay</span>
                <span className="font-medium">{r.loan === 0 ? '0' : formatNaira(r.loan)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#5A7A82] mt-2">Scroll horizontally for more days · 0 shown when nothing allocated</p>
    </div>
  )
}
