import './ContactCTA.css';

function ContactCTA() {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div>
          <h2 className="cta__headline">Need a gadget or technology accessory?</h2>
          <p className="cta__sub">Talk to Timeline Global Systems today.</p>
        </div>
        <div className="cta__contacts">
          <a href="tel:07032292149" className="btn btn-primary">Call 0703 229 2149</a>
          <a href="mailto:timelinegadget@gmail.com" className="btn btn-outline-light">
            timelinegadget@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
