import './StoreLocations.css';

const LOCATIONS = [
  {
    label: 'Main Office',
    lines: [
      '#17, Oremeji Street,',
      'Micro Station Plaza,',
      'Computer Village,',
      'Ikeja, Lagos, Nigeria.',
    ],
  },
  {
    label: 'Branch',
    lines: [
      '#11B, Otigba Street,',
      'Opposite Fidelity Bank,',
      'Computer Village,',
      'Ikeja, Lagos, Nigeria.',
    ],
  },
];

function StoreLocations() {
  return (
    <section className="section locations">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Visit Us</span>
            <h2>Store Locations</h2>
          </div>
        </div>
        <div className="locations__grid">
          {LOCATIONS.map((loc) => (
            <div className="locations__card" key={loc.label}>
              <h3 className="locations__label">{loc.label}</h3>
              <address className="locations__address">
                {loc.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoreLocations;
