import { Text } from '../atom/Text';
import { useMemo } from 'react';
import { ImageWrap } from '../atom/ImageWrap';
import { creators } from '../../data/ContentData';
import { Button } from '../atom/Button';
import { MdArrowRightAlt } from 'react-icons/md';

import Img1 from '../../assets/creators/nft_img01.jpg';
import Img2 from '../../assets/creators/nft_img02.jpg';
import Img3 from '../../assets/creators/nft_img03.jpg';
import Avatar1 from '../../assets/creators/nft_avatar01.png';
import Avatar2 from '../../assets/creators/nft_avatar02.png';
import Avatar3 from '../../assets/creators/nft_avatar03.png';

const Collectibles = () => {
  const imgList = useMemo(() => [Img1, Img2, Img3], []);
  const avatartList = useMemo(() => [Avatar1, Avatar2, Avatar3], []);

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {creators.map((creator, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-4 p-6 bg-[#121a23] bg-[linear-gradient(0deg,#0c0e12_0%,rgba(31,41,53,0.36078)_100%)] rounded-md cursor-pointer border border-[rgba(76,76,76,0.2)] hover:border-[rgba(69,248,130,0.4)] md:w-[380px] w-full"
          style={{ margin: "20px" }} // Add margin around the cards
        >
          {/* Image container with increased size */}
          <div className="md:w-[200px] w-full">
            <ImageWrap
              image={imgList[index]}
              alt="Creator"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          {/* Content */}
          <div className="w-full h-full flex-1 flex-col justify-center items-start">
            <Text
              as="h4"
              className="uppercase text-gray-100 font-bold font-barlow text-xl"
            >
              {creator.title}
            </Text>
            <div className="w-full flex gap-4 items-center my-4">
              {/* Avatar */}
              <ImageWrap
                image={avatartList[index]}
                alt="Avatar"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <Text as="span" className="text-gray-400 font-medium font-barlow text-xl">
                {creator.createdBy}
              </Text>
              <Text
                as="span"
                className="flex border-l-2 uppercase border-gray-500 text-sm pl-4"
              >
                creator
              </Text>
            </div>

            {/* Price and button */}
            <div className="w-full py-4 flex justify-between px-4 items-center gap-4 rounded-md border border-[rgba(76,76,76,0.4)]">
              <Text as="p" className="flex items-center gap-2 font-bold text-gray-100">
                {creator.amount}
                <Text as="span" className=" text-myYellow font-bold font-barlow text-lg">
                  ETH
                </Text>
              </Text>
              <Button
                type="button"
                className="flex items-center gap-1 bg-myYellow hover:bg-myGreen text-myBlack px-4 rounded-md py-2"
              >
                <Text as="span" className="text-lg font-poppins">
                  Sell
                </Text>
                <MdArrowRightAlt className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collectibles;
