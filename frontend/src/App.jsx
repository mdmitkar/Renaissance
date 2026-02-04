import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import ParentsPraise from './pages/ParentsPraise';
import Contact from './pages/Contact';
import TourOfRenaissance from './pages/TourOfRenaissance';
function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="reviews" element={<ParentsPraise />} />
            <Route path="tour-of-renaissance" element={<TourOfRenaissance />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
