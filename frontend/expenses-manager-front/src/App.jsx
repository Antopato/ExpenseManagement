import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home' ;
import Income from './pages/Dashboard/Income' ;
import Expense from './pages/Dashboard/Expense' ;
import UserProvider from './context/userContext';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<LogIn/>} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/home" exact element={<Home/>} />
            <Route path="/income" exact element={<Income/>} />
            <Route path="/expense" exact element={<Expense/>} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  return isAuthenticated ? (
    <Navigate to="/home" /> 
    ) : (
    <Navigate to="/login" />
  );
};