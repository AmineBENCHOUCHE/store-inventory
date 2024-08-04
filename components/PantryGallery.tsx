"use client"

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Stack, Table, TextField, Typography } from '@mui/material'
import React from 'react'
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { deleteItem, getPantryItems, updateItem, getTodayDate, addItem } from '../src/firebase'
import { useEffect, useState } from "react";
import SearchComponent from './SearchComponent'
import { categories } from '@/lib/data'
import Shimmer from './ui/Shimmer'


export type PantryItem = { id: string, category: string, name: string, qty: number, expired_date: string }

const CURRENT_DATE = getTodayDate();

const PantryGallery = ({ isDemo }: { isDemo: boolean }) => {
    //state quantity
    const [item, setItem] = useState<PantryItem>({ id: '', category: '', name: '', qty: 1, expired_date: '' });
    const [qty, setQty] = useState(0)
    const [searchWord, setSearchWord] = useState("")
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<PantryItem>({ id: '', category: '', name: '', qty: 1, expired_date: '' });
    const [labelList, setLabelList] = useState<string[]>([]);


    //state for editing item
    const [pantryList, setPantryList] = useState<PantryItem[]>([])

    const handleDeleteDemo = (itemId: string, labelList: string[]) => {
        const filteredList = labelList.filter(label => label !== itemId);
        setLabelList(filteredList);
    }

    useEffect(() => { updatePantry() }, []);



    const updatePantry = async () => {

        const newPantryList = await getPantryItems()

        setPantryList(newPantryList);

    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchWord = e.target.value.toLowerCase();
        console.log(newSearchWord);
        setSearchWord(newSearchWord);

        if (newSearchWord === "") {
            updatePantry();
        } else {
            const filteredPantry = pantryList.filter(item =>
                item.name.toLowerCase().includes(newSearchWord)
            );
            setPantryList(filteredPantry);

        }
    }
    const handleOpen = () => setOpen(true);;
    const handleClose = (prev: boolean) => {
        setOpen(!prev)
        setSelected({ id: '', category: '', name: '', qty: 0, expired_date: '' })

    };

    const handleAdd = () => {
        handleOpen();
        console.log("Add item", item,);
        setSelected({ id: '', category: '', name: '', qty: 0, expired_date: '' })

    }
    const handleEdit = (itemID: string) => {
        handleOpen();
        console.log(itemID);
        const itemSelected = pantryList.find(item => item.id === itemID);
        if (itemSelected) {
            setSelected(itemSelected);
        } else {
            // Handle the case when no item is found (optional)
            console.warn(`Item with ID ${itemID} not found.`);
        }

    }


    // let pantryList = [{ id: "1", category: "Fruits", name: 'apple', qty: 5, expired_date: "2024-07-25" }, { id: "2", category: "Fruits", name: 'banana', qty: 10, expired_date: "2024-08-02" }]


    return (


        <div  className="flex flex-col align-center justify-center gap-2 z-10 xl:w-[40vw] w-full  h-fit ">
            {!isDemo && <SearchComponent isVisible={!isDemo} searchWord={searchWord} handleSearch={handleSearch} />}
            {!isDemo && <Stack height='full' className='mt-4 w-full  max-h-[500px]' >
                <Container className='h-fit  w-full'>
                    {pantryList.map(({ id, name, qty, expired_date }, index) => (

                        <div key={index} className=" flex justify-center align-center w-full">
                            <Box key={index}
                                className="flex justify-between items-center rounded-t-lg lg:min-h-[100px] min-h-[40px]  sm:gap-4 gap-2  w-full px-2 sm:px-4 md:px-8  bg-white md:hover:h-[115px] hover:ml-1"
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#172554' : '#06b6d4'
                                }}
                            >
                                <Typography variant="h4" textAlign='left' sx={{ maxWidth: 300 }}
                                    className="md:text-xl sm:text-xl text-sm  w-fit min-w-[10vw] lg:text-4xl text-slate-100 ">
                                    {/* //capitalize first letter */}
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                    {new Date(expired_date) < new Date(CURRENT_DATE) && " 🤢 "}
                                </Typography>
                                {/* //quantity  */}
                                <Typography className="text-xs sm:text-base md:text-xl lg:text-3xl  text-slate-100 text-center">


                                    {qty}
                                </Typography>
                                <Typography className="w-full  text-slate-100 ml-8 sm:text-sm sm:ml-16 md:ml-20 md:text-base lg:text-xl text-[10px] line-clamp-1">
                                    {`Exp: ${expired_date}`}
                                </Typography>
                                <div className='flex'>
                                    <FaEdit cursor={'pointer'} className="sm:w-16 sm:h-16 p-2 w-8 h-8 " onClick={() => handleEdit(id)} />
                                    <FaTrash cursor={'pointer'} className="sm:w-16 sm:h-16 p-2 h-8 w-8 " color='#6F73D2' onClick={() => deleteItem(id, pantryList)} />
                                </div>

                            </Box>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="flex flex-col rounded-xl justify-center items-center  w-[50vw] min-h-[400px] ml-[25%] mt-[10%] bg-slate-400">

                                    <Typography id="modal-modal-title" variant="h4" fontWeight={'bold'} color='#020617' mb={2}>
                                        {selected.id ? "Edit Item" : "Add Item"}
                                    </Typography>
                                    <Stack width={'80%'} direction={'column'} >
                                        <FormControl>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                id="categories"
                                                label="Category"
                                                value={selected?.category || item.category}
                                                fullWidth
                                                className='mb-4'
                                                onChange={(e) => {
                                                    selected.id ?
                                                    setSelected((prev) => ({ ...prev, category: e.target.value })) :
                                                    setItem((prev) => ({ ...prev, category: e.target.value }))
                                                }}
                                            >
                                                {categories.map((category, index) => (
                                                    <MenuItem key={index} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            <TextField
                                                id="filled-basic"
                                                label="Item"
                                                color='secondary'
                                                variant="standard"
                                                fullWidth
                                                className='mb-4'
                                                value={selected?.name || item.name}
                                                onChange={(e) => {
                                                    selected.id ?
                                                    setSelected(prev => ({ ...prev, name: e.target.value })) :
                                                    setItem(prev => ({ ...prev, name: e.target.value }))
                                                }}
                                            />

                                            <TextField
                                                id="filled-basic"
                                                label="Qty"
                                                color='secondary'
                                                variant="standard"
                                                fullWidth
                                                className='mb-4'
                                                value={selected.id? selected.qty.toString() : item.qty.toString()}
                                                onChange={(e) => {
                                                    const newQty = (e.target.value);
                
                                                    console.log(newQty)
                                                    if (selected.id) {
                                                        setSelected(prev => ({ ...prev, qty: Number(newQty) }));
                                                    } else {
                                                        setItem(prev => ({ ...prev, qty: Number(newQty)  }));
                                                    }
                                                }}
                                            />
                                            <TextField
                                                id="filled-basic"
                                                label="Expired date (yyyy-mm-dd)"
                                                color='secondary'
                                                variant="standard"
                                                fullWidth
                                                className='mb-4 text-slate-100 tracking-wider'
                                                value={selected?.expired_date || item.expired_date}
                                                onChange={(e) => {
                                                    console.log(item)
                                                    selected.id ? setSelected((prev) => ({ ...prev, expired_date: e.target.value })) :
                                                        setItem(prev => ({ ...prev, expired_date: e.target.value }))
                                                }}
                                            />
                                        </FormControl>
                                        <Button variant='contained' className='md:text-xl text-sm '
                                            sx={{
                                                color: '#020617',
                                                background: '#e8ffff',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    border: 'none',
                                                    variant: 'contained',
                                                    color: '#f1f5f9',
                                                    background: 'linear-gradient(to bottom , #020617 12%, #64748b 99%, #cbd5e1 100%)'
                                                },
                                            }}
                                            onClick={() => {
                                                console.log(selected)
                                                console.log(item)
                                                {
                                                    selected.id ?
                                                        updateItem(selected.id, selected) :
                                                        addItem(
                                                            {
                                                                category: item.category,
                                                                name: item.name,
                                                                qty: item.qty,
                                                                expired_date: item.expired_date
                                                            })
                                                }
                                                // reset of the input field
                                                updatePantry()
                                                setItem({ id: '', category: '', name: '', qty: 0, expired_date: '' })
                                                handleClose(open)
                                            }
                                            }>
                                            {selected.id ? "EDIT" : "ADD"}
                                        </Button>
                                    </Stack>
                                </Box>
                            </Modal>
                        </div>
                    ))
                    }
                </Container>
            </Stack>
            }

            {/* Button to open modal  */}

            {/* //render items Demo*/}
            {isDemo && labelList &&
                <Stack height='full' className='mt-10 w-[50vw] sm:w-[80vw] max-h-[500px]' >
                    <Container className='h-full  w-full '>
                        {labelList.map((label: string, index) => (
                            <Box key={index}
                            //         className="flex justify-between sm:min-h-[100px] min-h-[50px] 
                            // w-[80vw] md:w-[50vw] text-sm rounded-t-lg items-center gap-4 px-4 md:px-8 md:py-4 py-2  bg-white md:hover:h-[115px]  hover:ml-1" 
                            className="flex justify-between items-center rounded-t-lg sm:min-h-[100px] min-h-[50px]  sm:gap-4 w-[100%] px-10 sm:px-4 md:px-8 sm:w-[100%] bg-white md:hover:h-[115px] hover:ml-1" gap={20}
                            
                            style={{
                                backgroundColor: index % 2 === 0 ? '#172554' : '#06b6d4'
                            }}
                            >
                                <Typography variant="h4" textAlign='left' color={'#cbd5e1'} sx={{ minWidth: 200 }} className="text-2xl md:text-4xl">
                                    {/* //capitalize first letter */}
                                    {label.slice(1).charAt(0).toUpperCase() + label.slice(2)}
                                </Typography>
                                <FaTrash cursor={'pointer'} className="w-6 h-6" color='#6F73D2' onClick={() => handleDeleteDemo(label, labelList)} />
                            </Box>
                        ))}
                    </Container>
                </Stack>
            }
            <div className='flex justify-center items-centrer mt-10'>
                <Shimmer title="ADD" icon={<FaPlusCircle />} handleClick={handleAdd} className='w-20' />
            </div>
        </div>

    )
}



export default PantryGallery
