import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home  from './components/Home';
import Profile from './components/Profile';
import AdminProfile from './components/AdminProfile';
import Preload from './components/Preload';
import ClaimsManagement from './components/admin/ClamsManagement'
import UsersManagement from './components/admin/UsersManagement';
import Signup from './components/signup';
import NotFound from './NotFound';
function App() {
  return (
    <>
          <Preload />
          <Router>
            <Routes>
              
              <Route path={'/Home'}  element={ <Home />}/>
              <Route path={'/'}  element={ <Home />}/>
              <Route path="/Login" element={ <Login />} />
              <Route path='/Profile' element={<Profile />}/>
              <Route path='/Admin' element={<AdminProfile />}/>
              <Route path='/Admin/manage-claims' element={<ClaimsManagement />}/>
              <Route path='/Admin/manage-users' element={<UsersManagement />}/>
              <Route path='/signup' element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
    </>

  );
}

export default App;
