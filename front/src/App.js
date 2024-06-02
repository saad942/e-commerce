import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ajouter from './pages/Ajouter';
import Voir from './pages/Voir';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/voir' element={<Voir/>}/>
        <Route path='/ajouter' element={<Ajouter/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/product' element={<Product/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 