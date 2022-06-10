import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tooltip,
  MenuItem,
  Menu,
  Box,
  IconButton,
  Button,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Style } from '../../Themes/Theme.AppBar'

import AuthService from '../../Services/Api/Auth.Service'
import EventBus from '../../Services/Controller/EventBus'

class CustomAppBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorElNav: null,
      anchorElUser: null,
      inLogin: [
        {
          url: '/',
          text: 'Home',
        },
        {
          url: '/schedule',
          text: 'Schedule',
        },
        {
          url: '/report',
          text: 'Report',
        },
      ],
      inLoginAdmin: [
        {
          url: '/',
          text: 'Home',
        },
        {
          url: '/schedule',
          text: 'Schedule',
        },
        {
          url: '/report',
          text: 'Report',
        },
      ],
      outLogin: [
        {
          url: '/',
          text: 'Home',
        },
      ],
    }
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser,
    })

    EventBus.on('logout', () => {
      this.logOut()
    })
  }

  componentWillUnmount() {
    EventBus.remove('logout')
  }

  logOut() {
    AuthService.logout()
    window.location.reload()
  }

  handleOpenNavMenu = (event) => {
    this.setState({
      anchorElNav: event.currentTarget,
    })
  }

  handleOpenUserMenu = (event) => {
    this.setState({
      anchorElUser: event.currentTarget,
    })
  }

  handleCloseNavMenu = () => {
    this.setState({
      anchorElNav: null,
    })
  }

  handleCloseUserMenu = () => {
    this.setState({
      anchorElUser: null,
    })
  }

  render() {
    const { inLogin, inLoginAdmin, outLogin } = this.state
    const { user, client, admin } = this.props

    return (
      <AppBar color='primary'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography component='a' href='/' sx={Style.typographyWeb}>
              STATION
            </Typography>

            <Box sx={Style.boxMovil}>
              <IconButton
                size='large'
                onClick={this.handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>

              {user && client === 1 ? (
                <Menu
                  anchorEl={this.state.anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(this.state.anchorElNav)}
                  onClose={this.handleCloseNavMenu}
                  sx={Style.menuBar}
                >
                  {inLogin.map((p, index) => (
                    <MenuItem key={index} onClick={this.handleCloseNavMenu}>
                      <Typography
                        component='a'
                        href={p.url}
                        textalign='center'
                        sx={Style.typographyMenuMovil}
                      >
                        {p.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              ) : (
                <></>
              )}

              {user && admin === 2 ? (
                <Menu
                  anchorEl={this.state.anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(this.state.anchorElNav)}
                  onClose={this.handleCloseNavMenu}
                  sx={Style.menuBar}
                >
                  {inLoginAdmin.map((p, index) => (
                    <MenuItem key={index} onClick={this.handleCloseNavMenu}>
                      <Typography
                        component='a'
                        href={p.url}
                        textalign='center'
                        sx={Style.typographyMenuMovil}
                      >
                        {p.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              ) : (
                <></>
              )}

              {!user ? (
                <Menu
                  anchorEl={this.state.anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(this.state.anchorElNav)}
                  onClose={this.handleCloseNavMenu}
                  sx={Style.menuBar}
                >
                  {outLogin.map((p, index) => (
                    <MenuItem key={index} onClick={this.handleCloseNavMenu}>
                      <Typography
                        component='a'
                        href={p.url}
                        textalign='center'
                        sx={Style.typographyMenuMovil}
                      >
                        {p.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              ) : (
                <></>
              )}
            </Box>

            <Typography component='a' href='/' sx={Style.typographyMovil}>
              STATION
            </Typography>

            {user && client === 1 ? (
              <Box sx={Style.boxWeb}>
                {inLogin.map((p) => (
                  <Button
                    key={p.text}
                    component='a'
                    href={p.url}
                    onClick={this.handleCloseNavMenu}
                    sx={Style.buttonMenu}
                  >
                    {p.text}
                  </Button>
                ))}
              </Box>
            ) : (
              <></>
            )}

            {user && admin === 2 ? (
              <Box sx={Style.boxWeb}>
                {inLoginAdmin.map((p) => (
                  <Button
                    key={p.text}
                    component='a'
                    href={p.url}
                    onClick={this.handleCloseNavMenu}
                    sx={Style.buttonMenu}
                  >
                    {p.text}
                  </Button>
                ))}
              </Box>
            ) : (
              <></>
            )}

            {!user ? (
              <Box sx={Style.boxWeb}>
                {outLogin.map((p) => (
                  <Button
                    key={p.text}
                    component='a'
                    href={p.url}
                    onClick={this.handleCloseNavMenu}
                    sx={Style.buttonMenu}
                  >
                    {p.text}
                  </Button>
                ))}
              </Box>
            ) : (
              <></>
            )}

            {user ? (
              <Box sx={Style.boxAvatar}>
                <Tooltip title='Open Setting'>
                  <IconButton onClick={this.handleOpenUserMenu}>
                    <Typography sx={{ color: 'white' }}>
                      <AccountCircleIcon sx={{ color: 'white' }} />
                      {user.userData.username}
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={this.state.anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                  sx={{ mt: '45px' }}
                >
                  <MenuItem key='test' onClick={this.handleCloseUserMenu}>
                    <Button onClick={this.logOut}>LogOut</Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Typography
                component='a'
                href='/login'
                textalign='center'
                sx={Style.typographyMenuMovil}
              >
                Login In
              </Typography>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}

export default CustomAppBar
