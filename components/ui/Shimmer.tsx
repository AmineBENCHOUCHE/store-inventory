"use client"
import React, { ReactElement } from 'react'


const Shimmer = ({title, icon, handleClick, className}:{title:string, icon?:ReactElement, className?:string, handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>void;}) => {
    
   
    return (
       
            <button  onClick={handleClick} className="sm:gap-4 z-50 inline-flex h-6 md:h-12 sm:h-14 py-3 lg:h-20 line-clamp-1 text-xs gap-2 md:text-xl uppercase animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                {title}
                {icon}                
            </button>
    

    )
}

export default Shimmer
