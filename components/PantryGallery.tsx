"use client"

import { Box, Container, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { deleteItem, getPantryItems, getTodayDate } from '../src/firebase'
import { useEffect, useState } from "react";
import SearchComponent from './SearchComponent'


export type PantryItem = { id: string, name: string, qty: number, expired_date: string }

const CURRENT_DATE = getTodayDate();

const PantryGallery = () => {
    //state quantity
    const [quantity, setQuantity] = useState(1);

    //state for editing item

    const [pantryList, setPantryList] = useState<PantryItem[]>([])

    useEffect(() => { updatePantry() }, []);

    const updatePantry = async () => {

        const newPantryList = await getPantryItems()

        setPantryList(newPantryList);

    }
    const [searchWord, setSearchWord] = useState("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchWord = e.target.value.toLowerCase();
        setSearchWord(newSearchWord);

        if (newSearchWord === "") {
            updatePantry();
        } else {
            const filteredPantry = pantryList.filter(item =>
                item.name.toLowerCase().includes(newSearchWord)
            );
            setPantryList(filteredPantry);

            console.log(filteredPantry)
        }
    }


    //const pantryList = [{ name: 'apple', count: 5, expired_date: "2024-07-25" }, { name: 'banana', count: 10, expired_date: "2024-08-02" }]


    return (


        <Box width='100%' height='100%' display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} bgcolor={'#f0f0f0f'} gap={1} zIndex={10}>
            <SearchComponent searchWord={searchWord} handleSearch={handleSearch} />
            <Stack width="80vw" height='full' className='mt-10' >

                {pantryList.map(({ id, name, qty, expired_date }, index) => (
                    <Box key={index} display='flex' minHeight='100px' alignItems='center' justifyContent='center' gap={20}
                        style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                        <Typography variant="h3" textAlign='left' color={'#333'} sx={{ minWidth: 250 }}>
                            {/* //capitalize first letter */}
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                            {new Date(expired_date) < new Date(CURRENT_DATE) && " 🤢 "}
                        </Typography>
                        {/* //quantity dropdown */}
                        <Select sx={{ minWidth: 100 }}
                            defaultValue={qty}
                            value={qty}
                            label="Quantity"
                            inputProps={{
                                name: 'quantity',
                                id: 'uncontrolled-native',
                            }}
                            onChange={e => setQuantity(e.target.value as number)}
                        >
                            {Array.from({ length: 30 }, (_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </Select>
                        <Typography variant="h6" textAlign='left' color={'#333'}>
                            Expires: {expired_date}
                        </Typography>
                        <FaTrash cursor={'pointer'} size={60} color='#6F73D2' onClick={() => deleteItem(id, pantryList)} />
                    </Box>
                ))}
            </Stack>
        </Box>

    )
}



export default PantryGallery
