import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "../../Pages/Register/Register.jsx";
import Login from "../../Pages/Login/Login.jsx";
import { Alert } from "../../redux/alert/alert.jsx";
import Products from "../../Pages/Products/products.jsx";
import CartFinal from "../../Pages/Cart/Cart.jsx";

export const Router = () =>  {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/cart' element={<CartFinal />} />
      <Route path='/products' element={<Products />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={ <Login/>} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
    <Alert />
  </BrowserRouter>
  );
}