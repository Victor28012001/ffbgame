import { Loader, OrbitControls } from '@react-three/drei'
import { UI } from './UI'
import {
  Float,
} from '@react-three/drei'

import { Book } from './Book'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import './Whitepaper.css'

const Experience = () => {
  return (
    <>
      <Float rotation-x={-Math.PI / 4} floatIntensity={1} speed={1} rotationIntensity={1} scale={2}>
        <Book />
      </Float>
      <OrbitControls />
      {/* <Environment preset="studio"></Environment> */}
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  )
}

const WhitePaper = () => {
  return (
    <div className='full-screen'>
      <UI />
      <Loader />
      <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </div>
  )
}

export default WhitePaper;
