import { Stage, Layer, Circle, Text, Group, Rect, Image as KonvaImage } from 'react-konva';
import { useState, useEffect } from 'react';
import useImage from 'use-image';
import sectors from '../assets/sectormap.png';
import PlanetTab from './PlanetTab';

function Canvas() {
  const [map, setMap] = useState([]);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [sectorsImage] = useImage(sectors);

  useEffect(() => {
    const getData = setInterval(() => {
      const sessionItems = JSON.parse(sessionStorage.getItem('HD2merged'));
      if (sessionItems === null) return console.log('No data');
      const ArrayPlanets = Array.isArray(sessionItems) ? sessionItems : Object.values(sessionItems);
      setMap(ArrayPlanets);
    }, 3000);

    return () => clearInterval(getData);
  }, []);

  const ownerColor = owner => {
    switch (owner) {
      case 1:
        return 'blue';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'white';
    }
  };

  const canvasSize = 1000;
  const padding = 50;
  console.log(hoveredPlanet)
  // Ensure there's a fallback if map is empty
  const minX = map.length ? Math.min(...map.map(planet => planet.position.x)) : 0;
  const maxX = map.length ? Math.max(...map.map(planet => planet.position.x)) : 1;
  const minY = map.length ? Math.min(...map.map(planet => planet.position.y)) : 0;
  const maxY = map.length ? Math.max(...map.map(planet => planet.position.y)) : 1;

  const normalize = (value, min, max) => {
    return ((value - min) / (max - min)) * (canvasSize - 2 * padding) + padding;
  };

  const reflectY = (value, min, max) => {
    const normalizedValue = normalize(value, min, max);
    return canvasSize - normalizedValue;
  };

  const factions = {
    1: {
      name: "Humans",
  },
    2: {
        name: "Terminids",
    },
    3: {
        name: "Automatons",
    },
    4: {
        name: "Illuminates",
    },
};

  const CustomTooltip = ({ planet }) => (
    <Group x={normalize(planet.position.x, minX, maxX) + 10} y={reflectY(planet.position.y, minY, maxY) - 10}>
      <Rect
        width={220}
        height={130}
        fill="#313131"
        shadowBlur={10}
        cornerRadius={5}
      />
      <Text text={`Owned by: ${factions[planet.statusAddition.owner].name}`} fontSize={15} padding={5} fill="yellow" />
      <Text text={`Name: ${planet.planetAddition.name}`} fontSize={15} padding={5} fill="white" y={25} />
      <Text text={`Sector: ${planet.planetAddition.sector}`} fontSize={15} padding={5} fill="white" y={45} />
      <Text text={`Active: ${planet.statusAddition.players} divers`} fontSize={15} padding={5} fill="white" y={65} />
      <Text text={`Progress: ${planet?.campaignAddition?.percentage? planet.campaignAddition.percentage.toFixed(2)+"%":"No Campaign"}`} fontSize={15} padding={5} fill="white" y={85} />

    </Group>
  );

  return (
    <Stage width={canvasSize} height={canvasSize}>
      <Layer>
        {sectorsImage && (
          <KonvaImage
            image={sectorsImage}
            x={-3}
            y={5}
            width={canvasSize}
            height={canvasSize}
            opacity={0.5}
          />
        )}
        {map.map((planet) => (
          <Circle
            key={planet.index}
            x={normalize(planet.position.x, minX, maxX)}
            y={reflectY(planet.position.y, minY, maxY)}
            radius={8}
            fill={ownerColor(planet.statusAddition.owner)}
            onMouseEnter={() => setHoveredPlanet(planet)}
            onMouseLeave={() => setHoveredPlanet(null)}
          />
        ))}
        {hoveredPlanet && <CustomTooltip planet={hoveredPlanet} />}
      </Layer>
    </Stage>
  );
}

export default Canvas;
