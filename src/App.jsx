import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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

function Layout() {
  const { theme } = useAppStore()
  const isLight = theme === 'light'
  return (
    <div style={{ minHeight: '100vh', backgroundColor: isLight ? '#f3f4f6' : '#030712', color: isLight ? '#111827' : '#ffffff' }}>
      <TopBar />
      <NavBar />
      <main className="pb-20 pt-16 px-4 max-w-md mx-auto">
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
  )
}

function App() {
  const { theme } = useAppStore()
  const isLight = theme === 'light'
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