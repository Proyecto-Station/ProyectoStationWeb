import React, { useState } from 'react'

import { AppBar, Toolbar, Container, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip } from '@mui/material'
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material'

const Style = {
  textTitleWeb: {
    mr: 2,
    display: {
      xs: 'none',
      md: 'flex'
    },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none'
  },
  textTitleMovil: {
    mr: 2,
    display: {
      xs: 'flex',
      md: 'none'
    },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  textTitleWebNoData: {
    mr: 'auto',
    ml: 'auto',
    display: {
      xs: 'none',
      md: 'block'
    },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none'
  },
  textTitleMovilNoData: {
    mr: 'auto',
    ml: 'auto',
    display: {
      xs: 'block',
      md: 'none'
    },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  boxMovil: {
    flexGrow: 1,
    display: {
      xs: 'flex',
      md: 'none'
    }
  },
  boxWeb: {
    flexGrow: 1,
    display: {
      xs: 'none',
      md: 'flex'
    }
  },
  menuMovil: {
    display: {
      xs: 'block',
      md: 'none'
    }
  },
  button: {
    my: 2,
    color: 'white',
    display: 'block'
  }
}

const pages = {
  client: [
    {
      url: '/',
      name: 'Inicio'
    },
    {
      url: '/schedule',
      name: 'Horarios'
    },
    {
      url: '/report',
      name: 'Reportes'
    }
  ],
  admin: [
    {
      url: '/',
      name: 'Inicio'
    },
    {
      url: '/schedule',
      name: 'Horarios'
    },
    {
      url: '/newuser',
      name: 'Clientes'
    },
    {
      url: '/report',
      name: 'Reportes'
    }
  ]
}

function NavBarMenu() {

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const data = JSON.parse(localStorage.getItem('data'))

  return (
    <>
    { data && (
      <AppBar>
        <Container maxWidth='x1'>
          <Toolbar>
            <Typography variant='h6' noWrap component='a' href='/' sx={Style.textTitleWeb}>STATION</Typography>

            { data.userData.permission === 1 && (
              <Box sx={Style.boxMovil} >
                <IconButton size='large' onClick={(e) => setAnchorElNav(e.currentTarget)} color='inherit' >
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)} sx={Style.menuMovil}>
                  { pages.client.map((p, i) => (
                    <MenuItem component='a' href={p.url} key={i}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

            { data.userData.permission === 2 && (
              <Box sx={Style.boxMovil} >
                <IconButton size='large' onClick={(e) => setAnchorElNav(e.currentTarget)} color='inherit' >
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)} sx={Style.menuMovil}>
                  { pages.admin.map((p, i) => (
                    <MenuItem component='a' href={p.url} key={i}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

            <Typography variant='h6' noWrap component='a' href='/' sx={Style.textTitleMovil}>STATION</Typography>

            { data.userData.permission === 1 && (
              <Box sx={Style.boxWeb}>
                { pages.client.map((p, i) => (
                  <Button component='a' href={p.url} key={i} onClick={() => setAnchorElNav(null)} sx={Style.button}>
                    {p.name}
                  </Button>
                ))}
              </Box>
            )}

            { data.userData.permission === 2 && (
              <Box sx={Style.boxWeb}>
                { pages.admin.map((p, i) => (
                  <Button component='a' href={p.url} key={i} onClick={() => setAnchorElNav(null)} sx={Style.button}>
                    {p.name}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Opciones'>
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0, color: 'inherit' }}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={() => setAnchorElUser(null)}>
                  <Typography textalign='center'>Hola</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )}

    { !data && (
      <AppBar>
        <Container>
          <Toolbar>
            <Typography variant='h6' noWrap component='a' href='/' sx={Style.textTitleWebNoData}>STATION</Typography>

            <Typography variant='h6' noWrap component='a' href='/' sx={Style.textTitleMovilNoData}>STATION</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    )}
    </>
  )
}

export default NavBarMenu
