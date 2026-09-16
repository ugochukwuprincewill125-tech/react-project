import PageHeader from '../components/PageHeader';
import StoreLocations from '../components/StoreLocations';
import './About.css';

function About() {
  return (
    <>
      <PageHeader
        kicker="About Timeline"
        title="Home of Quality Gadgets"
        sub="Technology and gadget supply, importation, distribution and retail."
      />
      <section className="section">
        <div className="container about-page">
          <p>
            Timeline Global Systems Limited is a technology and gadget
            business dealing in the supply, importation, distribution and
            sales of high-quality computer accessories, phone accessories,
            networking materials, digital camera accessories, original
            memory cards, Bluetooth headsets and devices, flash drives and
            general technology accessories.
          </p>
          <p>
            The company also provides home and office technology products,
            including antivirus software, modems, power banks, iPad cases,
            MP3/MP4 players, gamepads for PlayStation and Xbox, and other
            technology accessories.
          </p>
          <p>
            Timeline focuses on high-quality, original and reliable
            gadgets, competitive and affordable pricing, excellent customer
            service, reliable product sourcing and nationwide delivery —
            operating out of Computer Village, Ikeja, Lagos.
          </p>
          <p className="about-page__director">Director: Mr. Anigbogu Arinze C.</p>
        </div>
      </section>
      <StoreLocations />
    </>
  );
}

export default About;
