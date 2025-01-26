/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Building B.glb -t -T -o ../../src/models/Building B.tsx 
Files: Building B.glb [87.16KB] > /Users/user/Desktop/Projects/geesehacks/src/models/Building B-transformed.glb [16.68KB] (81%)
*/

import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { useGLTF } from '@react-three/drei'

// Define GLTFAction type
type GLTFAction = THREE.AnimationClip

type GLTFResult = GLTF & {
  nodes: {
    building_B: THREE.Mesh
  }
  materials: {
    citybits_texture: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Building B-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.building_B.geometry} material={materials.citybits_texture} scale={100} />
    </group>
  )
}

useGLTF.preload('/models/Building B-transformed.glb')
