import { Environment, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Gradient, LayerMaterial } from "lamina";
import { useState, useEffect } from "react";
import * as THREE from "three";

type BackgroundProps = {
  backgroundColors: React.MutableRefObject<{
    colorA: string;
    colorB: string;
  }>;
};

export const Background: React.FC<BackgroundProps> = ({ backgroundColors }) => {
  const start = 0.2;
  const end = -0.5;

  // Use useState to store and update colors
  const [colorA, setColorA] = useState(new THREE.Color(backgroundColors.current.colorA));
  const [colorB, setColorB] = useState(new THREE.Color(backgroundColors.current.colorB));

  useEffect(() => {
    // Whenever backgroundColors change, update the state
    setColorA(new THREE.Color(backgroundColors.current.colorA));
    setColorB(new THREE.Color(backgroundColors.current.colorB));
  }, [backgroundColors]);

  useFrame(() => {
    // Update the colors dynamically from backgroundColors ref
    const newColorA = new THREE.Color(backgroundColors.current.colorA);
    const newColorB = new THREE.Color(backgroundColors.current.colorB);
    if (!newColorA.equals(colorA)) {
      setColorA(newColorA);
    }
    if (!newColorB.equals(colorB)) {
      setColorB(newColorB);
    }
  });

  return (
    <>
      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
          <Gradient colorA={colorA} colorB={colorB} axes={"y"} start={start} end={end} />
        </LayerMaterial>
      </Sphere>
      <Environment resolution={256} frames={Infinity}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI}
        >
          <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
            <Gradient colorA={colorA} colorB={colorB} axes={"y"} start={start} end={end} />
          </LayerMaterial>
        </Sphere>
      </Environment>
    </>
  );
};
