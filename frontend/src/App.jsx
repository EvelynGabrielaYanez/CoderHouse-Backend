import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Components
import Register from './Pages/Register/Register.jsx';
import Products from './Pages/Products/products.jsx';
import Login from './Pages/Login/Login.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import { Alert } from './redux/alert/alert.jsx';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Products />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
      <Alert />
    </BrowserRouter>
  )
}