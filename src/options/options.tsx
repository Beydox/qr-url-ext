import { createRoot } from 'react-dom/client'
import { Box, Typography } from "@mui/material"
import React from 'react'


const App = () => {
    return (
        <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
        <Typography variant="h5">This is a sample for Option's Page!</Typography>
        </Box>
    )
}



const container = document.createElement('div')
const root = createRoot(container)
document.body.appendChild(container)
root.render(<App />)