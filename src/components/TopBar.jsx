import useAppStore from '../store/useAppStore'
import nexusLogo from '../assets/nexus-logo.png'

export default function TopBar() {
  const { theme } = useAppStore()
  const isLight = theme === 'light'

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center ${
      isLight ? 'bg-gray-100' : 'bg-gray-950'
    }`}>
      <img
        src={nexusLogo}
        alt="NEXUS"
        className="h-40 object-contain"
      />
    </div>
  )
}