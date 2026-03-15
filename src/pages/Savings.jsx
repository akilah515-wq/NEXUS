import { useState } from 'react'
import { PiggyBank, TrendingUp, Zap, Target } from 'lucide-react'

const recentRoundUps = [
  { merchant: 'Hi-Lo Food Store', spent: 1340, roundUp: 60, date: 'Today' },
  { merchant: 'JPS Bill Payment', spent: 4500, roundUp: 500, date: 'Today' },
  { merchant: 'Tastee Patties', spent: 650, roundUp: 350, date: 'Yesterday' },
  { merchant: 'Digicel Top-Up', spent: 500, roundUp: 500, date: 'Yesterday' },
  { merchant: 'Shoprite', spent: 2780, roundUp: 220, date: 'Mar 12' },
]

const plans = [
  { id: 1, name: 'JN EasyAccount', return: '4.5%', risk: 'Low', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 2, name: 'NCB Unit Trust', return: '7.2%', risk: 'Medium', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 3, name: 'JSE Index Fund', return: '12.1%', risk: 'High', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
]

export default function Savings() {
  const [roundUpEnabled, setRoundUpEnabled] = useState(true)
  const [roundUpAmount, setRoundUpAmount] = useState(100)
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [autoInvest, setAutoInvest] = useState(false)

  const totalSaved = recentRoundUps.reduce((sum, t) => sum + t.roundUp, 0)
  const projectedMonthly = totalSaved * 4
  const projectedYearly = projectedMonthly * 12

  return (
    <div className="py-4 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Smart Savings</h1>
        <p className="text-gray-400 text-sm mt-1">Round-up every transaction automatically</p>
      </div>

      {/* Main savings jar card */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-emerald-100 text-sm">Total Saved This Month</p>
            <p className="text-4xl font-bold mt-1">J${totalSaved.toLocaleString()}</p>
          </div>
          <PiggyBank size={48} className="opacity-30" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-emerald-100 text-xs">Projected Monthly</p>
            <p className="text-white font-bold text-lg">J${projectedMonthly.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-emerald-100 text-xs">Projected Yearly</p>
            <p className="text-white font-bold text-lg">J${projectedYearly.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Round-up toggle */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-400/10 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Round-Up Savings</p>
              <p className="text-gray-500 text-xs">Auto-save spare change</p>
            </div>
          </div>
          <button
            onClick={() => setRoundUpEnabled(!roundUpEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              roundUpEnabled ? 'bg-emerald-500' : 'bg-gray-700'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              roundUpEnabled ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Round-up amount selector */}
        <p className="text-gray-400 text-xs mb-2">Round up to nearest:</p>
        <div className="flex gap-2">
          {[50, 100, 500].map(amount => (
            <button
              key={amount}
              onClick={() => setRoundUpAmount(amount)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                roundUpAmount === amount
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              J${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-invest toggle */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400/10 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Auto-Invest Savings</p>
              <p className="text-gray-500 text-xs">Monthly into selected plan</p>
            </div>
          </div>
          <button
            onClick={() => setAutoInvest(!autoInvest)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              autoInvest ? 'bg-yellow-500' : 'bg-gray-700'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              autoInvest ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Investment plan selector */}
        {autoInvest && (
          <div className="space-y-2 mt-3">
            <p className="text-gray-400 text-xs mb-2">Select investment plan:</p>
            {plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                  selectedPlan === plan.id
                    ? 'border-yellow-500 bg-yellow-500/5'
                    : 'border-gray-800 bg-gray-800/50'
                }`}
              >
                <span className="text-white text-sm">{plan.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${plan.color}`}>
                    {plan.risk}
                  </span>
                  <span className="text-emerald-400 text-sm font-semibold">{plan.return}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent round-ups */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-yellow-400" />
          <h2 className="text-white font-semibold">Recent Round-Ups</h2>
        </div>
        <div className="space-y-2">
          {recentRoundUps.map((tx, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{tx.merchant}</p>
                <p className="text-gray-500 text-xs">
                  Spent J${tx.spent.toLocaleString()} → rounded to J${(Math.ceil(tx.spent / roundUpAmount) * roundUpAmount).toLocaleString()} · {tx.date}
                </p>
              </div>
              <span className="text-emerald-400 text-sm font-semibold">
                +J${(Math.ceil(tx.spent / roundUpAmount) * roundUpAmount - tx.spent).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}