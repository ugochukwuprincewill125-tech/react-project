import brands from "../data/brands";
import "./BrandSection.css";

function BrandSection() {
  return (
    <section className="section brands" >
      <div className="container">
        <div className="section-head"  >
          <div className="section-text" style={{  width: "100%", textAlign: "center" }} >
            <span className="section-kicker">Trusted Brands</span>
            <h2>Brands We Carry</h2>
          </div>
        </div>

        {brands.length > 0 ? (
          <div className="brands__grid">
            {brands.map((brand) => (
              <div className="brands__logo" key={brand.id}>
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
          </div>
        ) : (
          <div className="brands__empty">
            Brand logos will appear here once added — this section is ready to
            populate from <code>src/data/brands.js</code>.
          </div>
        )}
      </div>
    </section>
  );
}

export default BrandSection;
