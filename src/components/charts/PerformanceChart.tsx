import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  { day: 'Mon', expected: 720000, realised: 680000 },
  { day: 'Tue', expected: 810000, realised: 790000 },
  { day: 'Wed', expected: 695000, realised: 640000 },
  { day: 'Thu', expected: 880000, realised: 910000 },
  { day: 'Fri', expected: 845000, realised: 712500 },
  { day: 'Sat', expected: 420000, realised: 398000 },
  { day: 'Sun', expected: 180000, realised: 165000 },
]

const formatK = (v: number) => `₦${(v / 1000).toFixed(0)}k`

export function PerformanceChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7D897F" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#7D897F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="real" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5B8A7A" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5B8A7A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E2" />
          <XAxis dataKey="day" stroke="#A0ABA3" fontSize={12} tickLine={false} />
          <YAxis stroke="#A0ABA3" fontSize={12} tickFormatter={formatK} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E2E8E2',
              borderRadius: 12,
              fontSize: 13,
              boxShadow: '0 4px 16px rgba(47,58,54,0.08)',
            }}
            formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="expected"
            name="Expected"
            stroke="#7D897F"
            fill="url(#exp)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="realised"
            name="Realised"
            stroke="#5B8A7A"
            fill="url(#real)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
