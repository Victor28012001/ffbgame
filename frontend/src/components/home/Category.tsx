import React, { useState } from 'react'
import Arenas from './Arenas'
import Badges from './Badges'
import Collectibles from './Collectibles'
import Characters from './Characters'
import JuksBucks from './JuksBucks'

// Define the categories
enum Categories {
  Characters = 'characters',
  Juksbucks = 'juksbucks',
  Badges = 'badges',
  Collectibles = 'collectibles',
  Arenas = 'arenas',
}

// Create a functional component
const CategoryComponent: React.FC = () => {
  // State to track the currently selected category
  const [selectedCategory, setSelectedCategory] = useState<Categories>(
    Categories.Characters
  )

  // Function to render content based on the selected category
  const renderContent = () => {
    switch (selectedCategory) {
      case Categories.Characters:
        return <Characters />
      case Categories.Juksbucks:
        return <JuksBucks/>
      case Categories.Badges:
        return <Badges/>
      case Categories.Collectibles:
        return <Collectibles/>
      case Categories.Arenas:
        return <Arenas/>
      default:
        return null
    }
  }

  return (
    <div className='category-container w-full'>
      {/* Category Selection */}
      <ul
        className="w-full flex justify-center relative gap-[15px_35px] px-0 py-[22px]
                            md:gap-[15px_30px]
                            sm:gap-[20px_25px]
                            xsm:gap-[20px_25px]"
      >
        {Object.values(Categories).map((category, index) => (
          <li className='relative z-[1]' key={index}>
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active bg-[#58105a] text-black' : ' bg-gray-700'} px-10 py-2 mx-2 rounded-xl transition duration-500 ease-in-out transform hover:-translate-y-1 text-xl font-belanosima hover:scale-110`}
              onClick={() => setSelectedCategory(category as Categories)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Render Content Based on Selected Category */}
      <div className='category-content'>{renderContent()}</div>
    </div>
  )
}

export default CategoryComponent
