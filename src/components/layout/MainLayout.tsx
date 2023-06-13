import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthModal from '../common/AuthModal'
import Footer from '../common/Footer'
import GlobalLoading from '../common/GlobalLoading'
import TopBar from '../common/TopBar'

const MainLayout = () => {
  return (
    <>
      {/* GlobalLoading */}
      <GlobalLoading />

      {/* login modal */}
      <AuthModal />

      <Box display='flex' minHeight='100vh'>
        {/* header */}
        <TopBar />

        <Box component='main' flexGrow='1' overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default MainLayout
