import { Link } from "react-router-dom";
import products from "../data/products";
import ProductGrid from "./ProductGrid";

function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Handpicked</span>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop" className="btn btn-outline-dark btn-sm">
            View All
          </Link>
        </div>
        <ProductGrid products={featured} />
      </div>
    </section>
  );
}

export default FeaturedProducts;
