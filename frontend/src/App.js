import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Geolocation from './components/GeoLocation';
import GetHospital from './components/GetHospital';

function App() {
  return (
    <Router>
      <Geolocation/>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/home" element={<Home />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/getHospital" element={<GetHospital />} />
      </Routes>
    </Router>
  );
}

export default App;
