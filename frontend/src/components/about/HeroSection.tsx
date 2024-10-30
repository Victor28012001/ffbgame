import { ImageWrap } from '../atom/ImageWrap'
import { Text } from '../atom/Text'
import bgImage from '../../assets/img/breadcrumb_bg01.jpg'
// import SliderImg from '../../assets/img/breadcrumb_img01.png'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh, Group } from 'three'

const HeroSection = () => {
  const Model = () => {
    const group = useRef<Group>(null)
    const { scene } = useGLTF(`/models/the_book.glb`)
    console.log(scene)
    return (
      <group>
        <group
          ref={group}
          dispose={null}
          scale={14}
          position-y={-2}
          rotation={[(Math.PI / 180) * 330, 0, 0]}
        >
          <primitive object={scene} />
        </group>
      </group>
    )
  }

  const BouncingCanvas = () => {
    const meshRef = useRef<Mesh>(null!)

    // Use useFrame to animate the mesh
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      meshRef.current.position.y = Math.sin(t) * 0.5 // Bounce effect
    })

    return (
      <mesh ref={meshRef}>
        <Model />
        {/* <OrbitControls/> */}
      </mesh>
    )
  }
  return (
    <section
      className="bg-center lg:h-[60vh] md:h-[40vh] h-[70vh] w-full bg-cover z-[1] relative after:right-0 before:content-[''] before:absolute before:w-6/12 before:bg-[#58105a] before:h-[50px] before:left-0 before:bottom-0 before:clip-path-polygon-[0_0,_0_100%,_100%_100%] after:content-[''] after:absolute after:w-6/12 after:bg-[#58105a] after:h-[50px] after:left-auto after:bottom-0 after:clip-path-polygon-[100%_0,_0_100%,_100%_100%] xl:before:h-[40px] xl:after:h-[40px] lg:before:h-[30px] lg:after:h-[30px] md:before:h-[30px] md:after:h-[30px] sm:before:h-[20px] sm:after:h-[20px] 
        "
    >
      {/* banner */}
      <ImageWrap
        image={bgImage}
        alt='Banner'
        className='w-full h-full'
        objectStatus='object-cover'
      />

      <main className='w-full h-full absolute top-0 inset-x-0 bg-gradient-to-b from-[#0f161b]/60 z-[10] flex md:flex-row flex-col-reverse lg:px-10 md:px-6 px-4'>
        <aside className='flex-1 flex flex-col -mt-10 md:mt-0 justify-center md:items-start items-center lg:gap-4 gap-4 lg:pl-20'>
          <Text
            as='h1'
            className='uppercase lg:text-5xl md:text-4xl text-4xl leading-[0.8] font-extrabold font-barlow '
          >
            About FFBgame
          </Text>
          <ul className='flex gap-3 justify-start items-center'>
            <li className='text-myGreen font-medium text-lg tracking-wide font-belanosima'>
              <Link to='/'>Home</Link>
            </li>
            <li className='w-2 h-2 bg-myGreen rounded-full'></li>
            <li className='font-medium text-lg tracking-wide font-belanosima'>About</li>
          </ul>
        </aside>
        <aside className='flex-1 flex flex-col justify-end items-center'>
          <Canvas>
            <ambientLight intensity={0.3} />

            {/* Directional Light */}
            <directionalLight position={[5, 10, 7]} intensity={1} castShadow />

            {/* Point Light */}
            <pointLight
              position={[10, 10, 10]}
              intensity={0.8}
              distance={50}
              decay={2}
              castShadow
            />

            {/* Hemisphere Light */}
            <hemisphereLight groundColor={'#ffffff'} intensity={0.5} />

            <BouncingCanvas />
          </Canvas>
        </aside>
      </main>
    </section>
  )
}

export default HeroSection
