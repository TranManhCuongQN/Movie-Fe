import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import menuConfigs from 'src/configs/menu.config'
import { themeModes } from 'src/configs/theme.config'
import uiConfigs from 'src/configs/ui.config'
import useAppStateStore from 'src/zustand/appState'
import useAuthStore from 'src/zustand/auth'
import useThemeModeStore from 'src/zustand/themeMode'
import Logo from './Logo'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'

interface SidebarProps {
  open: boolean
  toggleSidebar: () => void
}
const Sidebar = ({ open, toggleSidebar }: SidebarProps) => {
  const user = useAuthStore((state) => state.user)
  const appState = useAppStateStore((state) => state.appState)
  const themeMode = useThemeModeStore((state) => state.themeMode)
  const setThemeMode = useThemeModeStore((state) => state.setThemeMode)

  const sidebarWidth = uiConfigs.size.sidebarWith

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    setThemeMode(theme)
  }

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width='100%' direction='row' justifyContent='center'>
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: '30px' }}>
        <Typography variant='h6' marginBottom='20px'>
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: '10px',
              merginY: 1,
              backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar()}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography textTransform='uppercase'>{item.display}</Typography>}
            />
          </ListItemButton>
        ))}

        {/* {user && (
          <>
            <Typography variant='h6' marginBottom='20px'>
              PERSONAL
            </Typography>
            {menuConfigs.main.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: '10px',
                  merginY: 1,
                  backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar()}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography textTransform='uppercase'>{item.display}</Typography>}
                />
              </ListItemButton>
            ))}
          </>
        )} */}
        <Typography variant='h6' marginBottom='20px'>
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform='uppercase'>
                {themeMode === themeModes.dark ? 'dark mode' : 'light mode'}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  )

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar()}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: sidebarWidth,
          borderRight: '0px'
        }
      }}
    >
      {drawer}
    </Drawer>
  )
}

export default Sidebar
