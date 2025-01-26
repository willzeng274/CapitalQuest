// The world... import ./models/[model].tsx to construct the world

import { RigidBody } from '@react-three/rapier'
import Cityboyjj from './models/Cityboyjj'

export default function World() {
    return (
        <group scale={4}>
            {/* Ground and static elements */}
            <RigidBody type="fixed" colliders="trimesh">
                <Cityboyjj />
            </RigidBody>
        </group>
    )
}