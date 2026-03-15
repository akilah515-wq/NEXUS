import { useState, useEffect } from 'react'
import { ChevronRight, Star, Wifi, Clock } from 'lucide-react'

const filters = ['All', 'Online App', 'Low Deposit', 'Has Promo']

export default function Banks() {
  const [banks, setBanks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedBank, setSelectedBank] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banks`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setBanks(data.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = banks.filter(bank => {
    if (activeFilter === 'Online App') return bank.onlineApply
    if (activeFilter === 'Low Deposit') {
      const minDeposit = Math.min(...bank.accountTypes.map(a => a.minDeposit))
      return minDeposit <= 1000
    }
    if (activeFilter === 'Has Promo') return bank.promotions && bank.promotions.length > 0
    return true
  })

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (selectedBank) {
    return (
      <div className="py-4 space-y-4">
        {/* Back button */}
        <button
          onClick={() => setSelectedBank(null)}
          className="text-yellow-400 text-sm flex items-center gap-1"
        >
          ← Back to Banks
        </button>

        {/* Bank header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: selectedBank.color }}>
            {selectedBank.shortName}
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{selectedBank.name}</h2>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-gray-400 text-xs">{selectedBank.rating} rating</span>
            </div>
          </div>
        </div>

        {/* Promo banner */}
        {selectedBank.promotions && selectedBank.promotions.length > 0 && (
          <div className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 rounded-xl px-4 py-3 text-sm font-medium">
            🎉 {selectedBank.promotions[0].title}
          </div>
        )}

        {/* Key info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Min. Deposit</p>
            <p className="text-white font-bold">
              J${Math.min(...selectedBank.accountTypes.map(a => a.minDeposit)).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Processing Time</p>
            <p className="text-white font-bold">{selectedBank.processingTime}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Online Application</p>
            <p className={`font-bold ${selectedBank.onlineApply ? 'text-emerald-400' : 'text-gray-400'}`}>
              {selectedBank.onlineApply ? '✓ Available' : '✗ Branch only'}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Rating</p>
            <p className="text-white font-bold">{selectedBank.rating} / 5.0</p>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">📋 What You Need to Open an Account</h3>
          <div className="space-y-2">
            {selectedBank.requirements.map((req, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">✓</span>
                <span className="text-gray-300 text-sm">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Account types */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">💳 Account Types Available</h3>
          <div className="space-y-2">
            {selectedBank.accountTypes.map((account, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{account.name}</p>
                  <p className="text-gray-500 text-xs">Min: J${account.minDeposit.toLocaleString()} · Fee: J${account.monthlyFee}/mo</p>
                </div>
                <span className="text-emerald-400 text-sm font-semibold">{account.interestRate}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Promotions */}
        {selectedBank.promotions && selectedBank.promotions.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">🎉 Current Promotions</h3>
            <div className="space-y-2">
              {selectedBank.promotions.map((promo, i) => (
                <div key={i} className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-yellow-400 text-sm font-semibold">{promo.title}</p>
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">{promo.badge}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{promo.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <button className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl text-sm">
          Start My Application at {selectedBank.shortName} →
        </button>
      </div>
    )
  }

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Jamaican Banks</h1>
        <p className="text-gray-400 text-sm mt-1">Compare and find the right bank for you</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-900 text-gray-400 border border-gray-800'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Bank cards */}
      <div className="space-y-3">
        {filtered.map(bank => (
          <button
            key={bank.id}
            onClick={() => setSelectedBank(bank)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-600 transition-colors text-left"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
              style={{ backgroundColor: bank.color }}
            >
              {bank.shortName}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">{bank.name}</p>
                <ChevronRight size={16} className="text-gray-600 shrink-0" />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-gray-400 text-xs">
                  Min: J${Math.min(...bank.accountTypes.map(a => a.minDeposit)).toLocaleString()}
                </span>
                {bank.onlineApply && (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs">
                    <Wifi size={10} /> Online
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock size={10} /> {bank.processingTime}
                </span>
              </div>
              {bank.promotions && bank.promotions.length > 0 && (
                <div className="mt-2 text-xs px-2 py-1 rounded-full border inline-block bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
                  {bank.promotions[0].title}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}