import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Geolocation from './components/GeoLocation';
import Bookappointment from './components/Bookappointment';
import Myappointment from './components/Myappointment';
import Layout from './Layout';
import Contact from './components/Contact/Contact';
import Chat from './components/Chat';

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
          <Route path="bookappointment" element={<Bookappointment/>} />
          <Route path="myappointment" element={<Myappointment />} />
          <Route path="contact" element={<Contact />} />
          <Route path='room/:code' element={<Chat/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
