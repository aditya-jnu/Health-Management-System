import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Geolocation from './components/GeoLocation';
import GetHospital from './components/GetHospital';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Geolocation />
      <Routes>
        {/* Use Layout as a wrapper for all routes */}
        <Route index element={<About />} /> 
        <Route path="/" element={<Layout />}>
          {/* Default route */}
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="getHospital" element={<GetHospital />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
