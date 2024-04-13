import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Marketplace from './pages/Marketplace';
import LoginPage from './pages/LoginPage';
import Tokenisation from './pages/Tokenisation';
import ProtectedRoute from './components/ProtectedRoute';
import MyTokens from './pages/MyTokens'
import { Box } from '@mui/material';

export default function App() {
  const isLoggedIn = sessionStorage.getItem('accessToken');

  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100%',}}>
        <NavBar />
        <Box component="main" sx={{ overflowY: 'auto', width: '100%'}}>
          <Box component="main" sx={{ overflowX: 'auto', height: '100%'}}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={isLoggedIn ? <Navigate to="/marketplace" /> : <LoginPage />} />
              <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
              <Route path="/token" element={<ProtectedRoute><Tokenisation /></ProtectedRoute>} />
              <Route path="/myTokens" element={<ProtectedRoute><MyTokens /></ProtectedRoute>} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}