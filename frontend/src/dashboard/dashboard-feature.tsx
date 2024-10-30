// import { AppHero } from '../ui/ui-layout';
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Experience } from '../components/Experience'
// import { UI } from '../components/UI'
import { LoadingScreen } from '../components/LoadingScreen'
// import { PlayProvider } from '../contexts/Play'
import { useMemo } from 'react'
import { Overlay } from "../components/Overlay"
import { usePlay } from '../contexts/Play'
import { ScrollControls } from '@react-three/drei'

// const links: { label: string; href: string }[] = [
//   { label: 'Solana Docs', href: 'https://docs.solana.com/' },
//   { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
//   { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
//   { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
//   {
//     label: 'Solana Developers GitHub',
//     href: 'https://github.com/solana-developers/',
//   },
// ];
const audio = new Audio('./audios/Song Of Unity.mp3')

export default function DashboardFeature() {
  const { play, end } = usePlay()

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  )
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (start) {
      // audio.loop = true;
      // audio.play();
      if (typeof audio.loop == 'boolean') {
        audio.loop = true
      } else {
        audio.addEventListener(
          'ended',
          function () {
            this.currentTime = 0
            this.play()
          },
          false
        )
      }
      audio.play()
    }
  }, [start])

  return (
    <>
      <Canvas>
        <color attach='background' args={['#ececec']} />
        <Suspense fallback={null}>
          {start && (
            <>
              <ScrollControls
                pages={play && !end ? 20 : 0}
                damping={0.5}
                style={{
                  top: '10px',
                  left: '0px',
                  bottom: '10px',
                  right: '10px',
                  width: 'auto',
                  height: 'auto',
                  animation: 'fadeIn 2.4s ease-in-out 1.2s forwards',
                  opacity: 0,
                }}
              >
                <Experience />
              </ScrollControls>
            </>
          )}
        </Suspense>
        {effects}
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
      <Overlay />
      {/* <UI /> */}
    </>
  );
}
