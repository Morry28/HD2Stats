import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';




const biomes = {
  mesa: { color: 'orange', roughness: 1 },
  highlands: { color: 'lime', roughness: 0.6 },
  moon: { color: 'gray', roughness: 0.8 },
  rainforest: { color: 'green', roughness: 0.5 },
  desert: { color: 'orange', roughness: 1 },
  canyon: { color: 'yellow', roughness: 0.7 },
  toxic: { color: 'purple', roughness: 0.9 },
  jungle: { color: 'green', roughness: 0.5 },
  icemoss: { color: 'cyan', roughness: 0.3 },
  winter: { color: 'blue', roughness: 0.2 },
  crimsonmoor: { color: 'red', roughness: 0.4 },
  ethereal: { color: 'pink', roughness: 0.1 },
  default: { color: 'white', roughness: 0.5 },
  desolate: { color: 'black', roughness: 0.8 },
};


const Planet = ({ type }) => {
  const { color, roughness } = biomes[type] || biomes['default'];
  
  return (
    <Sphere args={[2.5, 16, 16]}>
      <MeshDistortMaterial color={color} roughness={roughness} distort={0.2} wireframe={true} />
    </Sphere>
  );
};
// eslint-disable-next-line no-unused-vars

const TestBlock = ({biome}) => {
  const planetType = biome; 
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Planet type={planetType} />
    </Canvas>
  );
};



export default TestBlock;