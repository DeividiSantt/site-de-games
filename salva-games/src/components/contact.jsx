import "./Contact.css";

export default function Contact() {
  return (
    <section id="contato" className="contact">
      <h3 className="section-title">Contato</h3>
      <p>📍 Rio Branco – AC</p>
      <p>
       <a href="https://www.instagram.com/gamezonedvz/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/instagram.png" alt="Instagram" className="icon" />
            @gamezonedvz
        </a>
      </p>
      <p>
        📧 <a href="mailto:daviisan4@gmail.com" className="email-link">daviisan4@gmail.com</a>
      </p>
    </section>
  );
}
