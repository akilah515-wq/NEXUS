import { useState } from 'react'
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react'

const monthlyData = [
  { month: 'Oct', spend: 38000 },
  { month: 'Nov', spend: 42000 },
  { month: 'Dec', spend: 61000 },
  { month: 'Jan', spend: 45000 },
  { month: 'Feb', spend: 39000 },
  { month: 'Mar', spend: 34000 },
]

const categoryData = [
  { name: 'Food', value: 12400, color: '#FBBF24' },
  { name: 'Utilities', value: 8900, color: '#60A5FA' },
  { name: 'Transport', value: 5200, color: '#34D399' },
  { name: 'Telecom', value: 3100, color: '#A78BFA' },
  { name: 'Entertainment', value: 2800, color: '#F87171' },
  { name: 'Other', value: 1600, color: '#9CA3AF' },
]

const totalSpend = categoryData.reduce((sum, c) => sum + c.value, 0)
const maxSpend = Math.max(...monthlyData.map(d => d.spend))

const insights = [
  { icon: TrendingDown, color: 'text-emerald-400', bg: 'bg-emerald-400/10', text: 'You spent 13% less than last month. Great work!' },
  { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', text: 'Food spending is your biggest category — J$12,400 this month.' },
  { icon: TrendingUp, color: 'text-red-400', bg: 'bg-red-400/10', text: 'Predicted next month: J$36,200 — on track to overspend by J$3,100.' },
]

function BarChart() {
  return (
    <div className="flex items-end justify-between gap-2 h-36 px-1">
      {monthlyData.map(({ month, spend }) => {
        const heightPct = (spend / maxSpend) * 100
        const isCurrentMonth = month === 'Mar'
        return (
          <div key={month} className="flex flex-col items-center gap-2 flex-1">
            <span className="text-gray-500 text-xs">
              J${(spend / 1000).toFixed(0)}k
            </span>
            <div className="w-full rounded-t-lg transition-all" style={{
              height: `${heightPct}%`,
              backgroundColor: isCurrentMonth ? '#FBBF24' : '#374151',
              minHeight: 8,
            }} />
            <span className={`text-xs font-medium ${isCurrentMonth ? 'text-yellow-400' : 'text-gray-500'}`}>
              {month}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function DonutChart() {
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const r = 65
  const innerR = 42
  const circumference = 2 * Math.PI * r

  let cumulativeAngle = -90
  const slices = categoryData.map(({ name, value, color }) => {
    const angle = (value / totalSpend) * 360
    const startAngle = cumulativeAngle
    cumulativeAngle += angle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = ((startAngle + angle) * Math.PI) / 180

    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)

    const ix1 = cx + innerR * Math.cos(endRad)
    const iy1 = cy + innerR * Math.sin(endRad)
    const ix2 = cx + innerR * Math.cos(startRad)
    const iy2 = cy + innerR * Math.sin(startRad)

    const largeArc = angle > 180 ? 1 : 0

    const d = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix1} ${iy1}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
      'Z',
    ].join(' ')

    return { d, color, name, value }
  })

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size}>
          {slices.map((slice, i) => (
            <path key={i} d={slice.d} fill={slice.color} stroke="#111827" strokeWidth="2" />
          ))}
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#9CA3AF" fontSize="11">Total</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            J${(totalSpend / 1000).toFixed(0)}k
          </text>
        </svg>
      </div>
    </div>
  )
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="py-4 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Your spending breakdown — March 2026</p>
      </div>

      {/* Tab toggle */}
      <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1">
        {['overview', 'categories'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? 'bg-yellow-400 text-gray-900' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">This Month</p>
              <p className="text-white text-xl font-bold">J${totalSpend.toLocaleString()}</p>
              <p className="text-emerald-400 text-xs mt-1">↓ 13% vs last month</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Predicted Next</p>
              <p className="text-white text-xl font-bold">J$36,200</p>
              <p className="text-red-400 text-xs mt-1">↑ J$3,100 over budget</p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-white font-semibold mb-4">6-Month Spending</p>
            <BarChart />
          </div>

          {/* AI Insights */}
          <div>
            <p className="text-white font-semibold mb-3">💡 AI Insights</p>
            <div className="space-y-2">
              {insights.map(({ icon: Icon, color, bg, text }, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={color} />
                  </div>
                  <p className="text-gray-300 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Donut chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center">
            <p className="text-white font-semibold mb-3 self-start">Spending by Category</p>
            <DonutChart />
          </div>

          {/* Category breakdown list */}
          <div className="space-y-2">
            {categoryData.map(({ name, value, color }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-white text-sm font-medium">{name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-sm font-semibold">J${value.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs ml-2">{Math.round((value / totalSpend) * 100)}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${(value / totalSpend) * 100}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}