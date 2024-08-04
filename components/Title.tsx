import React from 'react'
import { TypewriterEffectSmooth } from "@/components/ui/TypewriterEffect";





const Title = () => {

    const words = [
        {
            text: "The Next",
        },
        {
            text: "Generation",
        },
        {
            text: "of",
        },
        {
            text: "Store Inventory",
            className: "dark:text-cyan-500",
        },
        {
            text: "enhanced by AI",
        },

    ];


    return (
        <TypewriterEffectSmooth words={words} className="p-20 z-10 flex-nowrap" />
    )
}

export default Title
