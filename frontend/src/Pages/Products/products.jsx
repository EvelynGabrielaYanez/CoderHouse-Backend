import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import ProductsList from '../../components/ProductList/ProductList';
import Layout from '../../components/Layout/Layout.jsx';
import Title from '../../components/Title/Title.jsx';
import { useNavigate } from 'react-router-dom';
import PaginationOutlined from '../../components/Paginate/paginate.jsx';

const getProducts = async (page = 1) => {
  let productsData = await fetch(`http://localhost:8080/api/products?page=${page}`, {
    method: "GET",
    headers: {
      'Authorization': 'bearer ' + document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1],
      'Content-Type': 'application/json'
    }
  })
  if (productsData.status !== 200) return null
  const { payload, ...paginateData } = await productsData.json();
  return { payload, paginateData }
}

const Products = () => {
  const [state, setState] = useState({ products: [], cart: [], cartVisible: false, paginateData: { page: 1 } });
  let { products, cart, cartVisible, paginateData } = state;
  const navigate = useNavigate();

  console.log(document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1]);

  useEffect(() => {
    const setProducts = async () => {
      const repsonse = await getProducts();
      if(!repsonse) navigate('login')
      const { payload, paginateData } = repsonse
      setState(state => ({ ...state, products: payload, paginateData }));
    }
    setProducts();
  },[navigate]);

  const addToCart = (product) => {
    const cartResult = cart.find(productsInCart => productsInCart.name === product.name);
    if (cartResult) cartResult.qty++;
    else cart.push({ ...product, qty: 1 });
    return setState({ ...state, cart });
  }

  const handleChange = async (event, page) => {
    const response = await getProducts(page)
    if(!response) navigate('login')
    const { payload, paginateData } = response;
    setState(state => ({ ...state, products: payload, paginateData }));
  }
  const showCart = () => {
    if (!cart.length) return;
    setState({ ...state, cartVisible: !cartVisible });
  }
  console.log(paginateData)
  return (<div>
    <Navbar
      cart={cart}
      cartVisible={cartVisible}
      showCart={showCart}
    />
    <Layout>
      <Title>Tienda</Title>
      <ProductsList
        addToCart={addToCart}
        products={products}
      />
    </Layout>
    <PaginationOutlined
      count={paginateData.totalPages}
      page={paginateData.page}
      onChange={handleChange}
    />
  </div>);
}

export default Products;