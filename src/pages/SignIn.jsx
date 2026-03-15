import nexusLogo from '../assets/nexus-logo.jpeg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield } from 'lucide-react'
import useAppStore from '../store/useAppStore'

export default function SignIn() {
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [name, setName] = useState('')
  const { theme, setUser } = useAppStore()
  const isLight = theme === 'light'
  const navigate = useNavigate()

  const handleSignIn = () => {
  if (!phone || pin.length < 4) return
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false)
    const displayName = isNewUser && name.trim() ? name.trim() : 'Shantel Brown'
    const firstName = displayName.split(' ')[0].toLowerCase()
    setUser({
      name: displayName,
      phone: phone,
      email: `${firstName}@nexus.jm`,
    })
    navigate('/home')
  }, 1500)
}

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${
      isLight ? 'bg-gray-100' : 'bg-gray-950'
    }`}>

      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
  <img
  src={nexusLogo}
  alt="NEXUS Logo"
  className="w-48 h-48 object-contain mb-2"
  style={{
    mixBlendMode: 'screen',
    filter: 'brightness(1.2) contrast(1.1)',
    borderRadius: '16px',
    background: 'transparent',
  }}
/>
  <p className="text-gray-400 text-sm mt-1">Jamaica's Financial Platform</p>
</div>

      {/* Card */}
      <div className={`w-full max-w-sm rounded-2xl p-6 space-y-4 ${
        isLight
          ? 'bg-white border border-gray-200'
          : 'bg-gray-900 border border-gray-800'
      }`}>
        <div>
          <h2 className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {isNewUser ? 'Create Account' : 'Welcome back'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {isNewUser ? 'Start your financial journey' : 'Sign in to your NEXUS account'}
          </p>
        </div>

        {/* Name field */}
        {isNewUser && (
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Shantel Brown"
              className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                isLight
                  ? 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400'
                  : 'bg-gray-800 border border-gray-700 text-white placeholder-gray-600'
              }`}
            />
          </div>
        )}

        {/* Phone */}
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Phone Number</label>
          <div className="flex gap-2">
            <div className={`px-3 py-3 rounded-xl text-sm font-medium border ${
              isLight
                ? 'bg-gray-100 border-gray-200 text-gray-700'
                : 'bg-gray-800 border-gray-700 text-gray-300'
            }`}>
              🇯🇲 +1
            </div>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="876 XXX XXXX"
              className={`flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                isLight
                  ? 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400'
                  : 'bg-gray-800 border border-gray-700 text-white placeholder-gray-600'
              }`}
            />
          </div>
        </div>

        {/* PIN */}
        <div>
          <label className="text-gray-400 text-xs mb-1 block">
            {isNewUser ? 'Create a 6-digit PIN' : '6-digit PIN'}
          </label>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={e => setPin(e.target.value.slice(0, 6))}
              placeholder="••••••"
              maxLength={6}
              className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors pr-12 ${
                isLight
                  ? 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400'
                  : 'bg-gray-800 border border-gray-700 text-white placeholder-gray-600'
              }`}
            />
            <button
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* PIN dots */}
        <div className="flex justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < pin.length
                  ? 'bg-yellow-400 scale-110'
                  : isLight ? 'bg-gray-200' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleSignIn}
          disabled={!phone || pin.length < 4 || isLoading}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl text-sm disabled:opacity-40 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              {isNewUser ? 'Creating account...' : 'Signing in...'}
            </div>
          ) : (
            isNewUser ? 'Create Account' : 'Sign In'
          )}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500">
          {isNewUser ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="text-yellow-400 font-semibold"
          >
            {isNewUser ? 'Sign In' : 'Create one'}
          </button>
        </p>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 mt-6">
        <Shield size={14} className="text-gray-600" />
        <p className="text-gray-600 text-xs">Secured with AES-256 encryption</p>
      </div>

      {/* Demo skip */}
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-gray-600 text-xs underline"
      >
        Skip — Demo Mode
      </button>

    </div>
  )
}