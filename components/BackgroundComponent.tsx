import { Box } from '@mui/material'
import React from 'react'

const BackgroundComponent = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url('/robot_inventory.jpg') !important`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                opacity: 0.4, // Adjust the transparency here
                position: 'fixed',

            }}
        >
          

        </Box>
    )
}

export default BackgroundComponent
