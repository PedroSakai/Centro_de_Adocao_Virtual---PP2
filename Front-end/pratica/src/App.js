import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';
import Login from '../src/components/Login';
function App() 
{ 
  return (
    <BrowserRouter>
    <div> 
      <Rotas></Rotas>
    </div> 
    </BrowserRouter>
  ); 
} 

export default App;

/*

*/