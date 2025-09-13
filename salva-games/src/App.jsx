import { useState } from 'react';
import Navbar from './components/navBar';
import Intro from './components/Intro';
import Jogos from './components/jogos';
import Bio from './components/Bio';
import Contact from './components/Contact';
import Skills from './components/skills';
import Footer from './components/Footer';

function App() {
  const [entrou, setEntrou] = useState(false);

  return (
    <>
      <Navbar entrou={entrou} setEntrou={setEntrou} />
      {!entrou ? (
        <Intro onEntrar={() => setEntrou(true)} />
      ) : (
        <>
          <Jogos />
          <Bio />
          <Contact />
          <Skills />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
