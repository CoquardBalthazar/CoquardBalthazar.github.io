import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './ThreeDemo.css'

// ── single shape ──────────────────────────────────────────────
interface ShapeProps {
  geometry: React.ReactNode
  color: string
  position: [number, number, number]
  initialRotation?: [number, number, number]
}

function Shape({ geometry, color, position, initialRotation }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (initialRotation) ref.current.rotation.set(...initialRotation)
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * (hovered ? 5 : 0.4)
    ref.current.rotation.y += delta * (hovered ? 5 : 0.4)
  })

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {geometry}
      <meshPhongMaterial color={color} shininess={100} specular="#ffffff" />
    </mesh>
  )
}

// ── group with hover-triggered random rotation ─────────────────
interface SceneProps {
  hovering: boolean
}

function Scene({ hovering }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const velocity = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (hovering) {
      target.current = {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
      }
    } else {
      target.current = { x: 0, y: 0 }
    }
  }, [hovering])

  useFrame((_, delta) => {
    // lerp velocity toward target — 0.15 = fast but not snappy
    velocity.current.x += (target.current.x - velocity.current.x) * 0.15
    velocity.current.y += (target.current.y - velocity.current.y) * 0.15
    groupRef.current.rotation.x += velocity.current.x * delta
    groupRef.current.rotation.y += velocity.current.y * delta
  })

  return (
    <group ref={groupRef}>
      {/* cone (pyramid) — top center — secondary pink */}
      <Shape
        geometry={<coneGeometry args={[1.1, 2.2, 4]} />}
        color="#fc0082"
        position={[0, 1.4, 0]}
      />
      {/* cube — bottom left — primary blue — tilted corner-up */}
      <Shape
        geometry={<boxGeometry args={[1.5, 1.5, 1.5]} />}
        color="#216bdb"
        position={[-1.6, -0.9, 0]}
        initialRotation={[Math.PI / 4, Math.PI / 4, 0]}
      />
      {/* sphere — bottom right — tertiary yellow */}
      <Shape
        geometry={<sphereGeometry args={[1.0, 32, 32]} />}
        color="#feb327"
        position={[1.6, -0.9, 0]}
      />
    </group>
  )
}

// ── exported section ──────────────────────────────────────────
export default function ThreeDemo() {
  const [hovering, setHovering] = useState(false)

  return (
    <section
      id="three-demo"
      className="three-demo-section"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.7} />
        <directionalLight
          position={[-5, -3, 2]}
          intensity={0.8}
          color="#ffffff"
        />
        <Scene hovering={hovering} />
      </Canvas>
    </section>
  )
}
