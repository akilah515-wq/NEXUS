import useAppStore from '../store/useAppStore'
import nexusLogo from '../assets/nexus-logo.jpeg'

export default function TopBar() {
  const { theme } = useAppStore()
  const isLight = theme === 'light'

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-2 border-b ${
      isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-800'
    }`}>
      <img
  src={nexusLogo}
  alt="NEXUS"
  className="h-10 object-contain"
  style={{ mixBlendMode: 'screen' }}
/>
    </div>
  )
}