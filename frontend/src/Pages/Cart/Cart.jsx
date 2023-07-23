import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../components/AppBar/AppBar.jsx';
import MTable from '../../components/Table/Table.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CssBaseline } from '@mui/material';
import { request } from '../../utils/request.js';
import { closeAlert, showAlert } from '../../redux/alert/alertSice.js';


const defaultTheme = createTheme();

export default function Products() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cartPruchase = async () => {
    try {
      await request({ path: `api/carts/${cart.cartId}/purchase`, method: 'POST' })
      dispatch(showAlert({ message: 'Compra finalizada con éxito'}));
      setTimeout(() => dispatch(closeAlert()), 2000);
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ResponsiveAppBar/>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
        <MTable
          rowsData={cart.productList.map((({product: {_id: id, title, price, code, category}, quantity})=> ({ id, title, price, code, category, quantity })))}
          columns={[{ name: 'Nombre'}, { name: 'Precio'}, { name: 'Codigo'} ,{ name: 'Categoria'}, {name: 'Cantidad'}]}
          totalColumnId={'price'}
          footerButton={{ message: 'Finalizar Compra', onClick: cartPruchase}}
        />
        </Container>
      </main>
    </ThemeProvider>
  );
}
