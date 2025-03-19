"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, Text3D, Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Clock() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 3] }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Lighting & Background */}
      <color attach="background" args={["black"]} /> {/* Space background */}
        <Stars 
        radius={50}       // Spread stars over a wide radius
        depth={50}        // Depth for 3D effect
        count={5000}      // Number of stars
        factor={4}        // Size variation
        saturation={0}    // Monochrome stars
        fade={true}       // Fade effect for realism
        />
    <Environment background={false}>
    <Stars 
        radius={100}  
        depth={50}   
        count={5000}  
        factor={4}    
        saturation={0}  
        fade={true}    
    />
    </Environment>
    <ambientLight intensity={1.5} />
    <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* The Glass Sphere */}
      <GlassSphere />

      {/* Clock Numbers */}
      <ClockNumbers />

     {/* Clock Hands */}
      <ClockHands />

      {/* Clock Date */}
      <ClockDate />

      {/* Controls */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}

function GlassSphere() {
    const sphereRef = useRef();
  
    return (
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          transparent
          transmission={1}  // Perfect glass effect
          ior={1.2}         // Adjust Index of Refraction for better realism
          thickness={0.05}  // Very thin glass
          roughness={0}     // No roughness, smooth glass
          metalness={0.1}   // Slightly metallic for reflection
          clearcoat={1}     // Adds a more realistic glass effect
          reflectivity={0.6} // Enhances reflections
          color={"#ffffff"} // Slightly off-white glass
        />
      </mesh>
    );
  }  
  
  function ClockNumbers() {
    const [customTime, setCustomTime] = useState({ hour: 0, minute: 0, second: 0 });
  
    useFrame(() => {
      const date = new Date();
  
      let realSeconds = date.getSeconds() + date.getMilliseconds() / 1000;
      let realMinutes = date.getMinutes() + realSeconds / 60;
      let realHours = date.getHours() + realMinutes / 60;
  
      let customSeconds = (realSeconds * (69 / 60)) % 69;
      let customMinutes = (realMinutes * (69 / 60)) % 69;
      let customHours = realHours % 24;
  
      setCustomTime({ 
        hour: Math.floor(customHours), 
        minute: Math.floor(customMinutes), 
        second: Math.floor(customSeconds) 
      });
    });
  
    return (
      <>
        {/* Glowing Numbers Around the Sphere */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.sin(angle) * 1.1;
          const y = Math.cos(angle) * 1.1;
          const z = 0.1;
  
          return (
            <group key={i}>
              {/* Fake 3D Effect: Multiple Layers */}
              {[...Array(5)].map((_, j) => (
                <Text
                  key={j}
                  position={[x, y, z - j * 0.01]} // Stacks multiple layers to create thickness
                  fontSize={0.2}
                  color={j === 0 ? "white" : "gray"} // Front is white, depth is gray
                  opacity={j === 0 ? 1 : 0.5}
                >
                  {i * 2}
                </Text>
              ))}
            </group>
          );
        })}
  
        {/* Glowing Custom Time Display at the Center */}
        <group position={[0, 0, 1]} rotation={[0, 0, 0]}>

          {[...Array(5)].map((_, j) => (
            <Text
            key={j}
            fontSize={0.4} // Slightly bigger for better visibility
            color={j === 0 ? "lightblue" : "gray"}
            opacity={j === 0 ? 1 : 0.5}
            position={[0, 0, -j * 0.02]}
            material-toneMapped={false} // Prevents dimming due to reflections
          >
          
              {`${customTime.hour.toString().padStart(2, "0")}:${customTime.minute
                .toString()
                .padStart(2, "0")}:${customTime.second.toString().padStart(2, "0")}`}
            </Text>
          ))}
        </group>
      </>
    );
  }
  

  function ClockHands() {
    const hourHandRef = useRef();
    const minuteHandRef = useRef();
    const secondHandRef = useRef();
  
    useFrame(() => {
      const date = new Date();
  
      // Convert real time to custom 69-second, 69-minute format
      let realSeconds = date.getSeconds() + date.getMilliseconds() / 1000;
      let realMinutes = date.getMinutes() + realSeconds / 60;
      let realHours = date.getHours() + realMinutes / 60;
  
      let customSeconds = (realSeconds * (69 / 60)) % 69;
      let customMinutes = (realMinutes * (69 / 60)) % 69;
      let customHours = realHours % 24;
  
      // Rotate hands accordingly
      hourHandRef.current.rotation.z = -((customHours % 12) / 12) * Math.PI * 2;
      minuteHandRef.current.rotation.z = -((customMinutes / 69) * Math.PI * 2);
      secondHandRef.current.rotation.z = -((customSeconds / 69) * Math.PI * 2);
    });
  
    return (
      <>
        {/* Hour Hand */}
        <mesh ref={hourHandRef} position={[0, 0, 0.15]}>
          <boxGeometry args={[0.05, 0.4, 0.02]} />
          <meshStandardMaterial color="white" emissive="blue" emissiveIntensity={0.5} />
        </mesh>
  
        {/* Minute Hand */}
        <mesh ref={minuteHandRef} position={[0, 0, 0.1]}>
          <boxGeometry args={[0.03, 0.6, 0.02]} />
          <meshStandardMaterial color="white" emissive="lightblue" emissiveIntensity={0.6} />
        </mesh>
  
        {/* Second Hand */}
        <mesh ref={secondHandRef} position={[0, 0, 0.05]}>
          <boxGeometry args={[0.02, 0.8, 0.02]} />
          <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.7} />
        </mesh>
      </>
    );
  }
  
  function ClockDate() {
    const [currentDate, setCurrentDate] = useState("");
  
    useFrame(() => {
      const dateObj = new Date();
      const day = dateObj.toLocaleString("en-US", { weekday: "long" });
      const date = dateObj.toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  
      setCurrentDate(`${day}, ${date}`);
    });
  
    return (
      <group position={[1.5, 1.2, 0]} rotation={[0, 0, 0]}>
        {[...Array(5)].map((_, j) => (
          <Text
            key={j}
            fontSize={0.2} // Slightly smaller than the clock numbers
            color={j === 0 ? "violet" : "gray"} // Neon violet + gray depth
            opacity={j === 0 ? 1 : 0.5}
            position={[0, 0, -j * 0.02]}
          >
            {currentDate}
          </Text>
        ))}
      </group>
    );
  }
  