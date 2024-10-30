// import { ImageWrap } from '../atom/ImageWrap'
import MaxWrapper from '../shared/MaxWrapper'
// import Img1 from '../../assets/creators/nft_img01.jpg'
// import Img2 from '../../assets/creators/nft_img02.jpg'
// import Img3 from '../../assets/creators/nft_img03.jpg'
// import Avatar1 from '../../assets/creators/nft_avatar01.png'
// import Avatar2 from '../../assets/creators/nft_avatar02.png'
// import Avatar3 from '../../assets/creators/nft_avatar03.png'
// import tab1 from '../../assets/tab/about_tab01.png'
// import tab2 from '../../assets/tab/about_tab02.png'
// import tab3 from '../../assets/tab/about_tab03.png'
// import tab4 from '../../assets/tab/about_tab04.png'
// import tab5 from '../../assets/tab/about_tab05.png'
// import tab6 from '../../assets/tab/about_tab06.png'
// import { useMemo, useState } from 'react'
import { Text } from '../atom/Text'
// import { Button } from '../atom/Button'
// import { MdArrowRightAlt } from 'react-icons/md'
// import { creators } from '../../data/ContentData'
import CategoryComponent from './Category'

// type tabButtonObj = {
//   name: string
//   img: string
// }

// const tabButton: tabButtonObj[] = [
//   {
//     name: 'tabOne',
//     img: tab1,
//   },
//   {
//     name: 'tabTwo',
//     img: tab2,
//   },
//   {
//     name: 'tabThree',
//     img: tab3,
//   },
//   {
//     name: 'tabFour',
//     img: tab4,
//   },
//   {
//     name: 'tabFive',
//     img: tab5,
//   },
//   {
//     name: 'tabSix',
//     img: tab6,
//   },
// ]

const Creators = () => {

  return (
    <MaxWrapper className='w-full flex justify-center md:py-24 py-16'>
      <section className='flex md:flex-row flex-col flex-wrap justify-center gap-6 w-full px-8 md:px-0'>
        <div className='flex flex-wrap mx-[-15px]  justify-center '>
          <div className='w-full relative md:px-[15px] px-6'>
            <div className="text-center mb-[60px] relative after:content-[''] after:block after:bg-myGreen after:w-[65px] after:h-[5px] after:mt-5 after:mb-0 after:mx-auto">
              <Text
                as='span'
                className='block uppercase text-[14px] tracking-[2px] font-semibold text-[#58105a] leading-none mt-0 mb-[7px] mx-0  sm:mt-0 sm:mb-2.5 sm:mx-0 xsm:mt-0 xsm:mb-2.5 xsm:mx-0'
              >
                Here are your Digital Assets
              </Text>
              <Text
                as='h3'
                className=' md:text-[45px] text-center mt-2 text-4xl font-extrabold tracking-[1px] m-0
                            sm:text-[25px] sm:leading-[1.1] text-lg
                            xsm:text-[25px] uppercase xsm:leading-[1.1] text-lg
                            '
              >
                Characters, Juksbucks, Arenas, Collectibles And Badges
              </Text>
            </div>
          </div>
        </div>
        <CategoryComponent/>
      </section>
    </MaxWrapper>
  )
}

export default Creators
