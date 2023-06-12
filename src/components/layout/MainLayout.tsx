import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Box display='flex' minHeight='100vh'>
        <Box component='main' flexGrow='1' overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default MainLayout
