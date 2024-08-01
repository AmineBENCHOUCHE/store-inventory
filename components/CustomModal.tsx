"use client";

import React, { useState } from 'react'
import { Box, Button, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import { PantryItem } from './PantryGallery';
import { IoMdAddCircle } from 'react-icons/io';
import { addItem } from '../src/firebase';

const style = {

  width: 100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,


};

const CustomModal = () => {
  //Modal
  const [item, setItem] = useState<PantryItem>({ id: '', name: '', qty: 0, expired_date: '' });
  const [pantryList, setPantryList] = useState<PantryItem[]>([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>

      <Button variant={"outlined"} startIcon={<IoMdAddCircle size={48} color='primary.main'/>} onClick={handleOpen} sx={{
        backgroundColor: '#d9f1ff',
        fontSize: '2rem',
        width: '20rem',
        height: '4rem',
        color: 'primary.main',
        '&:hover': {
          backgroundColor: '',
          color: 'secondary.main',
        },
      }}>Add</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
        
      >
        <Box sx={style} className="flex flex-col justify-center items-center  w-[50vw] min-h-[400px] ml-[25%] mt-[10%] bg-[#FFF9D0]">
          Add item
          <Typography id="modal-modal-title" variant="h4" fontWeight={'bold'} color='#0F67B1' mb={2}>
            Add Item
          </Typography>
          <Stack width={'80%'} direction={'column'} >
            <Box gap={1} >
              <Select id="categories" label="Category" fullWidth className='mb-4' >
                <MenuItem value="">Select a category</MenuItem>
                <MenuItem value="fruit">Fruit</MenuItem>
                <MenuItem value="vegetable">Vegetable</MenuItem>
                <MenuItem value="dairy">Dairy</MenuItem>
                <MenuItem value="meat">Meat</MenuItem>
              </Select>
              <TextField id="filled-basic" label="Item" variant="filled" fullWidth  className='mb-4' value={item.name} onChange={(e) => setItem(prev => ({ ...prev, name: e.target.value }))} />
              <TextField id="filled-basic" label="Qty" type='number' variant="filled" fullWidth  className='mb-4' value={item.qty} onChange={(e) => setItem(prev => ({ ...prev, qty: Number(e.target.value) }))} />
              <TextField id="filled-basic" label="Expired date (yyyy-mm-dd)" variant="filled" fullWidth className='mb-4' value={item.expired_date} onChange={(e) => setItem(prev => ({ ...prev, expired_date: e.target.value }))} />
            </Box>
            <Button variant='outlined' 
              sx={{
                color: 'primary.main',
              
                background: '#FFF9D0',
                fontSize: '2rem',
                fontWeight: 'bold',
                width: 'full',
                height: '4rem',
                '&:hover': {
                  border: 'none',
                variant:'contained',
                color: '#0F67B1',
                 background: 'linear-gradient(to right bottom, #96C9F4 0%, #e8ffff 86%, rgba(255,255,255,1) 97%)'
                },
              }}
              onClick={() => {
                addItem({ name: item.name, qty: item.qty, expired_date: item.expired_date })
                // reset of the input field
                setItem({ id: '', name: '', qty: 0, expired_date: '' })
                handleClose()
              }
              }>
              ADD
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

export default CustomModal
