import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './pages/marketplace';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketplace />} /> 
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}