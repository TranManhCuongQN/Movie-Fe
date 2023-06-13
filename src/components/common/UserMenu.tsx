import React from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import useAuthStore from 'src/zustand/auth'
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import menuConfigs from 'src/configs/menu.config'

const UserMenu = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)

  const toggleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)

  return (
    <>
      {user && (
        <>
          <Typography variant='h6' sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={toggleMenu}>
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => {
              return (
                <ListItemButton component={Link} to={item.path} key={index} onClick={() => setAnchorEl(null)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<Typography textTransform='uppercase'>{item.display}</Typography>}
                  />
                </ListItemButton>
              )
            })}
            <ListItemButton sx={{ borderRadius: '10px' }} onClick={() => setUser(null)}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary={<Typography textTransform='uppercase'>sign out</Typography>} />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  )
}

export default UserMenu
