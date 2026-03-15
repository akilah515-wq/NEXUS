import { Link, useLocation } from 'react-router-dom'
import { Home, Building2, BarChart2, PiggyBank, Bot, Settings } from 'lucide-react'
import useAppStore from '../store/useAppStore'
import nexusLogo from '../assets/nexus-logo.jpeg'

export default function NavBar() {
  const location = useLocation()
  const { theme, translations: t } = useAppStore()
  const isLight = theme === 'light'

  const navItems = [
    { path: '/home', icon: Home, label: t.home },
    { path: '/banks', icon: Building2, label: t.banks },
    { path: '/analytics', icon: BarChart2, label: t.analytics },
    { path: '/savings', icon: PiggyBank, label: t.savings },
    { path: '/advisor', icon: Bot, label: t.advisor },
    { path: '/settings', icon: Settings, label: t.settings },
  ]

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t z-50 ${
      isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-800'
    }`}>
      <div className="flex justify-around items-center max-w-md mx-auto py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          return (
            <Link key={path} to={path} className="flex flex-col items-center gap-1 px-2">
              <Icon
                size={22}
                className={isActive ? 'text-yellow-400' : isLight ? 'text-gray-400' : 'text-gray-500'}
              />
              <span className={`text-xs ${
                isActive ? 'text-yellow-400 font-semibold' : isLight ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}