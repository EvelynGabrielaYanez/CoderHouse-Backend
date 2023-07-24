import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert, showAlert } from '../../redux/alert/alertSice';
import { login } from './login';
import { setCartInfo } from '../../redux/cart/cartSlice';
import { getCartProducts, validateLogin } from '../../components/Cart/cart.js';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();
export default function Login() {
  const cartState = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    formData: {
      password: {
        value: '',
        errorMessage: ''
      },
      email: {
        value: '',
        errorMessage: ''
      }
    },
    loggedUser: false
  });
  const { formData } = state;
  useEffect(() => {
    let isSubscribed = true;
    try {
      const fetchData = async () => {
        const { logged, cartId: cid, userId: uid, products, userRole } = await validateLogin(cartState);
        if (!logged) return setState(state => ({ ...state, loggedUser: false }));
        if (isSubscribed && (uid !== cartState.userId || cid !== cartState.cartId)) {
          dispatch(setCartInfo({ cid, uid, products, userRole }));
        }
        if (isSubscribed) setState(state => ({ ...state, loggedUser: true }));
      }
      fetchData();
    } catch (error) {
      console.error(error);
      return setState(state => ({ ...state, loggedUser: false }));
    }
    return () => isSubscribed = false;
  }, [dispatch]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (Object.values(formData).find(({ errorMessage, value }) => errorMessage || !value.length)) throw new Error('Campos invalidos');
      const data = new FormData(event.currentTarget);
      const requestData = {
        email: data.get('email'),
        password: data.get('password')
      }
      const { token, userData: { _id: uid, cart: { _id: cid }, role: userRole } } = await login(requestData);
      Cookies.set('jwt', token);
      const { products } = await getCartProducts({ cid });
      dispatch(setCartInfo({ cid, uid, products, userRole }));
      navigate('/products');
    } catch (error) {
      dispatch(showAlert({ message: error.message }));
      setTimeout(() => dispatch(closeAlert()), 2000);
    }
    return false;
  };

  const isValidInput = ({ target: { value, type, id, required } }, typeValidate, size = null) => {
    try {
      if (required && !value.length) throw new Error('El campo es obligatorio');
      type = typeValidate || type;
      const validateInput = {
        email: (value) => /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(value),
        integer: (value) => /^\d+$/.test(value),
        text: (value) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-ZñÑáéíóúÁÉÍÓÚ ]*[a-zA-ZñÑáéíóúÁÉÍÓÚ])?$/.test(value),
      }
      const typeTranslate = {
        email: 'correo',
        integer: 'entero',
        text: 'texto sin cracteres especiales'
      }
      const validateInputFunction = validateInput[type];
      if (validateInputFunction && !validateInputFunction(value)) throw new Error(`El registro debe ser ${typeTranslate[type]}`);
      if (size && value.length < size) throw new Error(`El largo debe ser como máximo de ${size}`);
      setState({ ...state, formData: { ...formData, [id]: { value, errorMessage: null } } });
    } catch (error) {
      setState({ ...state, formData: { ...formData, [id]: { value, errorMessage: error.message } } });
    }
  }
  if (state.loggedUser) {
    return (<Navigate to='/products' />);
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs' sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 5,
            background: '#ffff',
            padding: 5
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: deepPurple[500], width: 70, height: 70 }}>
            <AccountCircleIcon sx={{ fontSize: 65 }} />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Iniciar sesión
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Direccion de Email'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
              error={!!formData.email.errorMessage}
              helperText={formData.email.errorMessage}
              onChange={event => isValidInput(event)}
              onBlur={event => isValidInput(event)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
              error={!!formData.password.errorMessage}
              helperText={formData.password.errorMessage}
              onChange={event => isValidInput(event)}
              onBlur={event => isValidInput(event)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: deepPurple[500] }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  ¿Olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  Registar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}