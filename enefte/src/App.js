import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Marketplace from './pages/Marketplace';
import LoginPage from './pages/LoginPage';
import Tokenisation from './pages/tokenisation';
import { Box } from '@mui/material';
import Tokenisation from './pages/Tokenisation';

export default function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100%',}}>
        <NavBar />
          <Box component="main" sx={{ overflowY: 'auto', width: '100%'}}>
            <Box component="main" sx={{ overflowX: 'auto', height: '100%'}}>
              <Routes>
                <Route path="/" element={<Marketplace />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/token" element={<Tokenisation />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </Box>
          </Box>
      </Box>
    </Router>
  );
}