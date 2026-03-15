import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Banks from './pages/Banks'
import Analytics from './pages/Analytics'
import Savings from './pages/Savings'
import Advisor from './pages/Advisor'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import NavBar from './components/NavBar'
import TopBar from './components/TopBar'
import useAppStore from './store/useAppStore'
import { useEffect } from 'react'
import { Home as HomeIcon, Building2, BarChart2, PiggyBank, Bot, Settings as SettingsIcon } from 'lucide-react'
import nexusLogo from './assets/nexus-logo.png'

const navItems = [
  { path: '/home', icon: HomeIcon, label: 'Home' },
  { path: '/banks', icon: Building2, label: 'Banks' },
  { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  { path: '/savings', icon: PiggyBank, label: 'Savings' },
  { path: '/advisor', icon: Bot, label: 'Advisor' },
  { path: '/settings', icon: SettingsIcon, label: 'Settings' },
]

function DesktopSidebar() {
  const location = useLocation()
  const { theme } = useAppStore()
  const isLight = theme === 'light'

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      backgroundColor: isLight ? '#ffffff' : '#111827',
      borderRight: isLight ? '1px solid #e5e7eb' : '1px solid #1f2937',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <img src={nexusLogo} alt="NEXUS" style={{ height: '135px', objectFit: 'contain' }} />
      </div>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: isActive ? '#FBBF24' : 'transparent',
                color: isActive ? '#111827' : isLight ? '#6b7280' : '#9ca3af',
                fontWeight: isActive ? '600' : '400',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={20} />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function Layout() {
  const { theme } = useAppStore()
  const isLight = theme === 'light'

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? '#f3f4f6' : '#030712'
    document.body.style.color = isLight ? '#111827' : '#ffffff'
  }, [theme])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isLight ? '#f3f4f6' : '#030712',
      color: isLight ? '#111827' : '#ffffff',
    }}>
      {/* Desktop layout */}
      <div className="hidden md:flex">
        <DesktopSidebar />
        <main style={{
  marginLeft: '240px',
  flex: 1,
  padding: '32px',
  width: 'calc(100% - 240px)',
}}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <TopBar />
        <NavBar />
        <main style={{ paddingBottom: '80px', paddingTop: '64px', paddingLeft: '16px', paddingRight: '16px', maxWidth: '448px', margin: '0 auto' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  const { theme } = useAppStore()
  const isLight = theme === 'light'

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? '#f3f4f6' : '#030712'
  }, [theme])

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: isLight ? '#f3f4f6' : '#030712' }}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<Layout />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App