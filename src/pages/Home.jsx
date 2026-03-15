import { ArrowUpRight, Building2, Bot, PiggyBank, TrendingUp, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const transactions = [
  { id: 1, merchant: 'Hi-Lo Food Store', category: 'Food', amount: -1340, date: 'Today' },
  { id: 2, merchant: 'JPS Bill Payment', category: 'Utilities', amount: -4500, date: 'Yesterday' },
  { id: 3, merchant: 'Digicel Top-Up', category: 'Telecom', amount: -500, date: 'Yesterday' },
  { id: 4, merchant: 'Cash Deposit', category: 'Income', amount: +25000, date: 'Mar 12' },
  { id: 5, merchant: 'Tastee Patties', category: 'Food', amount: -650, date: 'Mar 12' },
]

export default function Home() {
  const { theme, translations: t, user } = useAppStore()
  const isLight = theme === 'light'
  const cardClass = isLight ? 'bg-white border border-gray-200' : 'bg-gray-900 border border-gray-800'
  const textPrimary = isLight ? 'text-gray-900' : 'text-white'
  const textSecondary = isLight ? 'text-gray-500' : 'text-gray-400'

  const quickActions = [
    { label: t.openAccount, icon: Building2, path: '/banks', color: 'bg-yellow-400/10 text-yellow-400' },
    { label: t.compareBanks, icon: TrendingUp, path: '/banks', color: 'bg-blue-400/10 text-blue-400' },
    { label: t.askAdvisor, icon: Bot, path: '/advisor', color: 'bg-emerald-400/10 text-emerald-400' },
    { label: t.startSaving, icon: PiggyBank, path: '/savings', color: 'bg-purple-400/10 text-purple-400' },
  ]

  return (
    <div className="space-y-6 py-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${textSecondary}`}>{t.goodMorning} 👋</p>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>
            {user.name.split(' ')[0]}
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-lg">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Health Score Card */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-5 text-gray-900">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium opacity-75">{t.financialHealth}</p>
            <p className="text-5xl font-bold mt-1">72</p>
          </div>
          <ShieldCheck size={48} className="opacity-30" />
        </div>
        <div className="w-full bg-yellow-700/30 rounded-full h-2 mb-3">
          <div className="bg-gray-900 h-2 rounded-full" style={{ width: '72%' }} />
        </div>
        <div className="flex justify-between text-xs font-medium opacity-75">
          <span>0 — At Risk</span>
          <span>{t.goodStanding}</span>
          <span>100 — Excellent</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className={`${cardClass} rounded-2xl p-5`}>
        <p className={`text-sm mb-1 ${textSecondary}`}>{t.simulatedBalance}</p>
        <p className={`text-3xl font-bold ${textPrimary}`}>J$47,320</p>
        <p className="text-emerald-400 text-sm mt-1">↑ J$2,840 {t.savedThisMonth}</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={`font-semibold mb-3 ${textPrimary}`}>{t.quickActions}</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ label, icon: Icon, path, color }) => (
            <Link
              key={label}
              to={path}
              className={`${cardClass} rounded-xl p-4 flex items-center gap-3 hover:border-gray-600 transition-colors`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <span className={`text-sm font-medium ${textPrimary}`}>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`font-semibold ${textPrimary}`}>{t.recentTransactions}</h2>
          <Link to="/analytics" className="text-yellow-400 text-sm flex items-center gap-1">
            {t.seeAll} <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className={`${cardClass} rounded-xl px-4 py-3 flex items-center justify-between`}>
              <div>
                <p className={`text-sm font-medium ${textPrimary}`}>{tx.merchant}</p>
                <p className={`text-xs ${textSecondary}`}>{tx.category} · {tx.date}</p>
              </div>
              <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-emerald-400' : textPrimary}`}>
                {tx.amount > 0 ? '+' : ''}J${Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}