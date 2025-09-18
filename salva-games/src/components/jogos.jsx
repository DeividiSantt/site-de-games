import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import "./jogos.css";
import { useTranslation } from "react-i18next";
import "./i18n";

function Jogos() {
  const { t, i18n } = useTranslation();
  const trocarIdioma = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const [jogos, setJogos] = useState([]);
  const [descricaoAberta, setDescricaoAberta] = useState({});
  const [generoSelecionado, setGeneroSelecionado] = useState("");
  const [plataformaSelecionada, setPlataformaSelecionada] = useState("");
  const [busca, setBusca] = useState("");

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

      const buscaOk = jogo.nome?.toLowerCase().includes(busca.toLowerCase());

      return generoOk && plataformaOk && buscaOk;
    })
    .sort((a, b) => {
      const idA = a.id.startsWith("•") ? a.id.slice(1).trim().toLowerCase() : a.id.toLowerCase();
      const idB = b.id.startsWith("•") ? b.id.slice(1).trim().toLowerCase() : b.id.toLowerCase();
      return idA.localeCompare(idB);
    });

  return (
    <section>
      <h1>{t("titulo")}</h1>

      {/* Agrupamento visual: idioma + busca */}
      <div className="topo-filtros">
        <div className="idioma-selector">
          <label htmlFor="idioma">{t("idioma")}:</label>
          <select id="idioma" onChange={trocarIdioma}>
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="campo-busca">
          <input
            type="text"
            placeholder={t("buscar")}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="filtro-categorias">
        <select value={generoSelecionado} onChange={(e) => setGeneroSelecionado(e.target.value)}>
          <option value="">{t("filtro_genero")}</option>
          <option value="Ação">{t("acao")}</option>
          <option value="Aventura">{t("aventura")}</option>
          <option value="Corrida">{t("corrida")}</option>
          <option value="Terror">{t("terror")}</option>
          <option value="FPS">{t("fps")}</option>
          <option value="RPG">{t("rpg")}</option>
          <option value="Souls Like">{t("souls_like")}</option>
          <option value="Rogue Like">{t("rogue_like")}</option>
        </select>

        <select value={plataformaSelecionada} onChange={(e) => setPlataformaSelecionada(e.target.value)}>
          <option value="">{t("filtro_plataforma")}</option>
          <option value="PC">PC</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      <p className="contador-jogos">
        {t("total_jogos")}: {jogosFiltrados.length}
      </p>

      {jogosFiltrados.length === 0 && (
        <p className="nenhum-jogo">{t("nenhum_jogo")}</p>
      )}

      <div id="jogos" className="jogos-container">
        {jogosFiltrados.map(jogo => (
          <div key={jogo.id} className="jogo-card">
            <img className="jogo-imagem" src={jogo.imagem} alt={jogo.nome} />
            <h3 className="jogo-nome">{jogo.nome}</h3>

            <p className="jogo-genero">
              {t("generos")}: {jogo.genero?.split("/").map(g => g.trim()).join(", ")}
            </p>

            <button className="botao-descricao" onClick={() => toggleDescricao(jogo.id)}>
              {descricaoAberta[jogo.id] ? t("fechar_descricao") : t("ver_descricao")}
            </button>

            {descricaoAberta[jogo.id] && (
              <p className="jogo-descricao">{jogo.descricao}</p>
            )}

            {jogo.download && (
              <a className="jogo" href={jogo.download} target="_blank" rel="noopener noreferrer">
                🎮 {t("baixar_padrao")}
              </a>
            )}

            {jogo.download2 && (
              <a className="jogo" href={jogo.download2} target="_blank" rel="noopener noreferrer">
                🧊 {t("baixar_lite")}
              </a>
            )}

            {jogo.downloadMobile && (
              <a className="jogo" href={jogo.downloadMobile} target="_blank" rel="noopener noreferrer">
                📱 {t("baixar_mobile")}
              </a>
            )}

            {jogo.downloadEncurtador && (
              <a className="jogo opcional" href={jogo.downloadEncurtador} target="_blank" rel="noopener noreferrer">
                💖 {t("baixar_encurtador")}
              </a>
            )}

            {jogo.downloadTradução && (
              <a className="jogo" href={jogo.downloadTradução} target="_blank" rel="noopener noreferrer">
                🈯 {t("baixar_traducao")}
              </a>
            )}

            {jogo.senha && (
              <a className="jogo" href={jogo.senha} target="_blank" rel="noopener noreferrer">
                {t(`Senha: ${jogo.senha}`)}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Jogos;
