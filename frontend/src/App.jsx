import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Components
import { Register } from './Pages/Register/Register.jsx';
import Products from './Pages/Products/products.jsx';
import { Login } from './Pages/Login/Login';
import { CookiesProvider } from "react-cookie";

export const App = () => {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/cart' element={<Register />} />
          <Route path='/products' element={<Products />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<Navigate to='/login'/> } />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </CookiesProvider>

  )
}