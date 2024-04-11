import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Marketplace from './pages/MarketPlace';
import LoginPage from './pages/LoginPage';
import { Box } from '@mui/material';

export default function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100%', widht: '100%' }}>
        <NavBar />
          <Box component="main" sx={{ overflowY: 'auto', height: '100%', widtht: '100%'}}>
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Box>
      </Box>
    </Router>
  );
}