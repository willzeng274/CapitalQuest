export default function Lights() {
  return (
    <>
      {/* Main directional light (sun-like) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.5} />
      
      {/* Hemisphere light for better sky/ground contrast */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#8d7c7c"
        intensity={0.75}
      />

      {/* Fill light from the opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
        color="#b5d6ff"
      />
    </>
  )
}
  