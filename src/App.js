import React from 'react';
import {BrowserRouter } from 'react-router-dom';

//Context
import {AuthProvider} from './Context/AuthContext'

import Routes from './Routes'

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
            <Routes/>
        </AuthProvider>
      </BrowserRouter> 
  );
}

export default App;