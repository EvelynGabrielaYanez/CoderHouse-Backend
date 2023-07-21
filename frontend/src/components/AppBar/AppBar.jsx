import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../../utils/constants';
import Cart from '../Cart/Cart.jsx';

const  defaultTheme = createTheme();

const logOut = async ({ token }) => {
  const loginResponse = await fetch(`${URL}/api/session/logout`, {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'Usuario o contraseña incorrectos',
    'default': 'Error inesperado en el servidor'
  };
  const message = loginResponse.status !== 200 ? (errorMessage[loginResponse.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);
  return loginResponse.json();
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const cartState = useSelector(state => state.cart);
  const { userId, userName ,cartId, productList } = cartState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pages = [ { displayName: 'Productos', href: '/products' }, {displayName: 'Carro', href: '/cart' } ];
  const settings = [{ displayName: 'Logout', onClick: async() => (await logOut()) && dispatch(logOutUser)}];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EGY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({displayName , href}) => (
                <MenuItem key={displayName} onClick={() => navigate(href)}>
                  <Typography textAlign="center">{displayName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EGY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ displayName , href }) => (
              <Button
                key={displayName}
                onClick={() => navigate(href)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {displayName}
              </Button>
            ))}
          </Box>
          <Cart anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu}/>
          <Box sx={{ my: 2, color: 'white', display: 'block' }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName ?? 'D'}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ displayName, onClick}) => (
                <MenuItem key={displayName} onClick={onClick}>
                  <Typography textAlign="center">{displayName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;