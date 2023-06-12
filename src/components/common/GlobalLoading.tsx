import { LinearProgress, Paper, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import useGlobalLoadingStore from 'src/zustand/globalLoading'
import Logo from './Logo'

const GlobalLoading = () => {
  const globalLoading = useGlobalLoadingStore((state) => state.globalLoading)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [globalLoading])

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: 'none',
          transition: 'all .3s ease',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 999
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  )
}

export default GlobalLoading
