import PageHeader from '../components/PageHeader';
import './Contact.css';

function Contact() {
  return (
    <>
      <PageHeader kicker="Get in Touch" title="Contact Us" />
      <section className="section">
        <div className="container contact__layout">
          <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Name
              <input type="text" required />
            </label>
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Message
              <textarea rows="5" required />
            </label>
            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
          </form>

          <div className="contact__details">
            <div>
              <h3>Phone</h3>
              <p><a href="tel:07032292149">0703 229 2149</a></p>
              <p><a href="tel:08063874538">0806 387 4538</a></p>
              <p><a href="tel:07014077771">0701 407 7771</a></p>
            </div>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:timelinegadget@gmail.com">timelinegadget@gmail.com</a></p>
            </div>
            <div>
              <h3>Main Office</h3>
              <p>#17, Oremeji Street, Micro Station Plaza, Computer Village, Ikeja, Lagos, Nigeria.</p>
            </div>
            <div>
              <h3>Branch</h3>
              <p>#11B, Otigba Street, Opposite Fidelity Bank, Computer Village, Ikeja, Lagos, Nigeria.</p>
            </div>
            <div>
              <h3>Instagram</h3>
              <p><a href="https://www.instagram.com/timelinegadgets/" target="_blank" rel="noreferrer">@timelinegadgets</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
