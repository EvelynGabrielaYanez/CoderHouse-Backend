import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import { Register } from './Pages/Register/Register.jsx';
import Products from './Pages/Products/products.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { Login } from './Pages/Login/Login';
import { useState } from 'react';

export const App = () => {
  const [{ loged }, setState] = useState({ loged: false });
  const loger = (logState) => {
    setState({ loged: logState});
  }
  return (
    <>
      <BrowserRouter>
        {loged ? <Navbar/> : null}
        <Routes>
          <Route path='/cart' element={<Register />} />
          <Route path='/products' element={<Products />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login loger={loger}/>} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>

    </>

  )
}