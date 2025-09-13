import './Skills.css';

function Skills() {
  const tecnologias = [
    { nome: 'HTML', img: '/assets/html.png' },
    { nome: 'CSS', img: '/assets/css.png' },
    { nome: 'JavaScript', img: '/assets/javascript.png' },
    { nome: 'React', img: '/assets/react.png' },
    { nome: 'Firebase', img: '/assets/firebase.png' },
    { nome: 'Inteligencia artificial', img: '/assets/ia.png' }

  ];

  return (
    <section id="skills">
      <h3 className='titulo-section'>Ferramentas e tecnologias usadas:</h3>
      <ul className="skills-list">
        {tecnologias.map((tec, index) => (
          <li key={index}>
            <img src={tec.img} alt={tec.nome} />
            <span>{tec.nome}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
