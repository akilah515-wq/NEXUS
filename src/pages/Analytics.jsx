import { useState, useEffect } from 'react'
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react'

const categoryColors = {
  food: '#FBBF24',
  utilities: '#60A5FA',
  transport: '#34D399',
  entertainment: '#A78BFA',
  health: '#F87171',
  education: '#FB923C',
  savings: '#34D399',
  income: '#4ADE80',
  other: '#9CA3AF',
}

function BarChart({ data }) {
  const maxSpend = Math.max(...data.map(d => d.total))
  return (
    <div className="flex items-end justify-between gap-2 h-36 px-1">
      {data.map(({ month, total }) => {
        const heightPct = maxSpend > 0 ? (total / maxSpend) * 100 : 0
        const isLast = month === data[data.length - 1]?.month
        return (
          <div key={month} className="flex flex-col items-center gap-2 flex-1">
            <span className="text-gray-500 text-xs">
              J${(total / 1000).toFixed(0)}k
            </span>
            <div className="w-full rounded-t-lg transition-all" style={{
              height: `${heightPct}%`,
              backgroundColor: isLast ? '#FBBF24' : '#374151',
              minHeight: 8,
            }} />
            <span className={`text-xs font-medium ${isLast ? 'text-yellow-400' : 'text-gray-500'}`}>
              {month.slice(5)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function DonutChart({ categories, total }) {
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const r = 65
  const innerR = 42
  let cumulativeAngle = -90

  const slices = categories.map(({ name, amount, percentage }) => {
    const angle = (amount / total) * 360
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
    const d = [`M ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`, `L ${ix1} ${iy1}`, `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`, 'Z'].join(' ')
    return { d, color: categoryColors[name] || '#9CA3AF', name, amount, percentage }
  })

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        {slices.map((slice, i) => (
          <path key={i} d={slice.d} fill={slice.color} stroke="#111827" strokeWidth="2" />
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#9CA3AF" fontSize="11">Total</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          J${(total / 1000).toFixed(0)}k
        </text>
      </svg>
    </div>
  )
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('nexus_token')
    if (!token) {
      // Use mock data if not logged in
      setData({
        totalSpend: 34000,
        momChange: -13,
        categories: [
          { name: 'food', amount: 12400, percentage: 36 },
          { name: 'utilities', amount: 8900, percentage: 26 },
          { name: 'transport', amount: 5200, percentage: 15 },
          { name: 'entertainment', amount: 3100, percentage: 9 },
          { name: 'other', amount: 4400, percentage: 14 },
        ],
        trend: [
          { month: '2025-10', total: 38000 },
          { month: '2025-11', total: 42000 },
          { month: '2025-12', total: 61000 },
          { month: '2026-01', total: 45000 },
          { month: '2026-02', total: 39000 },
          { month: '2026-03', total: 34000 },
        ],
        prediction: { nextMonth: 36200, overspendRisk: 3100 },
      })
      setLoading(false)
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/analytics/spending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!data) return null

  const insights = [
    {
      icon: data.momChange < 0 ? TrendingDown : TrendingUp,
      color: data.momChange < 0 ? 'text-emerald-400' : 'text-red-400',
      bg: data.momChange < 0 ? 'bg-emerald-400/10' : 'bg-red-400/10',
      text: data.momChange < 0
        ? `You spent ${Math.abs(data.momChange)}% less than last month. Great work!`
        : `You spent ${data.momChange}% more than last month. Watch your budget!`,
    },
    {
      icon: AlertCircle,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      text: `${data.categories[0]?.name} spending is your biggest category — J$${data.categories[0]?.amount.toLocaleString()} this month.`,
    },
    {
      icon: TrendingUp,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      text: `Predicted next month: J$${data.prediction.nextMonth.toLocaleString()}${data.prediction.overspendRisk > 0 ? ` — on track to overspend by J$${data.prediction.overspendRisk.toLocaleString()}` : ' — on track!'}.`,
    },
  ]

  return (
    <div className="py-4 space-y-5">
      <div>
        <h1 className="text-white text-2xl font-bold">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Your spending breakdown</p>
      </div>

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
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">This Month</p>
              <p className="text-white text-xl font-bold">J${data.totalSpend.toLocaleString()}</p>
              <p className={`text-xs mt-1 ${data.momChange < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {data.momChange < 0 ? '↓' : '↑'} {Math.abs(data.momChange)}% vs last month
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Predicted Next</p>
              <p className="text-white text-xl font-bold">J${data.prediction.nextMonth.toLocaleString()}</p>
              {data.prediction.overspendRisk > 0 && (
                <p className="text-red-400 text-xs mt-1">↑ J${data.prediction.overspendRisk.toLocaleString()} over budget</p>
              )}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-white font-semibold mb-4">6-Month Spending</p>
            <BarChart data={data.trend} />
          </div>

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
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center">
            <p className="text-white font-semibold mb-3 self-start">Spending by Category</p>
            <DonutChart categories={data.categories} total={data.totalSpend} />
          </div>

          <div className="space-y-2">
            {data.categories.map(({ name, amount, percentage }) => (
              <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[name] || '#9CA3AF' }} />
                    <span className="text-white text-sm font-medium capitalize">{name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-sm font-semibold">J${amount.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs ml-2">{percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${percentage}%`, backgroundColor: categoryColors[name] || '#9CA3AF' }}
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