import React, { Fragment, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppShopping from './pages/AppShopping'
import AppAdmin from './admin/AppAdmin'

import './App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path='*' element={<AppShopping />} />
            <Route path='/admin/*' element={<AppAdmin />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
