import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';

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
