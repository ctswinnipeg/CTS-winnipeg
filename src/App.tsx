import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Countdown from './components/Countdown';
import Speakers from './components/Speakers';
import Topics from './components/Topics';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Posters from './components/Posters';

export default function App() {
  const [showPosters, setShowPosters] = useState(false);

  if (showPosters) {
    return <Posters onBack={() => setShowPosters(false)} />;
  }

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Countdown />
      <Speakers />
      <Topics />
      <FAQ />
      <Contact />
      <Footer onShowPosters={() => setShowPosters(true)} />
    </div>
  );
}
