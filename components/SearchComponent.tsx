'use client'
import React, { useState } from 'react'
import { PantryItem } from './PantryGallery'
import { FaSearch } from 'react-icons/fa'

const SearchComponent = ({ searchWord, handleSearch }: { searchWord: string, handleSearch: React.ChangeEventHandler<HTMLInputElement> }) => {

    return (
        <div className='flex'>
            <input type="search" name="search" id="search" placeholder='Search an item'
                value={searchWord}
                className='p-4 text-2xl min-w-[50vw] text-black'
                onChange={handleSearch}
            />

        </div>
    )
}

export default SearchComponent
