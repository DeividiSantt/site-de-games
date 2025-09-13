import './Intro.css';

function Intro({ onEntrar }) {
  return (
    <section id="inicio" className="intro-container">
      <div className="intro-box">
        <div className="intro-header">
        </div>

        <div className="intro-content">
          <h1 className="titulo-gamezone typing-animation">GameZone</h1>
          <h2 className='typing-animation'>jogos gratuitos e diversão online!</h2>

          

          <div className="info-box">
            <p>✅ Todos os jogos têm link direto</p>
            <p>⚠️ Alguns jogos requerem torrent</p>
            <p>🛠️ Baixe o pack com DirectX e ferramentas necessárias:</p>
            <a
              href="https://www.mediafire.com/file/p7uflhtcr7g0p84/Pacote+de+DLLs+Net+Frameworks+e+DirectX.zip/file"
              target="_blank"
              rel="noopener noreferrer"
              className="pack-link"
            >
              📦 Baixar Pack de Ferramentas
            </a> <br/>
          </div>
          <button className="entrar-btn" onClick={onEntrar}>
            Ver jogos
          </button>
          <div className='tutorial-box'>
              <h3>💡 Quer ajudar o projeto sem gastar nada?</h3>
              <p>Você pode contribuir passando pelo encurtador, que é totalmente opicional!!</p>
                <a
                  href="https://youtu.be/-MwAcbiNUsw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tutorial-link"
                >
                  ▶️ Assistir tutorial

                </a>
              <p>Qr code pix:</p>
              <img src="/assets/qrcode.jpg" alt="Pix QR Code" className="intro-imagem" />
              <p>Doe qualquer quantia para me ajudar a trazer mais jogos</p>
              <code className="pix-chave">PIX: daviisan4@gmail.com</code>
            </div>
          
        </div>
      </div>
    </section>
  );
}

export default Intro;
