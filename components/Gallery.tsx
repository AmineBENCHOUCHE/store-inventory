import React, { useState } from 'react'
import CameraComponent from './CameraComponent'
import PantryGallery from './PantryGallery'
import Shimmer from './ui/Shimmer'
import { AiFillOpenAI } from 'react-icons/ai'

const Gallery = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [demo, setDemo] = useState(false);

    const handleDemo = () => {
        setDemo(true);
        setIsVisible(true);
        console.log(demo, "demo", isVisible, "isVisible")

    }
    const handleClassic = () => {
        setIsVisible(true);
        setDemo(false)
    }

    return (
        <div className='flex flex-col items-center 
        w-[100%]  h-full gap-4  '>
            <div className="relative flex gap-4 md:gap-8  mt-10 mb-10 md:mb-20 ">
                <Shimmer title={"Try the demo"} icon={<AiFillOpenAI size={32} />} handleClick={handleDemo} />
                <Shimmer title={"Classic"} handleClick={handleClassic} />
            </div>
            {demo && <CameraComponent isDemo={demo} />}
            {isVisible && <PantryGallery isDemo={demo} />}
            {/* <CustomModal isVisible={isVisible && !demo} /> */}
        </div>
    )
}

export default Gallery
