import { useGLTF } from '@react-three/drei'
import { useRef, ReactNode } from 'react'
import { Group, Object3DEventMap } from 'three';

export const ModelSection = ({ title, ...props }: {
  title: ReactNode;
}) => {
  const group = useRef<Group<Object3DEventMap> | null>(null);
  const {scene} = useGLTF(`/models/${title}`)
  return (
    <group {...props}>
      <group ref={group} dispose={null}>
        <primitive object={scene} />
      </group>
    </group>
  )
}
