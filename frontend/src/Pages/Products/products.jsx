
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../components/AppBar/AppBar.jsx';
import ProductsList from '../../components/ProductList/ProductList.jsx';
import { Container, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationOutlined from '../../components/Paginate/paginate.jsx';
import { getProducts } from '../../components/Product/product.js';


const defaultTheme = createTheme();

export default function Products() {
  const navigate = useNavigate();
  const [state, setState] = useState({ currentUser: null , products: [], paginateData: { page: 1 } });
  let { products, paginateData } = state;

  useEffect(() => {
    const setProducts = async () => {
      const response = await getProducts();
      if (!response) return navigate('login');
      const { payload, paginateData } = response
      setState(state => ({ ...state, products: payload, paginateData }));
    }
    setProducts();
  }, [navigate]);

  const handleChange = async (_event, page) => {
    const response = await getProducts(page);
    if (!response) navigate('login');
    const { payload, paginateData } = response;
    setState(state => ({ ...state, products: payload, paginateData }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ResponsiveAppBar/>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <ProductsList
            products={products}
          />
        </Container>
      </main>
      <PaginationOutlined
            count={paginateData.totalPages}
            page={paginateData.page}
            onChange={handleChange}
          />
    </ThemeProvider>
  );
}
