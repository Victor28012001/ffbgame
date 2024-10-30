import { useProgress } from '@react-three/drei'
import { usePlay } from '../contexts/Play'
import { Link } from 'react-router-dom'
import './style.css'
import { ReactElement, JSXElementConstructor, ReactNode, useState } from 'react'

import { FaDiscord } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaYoutube } from 'react-icons/fa'

const socialMediaLinks = [
  { name: 'Discord', url: 'https://discord.com', icon: <FaDiscord color='gold' /> },
  { name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebookF color='gold' /> },
  { name: 'Twitter', url: 'https://twitter.com/the-FFBgame2024', icon: <FaXTwitter color='gold' /> },
  { name: 'Youtube', url: 'https://youtube.com', icon: <FaYoutube color='gold' /> },
]

const SocialMediaDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div
      className='relative inline-block cursor-pointer'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className=' bg-transparent text-sm md:text-lg'>Socials</button>

      <div
        className={`absolute right-0 mt-2 w-36 overflow-hidden transition-all duration-600 ${
          isOpen ? 'max-h-120' : 'max-h-0 invisible'
        }`}
      >
        <div className='flex flex-col p-2'>
          {socialMediaLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className={`flex justify-between items-center hover:text-[#FFD700] p-2 transition-transform duration-200`}
              style={{
                transform: isOpen ? `translateY(${index * 6}px)` : 'translateY(0)',
                opacity: isOpen ? 1 : 0,
                transitionDelay: isOpen ? `${index * 100}ms` : '0ms', // Staggered delay
              }}
            >
              {social.name}
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const produceSpans = (text: string, animation: string) => {
  return text
    .split('')
    .map(
      (
        letter:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | null
          | undefined,
        index: number
      ) => (
        <span
          key={index}
          className={`inline-block transform-style-3d origin-bottom ${animation}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      )
    )
}

const Position = () => {
  return (
    <div className='relative cursor-pointer font-medium text-white text-[16px] xs:text-[20px] sm:text-[20px] md:text-[26px] 2xl:text-[18px] leading-[32px] 2xl:leading-[40px] w-full flex justify-center items-center'>
      <div className='absolute inset-0 top-[-30px] sm:top-[-10px] lg:top-0 flex flex-col'>
        <div
          className='text border md:px-12 overflow-hidden first absolute left-1 md:left-2 2xl:left-4 flex will-change-transform'
          aria-label='Software Developer'
        >
          {produceSpans('White Paper', 'animate-textRotate1')}
        </div>
        <div
          className='text second md:px-12 overflow-hidden absolute left-1 md:left-2 2xl:left-4 flex will-change-transform'
          aria-label='Content Creator'
        >
          {produceSpans('White Paper', 'animate-textRotate2')}
        </div>
        <div className='absolute left-4 hidden md:block md:left-2 2xl:left-6 top-2 flex items-center z-1'>
          {/* Replace with your hamburger icon component or HTML */}
          <button className='text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export const Overlay = () => {
  // const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const { progress } = useProgress()
  const { play, setPlay, hasScroll } = usePlay()

  return (
    <>
      <div className='z-[5] absolute top-7 md:top-14 right-6 text-white font-black text-lg'>
        <SocialMediaDropdown />
      </div>
      <div className='absolute top-14 md:top-7 left-4'>
        <Link to='/whitepaper'>
          <Position />
        </Link>
      </div>
      <div className='absolute bottom-14 md:bottom-7 right-8'>
        <Link to='/Home'>
          <h1>Skip</h1>
        </Link>
      </div>
      <div
        className={`overlay ${play ? 'overlay--disable' : ''}
    ${hasScroll ? 'overlay--scrolled' : ''}`}
      >
        <div className={`loader ${progress === 100 ? 'loader--disappear' : ''}`} />
        {progress === 100 && (
          <div className={`intro ${play ? 'intro--disappear' : ''}`}>
            <h1 className='logo font-custom'>FFBGame</h1>
            <p className='intro__scroll mb-4'>Scroll to begin the journey</p>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 100 150'
              width='100'
              height='150'
              className='intro__scroll'
            >
              {/* <!-- Mouse Outline --> */}
              <rect
                x='30'
                y='20'
                rx='20'
                ry='30'
                width='60'
                height='120'
                fill='none'
                stroke='#ffffff'
                strokeWidth='2'
              />

              {/* <!-- Scroll Wheel --> */}
              <rect
                id='scroll-wheel'
                x='50'
                y='40'
                rx='2'
                ry='2'
                width='20'
                height='20'
                fill='none'
                stroke='#ffffff'
                strokeWidth='2'
              />
            </svg>
            <button
              className='explore type:l2 util:reset-btn'
              onClick={() => {
                setPlay(true)
              }}
            >
              Explore
            </button>
          </div>
        )}
        {/* <div className={`outro ${end ? 'outro--appear' : ''}`}>
        <p className='outro__text'>Wish you had a great flight with us...</p>
      </div> */}
      </div>
    </>
  )
}
