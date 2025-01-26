/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Building-T3oyvK6VEU.glb -t -T -o ../../src/models/Building-T3oyvK6VEU.tsx 
Files: Building-T3oyvK6VEU.glb [105.87KB] > /Users/user/Desktop/Projects/geesehacks/src/models/Building-T3oyvK6VEU-transformed.glb [17.03KB] (84%)
*/

import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { useGLTF } from '@react-three/drei'

// Define GLTFAction type
type GLTFAction = THREE.AnimationClip

type GLTFResult = GLTF & {
  nodes: {
    building_F: THREE.Mesh
  }
  materials: {
    citybits_texture: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Building-T3oyvK6VEU-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.building_F.geometry} material={materials.citybits_texture} scale={100} />
    </group>
  )
}

useGLTF.preload('/models/Building-T3oyvK6VEU-transformed.glb')