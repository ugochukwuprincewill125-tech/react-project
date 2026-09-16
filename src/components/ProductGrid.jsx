import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products }) {
  if (!products.length) {
    return <p className="product-grid__empty">No products to show yet.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
