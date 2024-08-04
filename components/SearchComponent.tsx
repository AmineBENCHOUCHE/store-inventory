'use client'
import React, { useState } from 'react'
import { PantryItem } from './PantryGallery'
import { FaSearch } from 'react-icons/fa'

const SearchComponent = ({ searchWord, handleSearch, isVisible = false }: { searchWord: string, handleSearch: React.ChangeEventHandler<HTMLInputElement>, isVisible: boolean }) => {

    return (
        <>
            {isVisible && <div className='flex items-center pr-4   border border-slate-400 rounded-lg'>
                <input type="search" name="search" id="search" placeholder='Search an item'
                    value={searchWord}
                    className='p-2 sm:p-4 w-full bg-transparent focus:outline-none text-sm sm:text-base md:text-xl text-slate-100'
                    onChange={handleSearch}
                />
                <FaSearch size={22} />

            </div>
            }
        </>
    )
}

export default SearchComponent
