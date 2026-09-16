import { Link } from 'react-router-dom';
import './AboutSection.css';

function AboutSection() {
  return (
    <section className="section about">
      <div className="container about__inner">
        <div className="about__panel tick-corner">
          <span className="section-kicker">About Timeline</span>
          <h2 className="about__headline">Home of Quality Gadgets.</h2>
          <p className="about__text">
            Timeline Global Systems Limited is a technology and gadget
            business dealing in the supply, importation, distribution and
            sales of high-quality computer accessories, phone accessories,
            networking materials, digital camera accessories, original
            memory cards, Bluetooth devices, flash drives and general
            technology accessories — alongside home and office technology
            products.
          </p>
          <Link to="/about" className="btn btn-outline-dark btn-sm">Read More</Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
