// src/Background3D.jsx
import { Canvas } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'

function FloatingThing({ position, color, scale = 1 }) {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh position={position} scale={scale} castShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>
    </Float>
  )
}

export default function Background3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      {/* Deep night background */}
      <color attach="background" args={['#0b1020']} />

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} />

      {/* Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Floating glossy shapes */}
      <FloatingThing position={[-3, 1, -2]} color="#8ab4f8" scale={0.9} />
      <FloatingThing position={[3, -1, 0]} color="#f28cb1" scale={0.8} />
      <FloatingThing position={[0, 2, 1]} color="#a0e7e5" scale={1.1} />
    </Canvas>
  )
}
