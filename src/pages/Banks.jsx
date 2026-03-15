import { useState } from 'react'
import { ChevronRight, Star, Wifi, Clock } from 'lucide-react'

const banks = [
  {
    id: 1, name: 'National Commercial Bank', fullName: 'National Commercial Bank',
    color: 'bg-yellow-500', initials: 'NCB', minDeposit: 'J$1,000',
    onlineApp: true, processingTime: '30 mins', rating: 4.5,
    promo: 'Zero fees for first 3 months',
    promoColor: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    requirements: ['TRN', 'Government-issued ID', 'Proof of address (utility bill, max 3 months)', 'Minimum J$1,000 deposit'],
    accountTypes: ['Savings', 'Chequing', 'Foreign Currency', 'Student'],
  },
  {
    id: 2, name: 'JN Bank', fullName: 'JN Bank',
    color: 'bg-blue-600', initials: 'JN', minDeposit: 'J$500',
    onlineApp: true, processingTime: '45 mins', rating: 4.3,
    promo: 'EasyAccount — no monthly fees',
    promoColor: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    requirements: ['TRN', 'Valid photo ID', 'Proof of address'],
    accountTypes: ['EasyAccount', 'Savings', 'Chequing', 'Business'],
  },
  {
    id: 3, name: 'Scotiabank Jamaica', fullName: 'Scotiabank Jamaica',
    color: 'bg-red-600', initials: 'SB', minDeposit: 'Varies',
    onlineApp: false, processingTime: '1-2 days', rating: 4.0,
    promo: 'Cashback on debit card purchases',
    promoColor: 'bg-red-400/10 text-red-400 border-red-400/20',
    requirements: ['TRN', 'Proof of identity', 'Proof of income (pay slip or bank statement)', 'Proof of address'],
    accountTypes: ['Savings', 'Chequing', 'USD Account', 'Student'],
  },
  {
    id: 4, name: 'CIBC FirstCaribbean', fullName: 'CIBC FirstCaribbean',
    color: 'bg-purple-600', initials: 'CB', minDeposit: 'Varies',
    onlineApp: false, processingTime: '2-3 days', rating: 3.8,
    promo: 'Free international transfers',
    promoColor: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    requirements: ['Two forms of ID (one with photo)', 'Proof of address', 'TRN', 'Employer reference letter (some accounts)'],
    accountTypes: ['Savings', 'Chequing', 'Foreign Currency', 'Business'],
  },
  {
    id: 5, name: 'Victoria Mutual', fullName: 'Victoria Mutual',
    color: 'bg-emerald-600', initials: 'VM', minDeposit: 'J$500',
    onlineApp: true, processingTime: '1 day', rating: 4.2,
    promo: 'High-yield savings account',
    promoColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    requirements: ['TRN', 'Valid ID', 'Proof of address'],
    accountTypes: ['Building Society', 'Share Account', 'Savings', 'Mortgage'],
  },
]

const filters = ['All', 'Online App', 'Low Deposit', 'Has Promo']

export default function Banks() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedBank, setSelectedBank] = useState(null)

  const filtered = banks.filter(bank => {
    if (activeFilter === 'Online App') return bank.onlineApp
    if (activeFilter === 'Low Deposit') return ['J$500', 'J$1,000'].includes(bank.minDeposit)
    if (activeFilter === 'Has Promo') return bank.promo
    return true
  })

  if (selectedBank) {
    return (
      <div className="py-4 space-y-4">
        <button
          onClick={() => setSelectedBank(null)}
          className="text-yellow-400 text-sm flex items-center gap-1"
        >
          ← Back to Banks
        </button>

        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${selectedBank.color} flex items-center justify-center text-white font-bold text-lg`}>
            {selectedBank.initials}
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{selectedBank.fullName}</h2>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-gray-400 text-xs">{selectedBank.rating} rating</span>
            </div>
          </div>
        </div>

        <div className={`border rounded-xl px-4 py-3 text-sm font-medium ${selectedBank.promoColor}`}>
          🎉 {selectedBank.promo}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Min. Deposit</p>
            <p className="text-white font-bold">{selectedBank.minDeposit}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Processing Time</p>
            <p className="text-white font-bold">{selectedBank.processingTime}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Online Application</p>
            <p className={`font-bold ${selectedBank.onlineApp ? 'text-emerald-400' : 'text-gray-400'}`}>
              {selectedBank.onlineApp ? '✓ Available' : '✗ Branch only'}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Rating</p>
            <p className="text-white font-bold">{selectedBank.rating} / 5.0</p>
          </div>
        </div>

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

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">💳 Account Types Available</h3>
          <div className="flex flex-wrap gap-2">
            {selectedBank.accountTypes.map((type, i) => (
              <span key={i} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                {type}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl text-sm">
          Start My Application at {selectedBank.initials} →
        </button>
      </div>
    )
  }

  return (
    <div className="py-4 space-y-4">
      <div>
        <h1 className="text-white text-2xl font-bold">Jamaican Banks</h1>
        <p className="text-gray-400 text-sm mt-1">Compare and find the right bank for you</p>
      </div>

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

      <div className="space-y-3">
        {filtered.map(bank => (
          <button
            key={bank.id}
            onClick={() => setSelectedBank(bank)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-600 transition-colors text-left"
          >
            <div className={`w-12 h-12 rounded-xl ${bank.color} flex items-center justify-center text-white font-bold shrink-0`}>
              {bank.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">{bank.name}</p>
                <ChevronRight size={16} className="text-gray-600 shrink-0" />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-gray-400 text-xs">Min: {bank.minDeposit}</span>
                {bank.onlineApp && (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs">
                    <Wifi size={10} /> Online
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock size={10} /> {bank.processingTime}
                </span>
              </div>
              <div className={`mt-2 text-xs px-2 py-1 rounded-full border inline-block ${bank.promoColor}`}>
                {bank.promo}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}