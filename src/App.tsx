import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, Sky } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Ecctrl, { EcctrlAnimation, EcctrlJoystick } from 'ecctrl'

import Lights from './Lights'
import Character from './models/Character'
import World from './World'


type ActionName = 'CharacterArmature|Death' | 'CharacterArmature|Duck' | 'CharacterArmature|HitReact' | 'CharacterArmature|Idle' | 'CharacterArmature|Idle_Gun' | 'CharacterArmature|Jump' | 'CharacterArmature|Jump_Idle' | 'CharacterArmature|Jump_Land' | 'CharacterArmature|No' | 'CharacterArmature|Punch' | 'CharacterArmature|Run' | 'CharacterArmature|Run_Gun' | 'CharacterArmature|Run_Gun_Shoot' | 'CharacterArmature|Walk' | 'CharacterArmature|Walk_Gun' | 'CharacterArmature|Wave' | 'CharacterArmature|Weapon' | 'CharacterArmature|Yes'


export default function App() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] }
  ]

  // Note: idle, walk, run, jump, jumpIdle, jumpLand and fall names are essential
  
  const animationSet: Record<string, ActionName> = {
    idle: "CharacterArmature|Idle",
    walk: "CharacterArmature|Walk",
    run: "CharacterArmature|Run",
    jump: "CharacterArmature|Jump",
    jumpIdle: "CharacterArmature|Jump_Idle",
    jumpLand: "CharacterArmature|Jump_Land",
    fall: "CharacterArmature|No",
    action1: "CharacterArmature|Wave",
    action2: "CharacterArmature|Duck",
    // action3: "CharacterArmature|Yes",
    // action4: "CharacterArmature|Punch"
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (
    <>
      {isMobile && <EcctrlJoystick />}
      <Canvas
        shadows
        camera={{ position: [0, 5, 12], fov: 50 }}
      >
        <Sky />
        <Perf position="top-left" />
        {/* <Environment background files="/night.hdr" /> */}
        <Lights />
        <Physics timeStep="vary">
          <Suspense fallback={null}>
            <KeyboardControls map={keyboardMap}>
                <Ecctrl
                  mode="FixedCamera"
                  position={[-3, 5, -20]}
                  maxVelLimit={10}
                  sprintMult={10}
                  debug
                  animated
                  camInitDir={{ 
                    x: Math.PI / 12,
                    y: 0
                  }}
                >
                  <EcctrlAnimation characterURL="/models/character-transformed.glb" animationSet={animationSet}>
                    <Character position={[0, -0.85, 0]} scale={0.5} rotation={[0, 0, 0]} />
                  </EcctrlAnimation>
                </Ecctrl>
            </KeyboardControls>
            <World />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  )
}