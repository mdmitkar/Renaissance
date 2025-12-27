import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admission from './pages/Admission';
import LifeAtRenaissance from './pages/LifeAtRenaissance';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<div style={{ padding: '100px', textAlign: 'center' }}>About Us Page (Coming Soon)</div>} />
          <Route path="life" element={<LifeAtRenaissance />} />
          <Route path="gallery" element={<div style={{ padding: '100px', textAlign: 'center' }}>Gallery Page (Coming Soon)</div>} />
          <Route path="admission" element={<Admission />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
