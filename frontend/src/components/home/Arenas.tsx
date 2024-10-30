import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Text } from '../atom/Text'

const Arenas = () => {
  // Replace image paths with GLTF model paths
  const items = useMemo(
    () => [
      {
        model: '/models/low_poly_environment_jungle_scene.glb',
        title: 'Experience',
        description:
          'Our team has gained many years of experience building innovative solutions',
          scale: 0.2
      },
      {
        model: '/models/patch_of_heaven_-_the_white_tree.glb',
        title: 'Expert Teams',
        description: 'We have an amazing set of Engineers from various tech stacks',
        scale: 0.005
      },
      {
        model: '/models/the_mill.glb',
        title: 'Best NFT Game',
        description: 'We deliver only the best in the industry',
        scale: 2
      },
      {
        model: '/models/ile_volante.glb',
        title: 'Global reach',
        description:
          'We have delivered services to clients from various countries and still counting',
          scale: 2
      },
    ],
    []
  )

  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  return (
    <section className='w-full h-auto'>
      <main className='w-full py-12 px-6 flex flex-col md:grid md:grid-cols-2 gap-4'>
        {/* Text content */}
        <div className='w-full flex flex-col items-center md:items-start gap-3'>
          <Text
            as='h4'
            className='uppercase font-semibold text-center md:text-left text-sm text-myGreen'
          >
            POWERFUL SERVICES
          </Text>
          <Text
            as='h1'
            className='lg:text-5xl text-center md:text-left font-extrabold tracking-[1px] text-2xl font-barlow'
          >
            OUR POWERFUL SERVICES DONE ON TIME
          </Text>
          <div className='w-20 h-1.5 mt-3 bg-myGreen'></div>

          {/* Dynamic content */}
          <section className='w-full mt-20'>
            <div className='flex flex-col items-center md:items-start gap-5 w-full'>
              <Text as='h3' className='text-gray-100 font-medium text-xl font-belanosima'>
                {items[currentSlide].title}
              </Text>
              <Text
                as='p'
                className='text-gray-300 font-barlow text-lg text-center md:text-left'
              >
                {items[currentSlide].description}
              </Text>
            </div>
          </section>
        </div>

        {/* Canvas with prev/next buttons on top */}
        <aside className='w-full h-[70vh] relative hidden md:block'>
          <Canvas className='w-full h-full'>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            {/* Render 3D model based on the current slide */}
            <Model path={items[currentSlide].model} scale={items[currentSlide].scale}  />
          </Canvas>

          {/* Previous button */}
          <button
            onClick={handlePrev}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
          >
            <IoChevronBack size={30} />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
          >
            <IoChevronForward size={30} />
          </button>
        </aside>
      </main>

      {/* For smaller screens */}
      <aside className='w-full h-[400px] block md:hidden relative'>
        <Canvas className='w-full h-full'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={1} />
          {/* Render 3D model based on the current slide */}
          <Model path={items[currentSlide].model} scale={items[currentSlide].scale} />
        </Canvas>

        {/* Previous button */}
        <button
          onClick={handlePrev}
          className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
        >
          <IoChevronBack size={25} />
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
        >
          <IoChevronForward size={25} />
        </button>
      </aside>
    </section>
  )
}

export default Arenas

// Model component to load a GLTF model
function Model({ path, scale }: { path: string, scale:number }) {
  const { scene } = useGLTF(path)
  return (
    <>
      <primitive object={scene} scale={scale} />
      <OrbitControls />
    </>
  )
}

useGLTF.preload('/models/low_poly_environment_jungle_scene.glb')
useGLTF.preload('/models/patch_of_heaven_-_the_white_tree.glb')
useGLTF.preload('/models/the_mill.glb')
useGLTF.preload('/models/ile_volante.glb')
