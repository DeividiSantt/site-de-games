import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import "./jogos.css";

function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [descricaoAberta, setDescricaoAberta] = useState({});
  const [generoSelecionado, setGeneroSelecionado] = useState("");
  const [plataformaSelecionada, setPlataformaSelecionada] = useState("");

  useEffect(() => {
    const carregarJogos = async () => {
      const snapshot = await getDocs(collection(db, "jogos"));
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJogos(lista);
    };
    carregarJogos();
  }, []);

  const toggleDescricao = (id) => {
    setDescricaoAberta(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const jogosFiltrados = jogos
    .filter(jogo => {
      const generos = jogo.genero?.split("/").map(g => g.trim());
      const generoOk = generoSelecionado === "" || generos?.includes(generoSelecionado);

      const plataformaOk =
        plataformaSelecionada === "" ||
        (plataformaSelecionada === "Mobile" && jogo.downloadMobile) ||
        (plataformaSelecionada === "PC" && !jogo.downloadMobile);

      return generoOk && plataformaOk;
    })
    .sort((a, b) => {
      const idA = a.id.startsWith("•") ? a.id.slice(1).trim().toLowerCase() : a.id.toLowerCase();
      const idB = b.id.startsWith("•") ? b.id.slice(1).trim().toLowerCase() : b.id.toLowerCase();
      return idA.localeCompare(idB);
    });

  return (
    <section>
      <h1>Confira os jogos grátis disponíveis:</h1>

      {/* Filtros de categoria */}
      <div className="filtro-categorias">
        <select value={generoSelecionado} onChange={(e) => setGeneroSelecionado(e.target.value)}>
          <option value="">Todos os gêneros</option>
          <option value="Ação">Ação</option>
          <option value="Aventura">Aventura</option>
          <option value="Corrida">Corrida</option>
          <option value="Terror">Terror</option>
          <option value="FPS">FPS</option>
          <option value="RPG">RPG</option>
          <option value="Souls Like">Souls Like</option>
          <option value="Rogue Like">Rogue Like</option>
        </select>

        <select value={plataformaSelecionada} onChange={(e) => setPlataformaSelecionada(e.target.value)}>
          <option value="">Todas as plataformas</option>
          <option value="PC">PC</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      <p className="contador-jogos">
        Total de jogos disponíveis: {jogosFiltrados.length}
      </p>

      <div id="jogos" className="jogos-container">
        {jogosFiltrados.map(jogo => (
          <div key={jogo.id} className="jogo-card">
            <img className="jogo-imagem" src={jogo.imagem} alt={jogo.nome} />
            <h3 className="jogo-nome">{jogo.nome}</h3>

            <p className="jogo-genero">
              Gêneros: {jogo.genero?.split("/").map(g => g.trim()).join(", ")}
            </p>

            <button className="botao-descricao" onClick={() => toggleDescricao(jogo.id)}>
              {descricaoAberta[jogo.id] ? "Fechar descrição" : "Ver descrição"}
            </button>

            {descricaoAberta[jogo.id] && (
              <p className="jogo-descricao">{jogo.descricao}</p>
            )}

            {jogo.download && (
              <a className="jogo" href={jogo.download} target="_blank" rel="noopener noreferrer">
                🎮 Baixar versão padrão link direto 
              </a>
            )}

            {jogo.download2 && (
              <a className="jogo" href={jogo.download2} target="_blank" rel="noopener noreferrer">
                🧊 Baixar versão lite
              </a>
            )}

            {jogo.downloadMobile && (
              <a className="jogo" href={jogo.downloadMobile} target="_blank" rel="noopener noreferrer">
                📱 Baixar para celular
              </a>
            )}

            {jogo.downloadEncurtador && (
              <a className="jogo opcional" href={jogo.downloadEncurtador} target="_blank" rel="noopener noreferrer">
                💖 Baixar com encurtador e ajudar o projeto
              </a>
            )}

            {jogo.downloadTradução && (
              <a className="jogo" href={jogo.downloadTradução} target="_blank" rel="noopener noreferrer">
                🈯 Baixar tradução
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Jogos;
