import { IoDiamondSharp, IoSettings } from 'react-icons/io5'
import { Text } from '../atom/Text'
import SliderImg from '../../assets/slider/juksbucks.png'
import { FaEthereum, FaUserCog } from 'react-icons/fa'
import { ImageWrap } from '../atom/ImageWrap'

const JuksBucks = () => {
  return (
    <section className='w-full h-auto'>
      <main className='w-full py-32 px-6 flex flex-col md:grid md:grid-cols-2 gap-4'>
        <div className='w-full flex flex-col items-center md:items-start gap-3'>
          {/* <Text as={`h4`} className="uppercase font-semibold text-center md:text-left text-sm text-myGreen">
                        FFBgame Currency
                    </Text> */}
          <Text
            as={`h1`}
            className='lg:text-5xl text-center md:text-left font-extrabold tracking-[1px]
                            text-4xl font-barlow'
          >
            JuksBucks
          </Text>
          <Text
            as={`h4`}
            className='uppercase font-semibold text-center md:text-left text-sm text-myGreen'
          >
            One coin to play them all
          </Text>
          <div className='w-20 h-1.5 mt-3 bg-myGreen'></div>

          <section className='w-full mt-20 grid md:grid-cols-2 gap-x-4 gap-y-12'>
            {list.map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center md:items-start gap-5'
              >
                <div className='flex justify-start items-center gap-4 text-5xl text-myGreen rounded-full pl-2'>
                  {item.icon}
                  <Text
                    as='h3'
                    className='text-gray-100 font-medium text-xl font-belanosima'
                  >
                    {item.title}
                  </Text>
                </div>
                <Text as='p' className='text-gray-300 font-barlow text-lg'>
                  {item.description}
                </Text>
              </div>
            ))}
          </section>
        </div>

        <aside className='flex-1 flex flex-col justify-end items-center'>
          <ImageWrap
            image={SliderImg}
            className='w-[75%] md:w-[80%] lg:w-[75%] xxl:w-[60%] 2xl:w-[60%]'
            alt='Game-Avatar'
          />
        </aside>
      </main>
    </section>
  )
}

export default JuksBucks

type listType = {
  icon: JSX.Element
  title: string
  description: string
}

const list: listType[] = [
  {
    icon: <IoDiamondSharp />,
    title: 'Experience',
    description:
      'Our team has gained many years of experience building innovative solutions',
  },
  {
    icon: <FaUserCog />,
    title: 'Expert Teams',
    description: 'We have amazing set of Engineers from various tech stacks',
  },
  {
    icon: <FaEthereum />,
    title: 'Best NFT Game',
    description: 'We deliver only the best in the industry',
  },
  {
    icon: <IoSettings />,
    title: 'Global reach',
    description:
      'We have delivered services to clients from various countries and still counting',
  },
]
