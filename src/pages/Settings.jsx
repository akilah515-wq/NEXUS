import { useState } from 'react'
import { Moon, Sun, Globe, Bell, Shield, ChevronRight, LogOut, Info, Check } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'nl', label: 'Dutch', flag: '🇳🇱' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
]

function Toggle({ defaultValue }) {
  const [on, setOn] = useState(defaultValue)
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-12 h-6 rounded-full transition-colors relative ${on ? 'bg-yellow-500' : 'bg-gray-700'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${on ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const { theme, setTheme, language, setLanguage, translations: t } = useAppStore()
  const [showLangPicker, setShowLangPicker] = useState(false)
  const isLight = theme === 'light'

  const currentLang = languages.find(l => l.code === language)

  const cardClass = isLight
    ? 'bg-white border border-gray-200 rounded-xl'
    : 'bg-gray-900 border border-gray-800 rounded-xl'

  const textPrimary = isLight ? 'text-gray-900' : 'text-white'
  const textSecondary = isLight ? 'text-gray-500' : 'text-gray-400'
  const iconBg = isLight ? 'bg-gray-100' : 'bg-gray-800'
  const divider = isLight ? 'border-gray-200' : 'border-gray-800'
  const rowHover = isLight ? 'hover:bg-gray-50' : 'hover:bg-gray-800'

  return (
    <div className="py-4 space-y-6">
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>{t.settingsTitle}</h1>
        <p className={`text-sm mt-1 ${textSecondary}`}>{t.customise}</p>
      </div>

      {/* Profile card */}
      <div className={`${cardClass} p-4 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-xl">S</div>
        <div>
          <p className={`font-bold text-lg ${textPrimary}`}>Shantel Brown</p>
          <p className={`text-sm ${textSecondary}`}>shantel@nexus.jm</p>
          <p className="text-emerald-400 text-xs mt-1">Health Score: 72 — {t.goodStanding}</p>
        </div>
      </div>

      {/* Theme */}
      <div className={`${cardClass} p-4`}>
        <p className={`font-semibold mb-3 ${textPrimary}`}>{t.theme}</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'dark', icon: Moon, label: t.darkGold },
            { id: 'light', icon: Sun, label: t.lightMode },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                theme === id
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                  : `border-gray-300 ${textSecondary}`
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preferences section */}
      <div className={`${cardClass} overflow-hidden`}>
        <p className={`text-xs font-semibold uppercase tracking-wider px-4 pt-3 pb-2 ${textSecondary}`}>
          {t.preferences}
        </p>

        {/* Language row */}
        <button
          onClick={() => setShowLangPicker(!showLangPicker)}
          className={`w-full flex items-center justify-between px-4 py-3 border-b ${divider} ${rowHover} transition-colors`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Globe size={15} className={textSecondary} />
            </div>
            <span className={`text-sm ${textPrimary}`}>{t.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${textSecondary}`}>{currentLang.flag} {currentLang.label}</span>
            <ChevronRight size={14} className={`${textSecondary} transition-transform ${showLangPicker ? 'rotate-90' : ''}`} />
          </div>
        </button>

        {/* Language picker */}
        {showLangPicker && (
          <div className={`border-b ${divider} max-h-64 overflow-y-auto`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setShowLangPicker(false) }}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${rowHover} ${
                  language === lang.code ? 'bg-yellow-400/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className={`text-sm ${textPrimary}`}>{lang.label}</span>
                </div>
                {language === lang.code && <Check size={14} className="text-yellow-400" />}
              </button>
            ))}
          </div>
        )}

        {/* Notifications row */}
        <div className={`flex items-center justify-between px-4 py-3`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Bell size={15} className={textSecondary} />
            </div>
            <span className={`text-sm ${textPrimary}`}>{t.notifications}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${textSecondary}`}>{t.allEnabled}</span>
            <ChevronRight size={14} className={textSecondary} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className={`${cardClass} overflow-hidden`}>
        <p className={`text-xs font-semibold uppercase tracking-wider px-4 pt-3 pb-2 ${textSecondary}`}>
          {t.security}
        </p>
        <div className={`flex items-center justify-between px-4 py-3 border-b ${divider}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Shield size={15} className={textSecondary} />
            </div>
            <span className={`text-sm ${textPrimary}`}>{t.biometric}</span>
          </div>
          <Toggle defaultValue={true} />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Shield size={15} className={textSecondary} />
            </div>
            <span className={`text-sm ${textPrimary}`}>{t.twoFactor}</span>
          </div>
          <Toggle defaultValue={false} />
        </div>
      </div>

      {/* About */}
      <div className={`${cardClass} overflow-hidden`}>
        <p className={`text-xs font-semibold uppercase tracking-wider px-4 pt-3 pb-2 ${textSecondary}`}>
          {t.about}
        </p>
        <div className={`flex items-center justify-between px-4 py-3 border-b ${divider}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Info size={15} className={textSecondary} />
            </div>
            <span className={`text-sm ${textPrimary}`}>{t.appVersion}</span>
          </div>
          <span className={`text-xs ${textSecondary}`}>v1.0.0 — Hackathon Build</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Info size={15} className={textSecondary} />
            </div>
            <span className={`text-sm ${textPrimary}`}>{t.builtBy}</span>
          </div>
          <span className={`text-xs ${textSecondary}`}>Team NEXUS · March 2026</span>
        </div>
      </div>

      {/* Sign out */}
      <button
  onClick={() => window.location.href = '/signin'}
  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/5 transition-colors"
>
  <LogOut size={16} />
  {t.signOut}
</button>

      <div className="text-center pb-4">
        <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-gray-700'}`}>
          NEXUS — Built for Jamaica. Built for Everyone.
        </p>
      </div>
    </div>
  )
}