import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ParentsPraise from './pages/ParentsPraise';
import Contact from './pages/Contact';
import EventsAndCelebrations from './pages/EventsAndCelebrations';
function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="reviews" element={<ParentsPraise />} />
            <Route path="events-and-celebrations" element={<EventsAndCelebrations />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
