// import { Buffer } from 'buffer';

// window.Buffer = Buffer;
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Experience } from './components/Experience'
import ScrollToTop from './utils/ScrollToTop'
import { Toaster } from 'sonner'
import ScrollButton from './components/shared/ScrollButton'
import { LoadingScreen } from './components/LoadingScreen'
import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from './routes'
import { Route, Routes, useLocation } from 'react-router-dom'
import './styles/main.css'
import { PlayProvider } from './contexts/Play'
import { useMemo } from 'react'
import { Overlay } from './components/Overlay'
import { usePlay } from './contexts/Play'
import { BrowserRouter as Router } from 'react-router-dom'
import { ClusterProvider } from './cluster/cluster-data-access'
import { SolanaProvider } from './solana/solana-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import '@solana/wallet-adapter-react-ui/styles.css'
// import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'

import { ProfileProvider } from './components/contexts/ProfileContext'
import { ScrollControls } from '@react-three/drei'
import PageNotFound from './utils/PageNotFound'
// import Chat from './pages/Chat'
import { Preloader } from './utils/Preloader'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import 'react-multi-carousel/lib/styles.css'
import Chatroom from './components/chat/Chatroom'
const audio = new Audio('./audios/Song Of Unity.mp3')
import './index.css'

export default function Main() {
  const { play, end } = usePlay()

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  )

  // const [error, setError] = useState('')
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

  // var myAudio = new Audio('someSound.ogg');

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
  )
}

// Parent component
function App() {
  const location = useLocation()

  // Define routes where you don't want the Header and Footer to render
  const noHeaderFooterRoutes = ['/', '/whitepaper'] // Customize as needed
  const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname)

  return (
    <>
      {shouldRenderHeaderFooter && <Header />}
      <Suspense fallback={<Preloader />}>
        <Routes>
          {routes.map(({ path, component: Component }, index) => (
            <>
              <Route
                key={index}
                index={path === '/'}
                path={path}
                element={<Component />}
              />
              <Route path='/chatroom/:roomName' element={<Chatroom />} />
            </>
          ))}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
      {shouldRenderHeaderFooter && <Footer />}
      {shouldRenderHeaderFooter && <ScrollToTop />}
      {shouldRenderHeaderFooter && <ScrollButton />}
      {shouldRenderHeaderFooter && <Toaster richColors />}
    </>
  )
}

// const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={client}>
        <ClusterProvider>
          <SolanaProvider>
            <PlayProvider>
              <ProfileProvider>
                <App />
              </ProfileProvider>
            </PlayProvider>
          </SolanaProvider>
        </ClusterProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
)
