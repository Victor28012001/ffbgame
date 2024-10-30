import { ImageWrap } from '../atom/ImageWrap'
import bgImage from '../../assets/slider/slider_bg.jpg'
import shape01 from '../../assets/slider/slider_shape01.png'
import { Text } from '../atom/Text'
import { Button } from '../atom/Button'
// import SliderImg from '../../assets/slider/slider_img01.png'
import { useRef, useState } from 'react'
// import { useActiveAccount } from "thirdweb/react";
import { Link } from 'react-router-dom'
// import { createThirdwebClient } from "thirdweb";
// import { useConnectModal } from "thirdweb/react";
// import readGameState from "../../utils/readState.js"
// import { useNavigate } from 'react-router-dom'
// import { useProfileContext } from '../contexts/ProfileContext.js'
// import fetchNotices from '../../utils/readSubgraph.js'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'


const HeroSection = () => {
  // const activeAccount = useActiveAccount();
  const [isWalletConnected] = useState(false)
  const [isProfileFound] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStartBattle, setIsStartBattle] = useState(false)
  const [submiting] = useState(false)
  // const navigate = useNavigate()


  const handleModal = () => {
    setIsModalOpen(true)
  }

  const handleModal2 = () => {
    setIsStartBattle(false)
  }

  const Model = () => {
    const group = useRef<Group>(null);
    const { scene } = useGLTF(`/models/quit1.glb`)
    return (
      <group>
        <group ref={group} dispose={null} scale={4} position-y={-5} rotation={[Math.PI / 180 * 10, 0, 0]}>
          <primitive object={scene} />
        </group>
      </group>
    )
  }

  const BouncingCanvas = () => {
    const meshRef = useRef<Mesh>(null);

    // Use useFrame to animate the mesh
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) { // Ensure that meshRef.current is not null
          meshRef.current.position.y = Math.sin(t) * 0.5; // Bounce effect
          meshRef.current.rotation.y += 0.01; // Rotate slowly along the Z-axis
        }
    });

    return (
        <mesh ref={meshRef}>
            <Model />
            {/* <OrbitControls></OrbitControls> */}
        </mesh>
    );
};

  // fetchNotices("all_duels");

  const playgameButton = async () => {
    
  }


  return (
    <section
      className=" bg-center lg:h-[80vh] md:h-[50vh] h-screen w-full bg-cover z-[1] relative after:right-0 before:content-[''] before:absolute before:w-6/12 before:bg-[#58105a] before:h-[50px] before:left-0 before:bottom-0 before:clip-path-polygon-[0_0,_0_100%,_100%_100%] after:content-[''] after:absolute after:w-6/12 after:bg-[#58105a] after:h-[50px] after:left-auto after:bottom-0 after:clip-path-polygon-[100%_0,_0_100%,_100%_100%] xl:before:h-[40px] xl:after:h-[40px] lg:before:h-[30px] lg:after:h-[30px] md:before:h-[30px] md:after:h-[30px] sm:before:h-[20px] sm:after:h-[20px] 
        "
    >
      {/* banner */}
      <ImageWrap
        image={bgImage}
        alt='Banner'
        className='w-full h-full'
        objectStatus='object-cover'
      />

      {/* Start Shape */}
      <ImageWrap
        image={shape01}
        alt='Shape01'
        className='absolute left-[15%] top-[17%] md:left-[13%] md:top-[12%] sm:left-[11%] sm:top-[11%] '
        objectStatus='object-cover'
      />

      <ImageWrap
        image={shape01}
        alt='Shape02'
        className=' absolute left-[10%] bottom-[45%] md:left-[12%] md:bottom-[45%] sm:left-[10%] sm:bottom-[55%] '
        objectStatus='object-cover'
      />

      <ImageWrap
        image={shape01}
        alt='Shape03'
        className='absolute right-[47%] top-[20%] md:right-[53%] md:top-[15%] sm:right-[10%] sm:top-[17%] '
        objectStatus='object-cover'
      />

      <ImageWrap
        image={shape01}
        alt='Shape04'
        className='w-[80px] h-[80px] absolute right-[22%] top-[43%] xl:right-[40%] xl:top-[32%] lg:right-[40%] lg:top-[32%] md:right-[20%] md:top-[35%] sm:right-[14%] sm:top-[33%] '
        objectStatus='object-fill'
      />
      {/* Start Shape */}

      <main className='w-full h-full absolute top-0 inset-x-0 bg-gradient-to-b from-[#0f161b]/60 z-[10] flex md:flex-row flex-col-reverse lg:px-20 md:px-6 px-4'>
        <aside className='flex-1 flex flex-col -mt-10 md:mt-0 justify-center md:items-start items-center lg:gap-6 gap-4'>
          <Text
            as='h3'
            className='uppercase bg-gradient-to-r from-[#58105a]/30 text-[#58105a] px-8 py-3 rounded-md font-barlow font-bold tracking-widest lg:text-2xl md:text-lg text-base'
          >
            Fantasy football blockchain
          </Text>
          <Text
            as='h1'
            className='uppercase lg:text-8xl md:text-5xl text-4xl leading-[0.8] font-bold drop-shadow-[-1px_5px_0px_rgba(30,144,255,0.66)]
                         sm:drop-shadow-[-1px_5px_0px_rgba(30,144,255,0.66)] font-belanosima '
          >
            FfBgame
          </Text>
          <Button
            className='slider-cta-btn text-gray-100 md:text-base text-sm font-bold font-barlow px-4 py-2 flex justify-center items-center'
            onClick={playgameButton}
          >
            {submiting ? (
              <div className='animate-spin rounded-full ml-auto mr-auto h-6 w-6 border-t-2 border-b-2 border-yellow-900'></div>
            ) : (
              'SetUp Room'
            )}
          </Button>

          {/* <div className="my-4">
            <ExplorerLink
              path={`account/${address}`}
              label={ellipsify(address.toString())}
            />
          </div> */}

          {isWalletConnected && !isProfileFound && !isModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
              <div className='fixed inset-0 bg-[#e0ffe0] bg-opacity-60'></div>
              <div className='relative bg-black border-2 border-[#45f882] rounded-lg shadow-2xl p-6 max-w-sm w-full h-auto min-h-[300px] z-10 flex flex-col justify-between'>
                <button
                  onClick={handleModal}
                  className='text-white text-xl absolute top-4 right-4'
                >
                  &times;
                </button>
                <div className='flex-1 flex flex-col justify-center items-center'>
                  <h1 className='text-2xl text-white mb-4'>
                    You Don't Have a Profile Yet
                  </h1>
                </div>
                <div className='flex justify-center'>
                  <Link
                    to='/profile'
                    className='bg-[#45f882] text-black font-bold py-2 px-4 rounded-full hover:bg-green-500'
                  >
                    Create Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
          {isStartBattle && (
            <div className='fixed inset-0 flex items-center justify-center z-50 '>
              <div className='fixed inset-0 bg-[#596e59] bg-opacity-80 overflow-hidden'></div>
              <div className='relative bg-black border-2 border-[#45f882] rounded-lg shadow-2xl p-6 max-w-md w-full h-auto min-h-[300px] z-10 flex flex-col justify-between'>
                <button
                  onClick={handleModal2}
                  className='text-white text-xl absolute top-4 right-4'
                >
                  &times;
                </button>
                <div className='flex-1 flex flex-col justify-center items-center'>
                  <h1 className='text-2xl text-white mb-4'>Select Battle Type</h1>
                </div>
                <div className='flex justify-center flex-row gap-10'>
                  <Link
                    to='/aiduel'
                    className='bg-[#45f882] text-black font-semibold py-2 px-4 rounded-full hover:bg-green-500 font-belanosima'
                  >
                    Duel against AI
                  </Link>
                  <Link
                    to='/duels'
                    className='bg-[#45f882] text-black  font-semibold py-2 px-4 rounded-full hover:bg-green-500 font-belanosima'
                  >
                    Duel other Players
                  </Link>
                </div>
              </div>
            </div>
          )}
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
            <hemisphereLight
              groundColor={'#ffffff'}
              intensity={0.5}
            />

            <BouncingCanvas />
          </Canvas>
        </aside>
      </main>
    </section>
  )
}

export default HeroSection
