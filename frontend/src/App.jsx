import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Admission from './pages/Admission';
import LifeAtRenaissance from './pages/LifeAtRenaissance';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="life" element={<LifeAtRenaissance />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="admission" element={<Admission />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
