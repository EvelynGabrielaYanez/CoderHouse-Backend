import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "../Cart/Cart.jsx";
import Register from "../../Pages/Register/Register.jsx";
import Login from "../../Pages/Login/Login.jsx";
import { Alert } from "../../redux/alert/alert.jsx";
import Products from "../../Pages/Products/products.jsx";
import { useUserLogged } from "../UserLog/UserLog.jsx";

export const Router = () =>  {
  const logged = useUserLogged();
  return(    <BrowserRouter>
    <Routes>
      <Route path='/cart' element={<Cart />} />
      <Route path='/products' element={<Products />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={ <Login/>} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
    <Alert />
  </BrowserRouter>
  //   <BrowserRouter>
  //   <Routes>
  //     <Route path='/cart' element={logged ? <Cart /> : <Navigate to='/login'/>} />
  //     <Route path='/products' element={logged ? <Products /> : <Navigate to='/login'/>}/>
  //     <Route path='/register' element={logged ? <Register /> : <Navigate to='/login'/>} />
  //     <Route path='/login' element={logged ? <Navigate to='/login'/> : <Login/>} />
  //     <Route path='*' element={<Navigate to='/login' />} />
  //   </Routes>
  //   <Alert />
  // </BrowserRouter>
  );
}