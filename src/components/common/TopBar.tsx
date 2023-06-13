import React, { cloneElement } from 'react'
import useThemeModeStore from 'src/zustand/themeMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material'
import { themeModes } from 'src/configs/theme.config'
import MenuIcon from '@mui/icons-material/Menu'
import useAuthStore from 'src/zustand/auth'
import useAppStateStore from 'src/zustand/appState'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import menuConfigs from 'src/configs/menu.config'
import useAuthModalStore from 'src/zustand/authModal'
import Sidebar from './Sidebar'

const ScrollAppBar = ({ children, window }: { children: React.ReactElement; window?: () => Window }) => {
  const themeMode = useThemeModeStore((state) => state.themeMode)

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  })

  return cloneElement(children, {
    sx: {
      color: trigger ? 'text.primary' : themeMode === themeModes.dark ? 'primary.contrastText' : 'text.primary',
      backgroundColor: trigger ? 'background.paper' : themeMode === themeModes.dark ? 'transparent' : 'background.paper'
    }
  })
}

const TopBar = () => {
  const user = useAuthStore((state) => state.user)
  const appState = useAppStateStore((state) => state.appState)
  const themeMode = useThemeModeStore((state) => state.themeMode)
  const setAuthModalOpen = useAuthModalStore((state) => state.setAuthModalOpen)
  const setThemeMode = useThemeModeStore((state) => state.setThemeMode)

  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    setThemeMode(theme)
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <IconButton color='inherit' sx={{ mr: 2, display: { md: 'none' } }} onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>
            </Stack>
            <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
              <Logo />
            </Box>

            {/* main menu */}
            <Box flexGrow={1} alignItems='center' display={{ xs: 'none', md: 'flex' }}>
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit'
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? 'contained' : 'text'}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton
                sx={{
                  color: 'inherit'
                }}
                onClick={onSwithTheme}
              >
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>

            {/* user menu */}
            <Stack spacing={3} direction='row' alignItems='center'>
              {!user && (
                <Button variant='contained' onClick={() => setAuthModalOpen(true)}>
                  sign in{' '}
                </Button>
              )}
            </Stack>

            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  )
}

export default TopBar
