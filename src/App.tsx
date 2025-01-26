import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Sky } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense, useCallback, useEffect, useState, useRef } from 'react'
import { EcctrlJoystick } from 'ecctrl'
import Lights from './Lights'
import World from './World'
// import GameCharacter from './components/Character'
import Flamingo from './models/Flamingo'
import TranslationHelper from './TranslationHelper'
import Frog from './models/Frog'
import GameCharacter from './components/Character'
import { useDialogStore } from './utils/store'
import Dialog from './components/Dialog'
import { usePortfolioStore } from './utils/portfolio'
import { useGameStore } from './utils/gameState'
import GameOver from './GameOver'
import { SmartphoneIcon } from 'lucide-react'
import { usePhoneStore } from './utils/phone'
import PhoneMenu from './PhoneMenu'

function DayNightCycle() {
  const timeRef = useRef(0)
  const DAY_LENGTH = 60 // 5 seconds per day

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current = (timeRef.current + 0.016) % DAY_LENGTH // Increment by roughly 1/60th of a second
    }, 16) // Run at ~60fps
    return () => clearInterval(interval)
  }, [])

  // Calculate sun position based on time
  // Map 0-5 seconds to 0-2π for a complete cycle
  const angle = (timeRef.current / DAY_LENGTH) * Math.PI * 2

  // Adjust the curve to have sunrise at 0s and sunset at 2.5s
  const height = Math.sin(angle) * 100
  const distance = Math.cos(angle) * 100

  // Smoothly interpolate atmospheric values based on height
  const rayleigh = 0.5 + Math.max(0, -height / 100) * 1.5 // Smoothly transition from 0.5 to 2
  const turbidity = 8 + Math.max(0, -height / 100) * 4 // Smoothly transition from 8 to 12

  const sunPosition: [number, number, number] = [
    distance, // x position
    Math.max(height, -20), // y position (clamp minimum height)
    0 // z position
  ]

  return (
    <Sky
      sunPosition={sunPosition}
      mieCoefficient={0.005}
      mieDirectionalG={0.7}
      rayleigh={rayleigh}
      turbidity={turbidity}
    />
  )
}

export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  // add a flamingo to the scene every time "f" is pressed
  const [flamingos, setFlamingos] = useState<JSX.Element[]>([])
  const [frogs, setFrogs] = useState<JSX.Element[]>([])
  const { isGameOver, incrementDay } = useGameStore()
  const { isOpen } = usePhoneStore()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'f') {
      setFlamingos([...flamingos, <TranslationHelper key={flamingos.length}><Flamingo /></TranslationHelper>])
    }
    if (event.key === 'g') {
      setFrogs([...frogs, <TranslationHelper key={frogs.length}><Frog /></TranslationHelper>])
    }
    if (event.key === 'd') {
      setFlamingos([])
      setFrogs([])
    }
  }, [flamingos, frogs])
  const { currentDialog } = useDialogStore()

  const DAY_LENGTH = 60 // 5 seconds per day

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    const interval = setInterval(() => {
      incrementDay()
    }, DAY_LENGTH * 1000)

    return () => clearInterval(interval)
  }, [incrementDay])

  if (isGameOver) {
    return <GameOver />
  }

  return (
    <>
      {isMobile && <EcctrlJoystick />}
      {currentDialog && <Dialog />}
      {isOpen && <PhoneMenu />}
      <PortfolioStats />
      <PhoneButton />
      <Canvas
        shadows
        camera={{ position: [0, 5, 12], fov: 50 }}
      >
        <DayNightCycle />
        <Perf position="top-left" />
        <Lights />
        <Physics
          timeStep="vary"
        // debug
        >
          <Suspense fallback={null}>
            <GameCharacter />
            {/* <PerspectiveCamera makeDefault position={[10, 200, 30]} rotation={[-Math.PI/2, 0, Math.PI]} /> */}
            {/* <OrbitControls makeDefault /> */}
            <World />
            {flamingos}
            {frogs}
          </Suspense>
        </Physics>
      </Canvas>
    </>
  )
}

function PortfolioStats() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { totalCash, propertiesOwned, monthlyIncome, netWorthGrowth } = usePortfolioStore()
  const { dayCount } = useGameStore()

  return (
    <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-blue-200 z-[9999999888] w-64 select-none">
      <div
        className="flex items-center justify-between p-2 cursor-pointer border-b border-blue-100"
        onClick={(e) => {
          if (e.type === 'click') {
            setIsExpanded(!isExpanded)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault()
          }
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
        <h2 className="text-sm font-bold text-gray-800">Portfolio Stats</h2>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-2">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Assets:</span>
              <span className="font-medium text-green-600">${totalCash.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Properties Owned:</span>
              <span className="font-medium text-blue-600">{propertiesOwned}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Monthly Income:</span>
              <span className="font-medium text-emerald-600">${monthlyIncome.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Day:</span>
              <span className="font-medium text-blue-600">{dayCount}</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-blue-100">
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>Net Worth Growth</span>
              <span className={netWorthGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                {netWorthGrowth >= 0 ? `+${netWorthGrowth}` : netWorthGrowth}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className={`${netWorthGrowth >= 0 ? 'bg-green-500' : 'bg-red-500'} h-1.5 rounded-full`}
                style={{ width: `${Math.abs(netWorthGrowth)}%` }}

              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PhoneButton() {
  const { setIsOpen } = usePhoneStore()
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="fixed bottom-6 right-6 select-none z-[9999999999]"
      onClick={() => setIsOpen(true)}
    >
      {/* Outer glow/ring */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />

      {/* Button container with gradient */}
      <div className="relative group cursor-pointer">
        {/* Background with gradient */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-lg 
          shadow-blue-500/50 flex items-center justify-center transform transition-all duration-200 
          group-hover:scale-110 group-active:scale-95 group-hover:shadow-blue-500/60">

          {/* Icon */}
          <SmartphoneIcon className="w-8 h-8 text-white group-hover:text-blue-100 transition-colors" />
        </div>

        {/* Ripple effect on hover */}
        <div className="absolute inset-0 -z-10 rounded-full bg-blue-400/20 group-hover:scale-110 
          transition-transform duration-300 ease-out" />

        {/* Tooltip */}
        <div className="absolute top-0 right-full mr-4 px-3 py-1 bg-gray-900/90 text-white text-sm 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Open Phone Menu
        </div>
      </div>
    </div>
  )
}
