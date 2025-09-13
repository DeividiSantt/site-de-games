import "./Navbar.css";

function Navbar({ entrou, setEntrou }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {!entrou ? (
          <li><span>Bem-vindo!</span></li>
        ) : (
          <>
            <li><button onClick={() => setEntrou(false)}>Voltar ao inicio</button></li>
            <li><a href="#jogos">Jogos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
