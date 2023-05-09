import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import ProductsList from '../../components/ProductList/ProductList';
import Layout from '../../components/Layout/Layout.jsx';
import Title from '../../components/Title/Title.jsx';

const Products = () => {
  const [state, setState] = useState({ products: [
    {name: 'Tomate', price: 1500, img: '/productos/tomate.jpg'},
    {name: 'Arbejas', price: 2500, img: '/productos/arbejas.jpg'},
    {name: 'Lechuga', price: 500, img: '/productos/lechuga.jpg'}
  ], cart: [], cartVisible: false });
  const { products, cart, cartVisible} = state;
  console.log("enPRodicts", cart);
  const addToCart = (product) => {
    const cartResult = cart.find(productsInCart => productsInCart.name === product.name);
    if(cartResult) cartResult.qty++;
    else cart.push({...product, qty: 1});
    return setState({...state, cart });
  }

  const showCart = () => {
    if(!cart.length) return;
    setState({ ...state, cartVisible: !cartVisible});
  }
  return (<div>
    <Navbar
      cart={cart}
      cartVisible={cartVisible}
      showCart={showCart}
    />
    <Layout>
      <Title>Tienda</Title>
      <ProductsList
        addToCart= {addToCart}
        products={products}
      />
    </Layout>
  </div>);
}

export default Products;