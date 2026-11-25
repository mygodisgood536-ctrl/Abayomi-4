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
              <stop offset="5%" stopColor="#6DA5C0" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6DA5C0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="real" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F969C" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0F969C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A3A42" />
          <XAxis dataKey="day" stroke="#5A7A82" fontSize={12} tickLine={false} />
          <YAxis stroke="#5A7A82" fontSize={12} tickFormatter={formatK} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: '#0A1F24',
              border: '1px solid #1A3A42',
              borderRadius: 12,
              fontSize: 13,
            }}
            formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="expected"
            name="Expected"
            stroke="#6DA5C0"
            fill="url(#exp)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="realised"
            name="Realised"
            stroke="#0F969C"
            fill="url(#real)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
