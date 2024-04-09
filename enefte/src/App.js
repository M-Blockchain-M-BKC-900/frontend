import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './pages/marketplace';
import Tokenisation from './pages/tokenisation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketplace />} /> 
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/token" element={<Tokenisation />} />
      </Routes>
    </Router>
  );
}