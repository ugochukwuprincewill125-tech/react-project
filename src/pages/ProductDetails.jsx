import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';
import './ProductDetails.css';

function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container section">
        <h1>Product not found</h1>
        <p>This product may have been removed or is no longer available.</p>
        <Link to="/shop" className="btn btn-outline-dark" style={{ marginTop: '1.5rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const outOfStock = product.stock === 'out-of-stock';
  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container section product-details">
      <nav className="product-details__crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link> / <span>{product.category}</span> / <span>{product.name}</span>
      </nav>

      <div className="product-details__layout">
        <div className="product-details__gallery">
          <div className="product-details__main-image">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <span className="product-details__placeholder">{product.name.charAt(0)}</span>
            )}
          </div>
        </div>

        <div className="product-details__info">
          <span className="section-kicker">{product.category}</span>
          <h1 className="product-details__name">{product.name}</h1>

          <div className="product-details__prices">
            <span className="product-details__price">{formatPrice(product.price)}</span>
            {hasDiscount && <span className="product-details__old-price">{formatPrice(product.oldPrice)}</span>}
          </div>

          <span className={`product-card__stock product-card__stock--${product.stock}`}>
            {product.stock === 'in-stock' && 'In Stock'}
            {product.stock === 'low-stock' && 'Low Stock'}
            {product.stock === 'out-of-stock' && 'Out of Stock'}
          </span>

          <p className="product-details__description">{product.description}</p>

          <div className="product-details__qty-row">
            <div className="product-details__qty">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>

            <button
              className="btn btn-outline-dark"
              onClick={() => toggleWishlist(product)}
              aria-pressed={wishlisted}
            >
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="product-details__actions">
            <button
              className="btn btn-outline-dark btn-block"
              disabled={outOfStock}
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              className={`btn btn-primary btn-block ${outOfStock ? 'product-details__disabled-link' : ''}`}
              onClick={(e) => {
                if (outOfStock) e.preventDefault();
                else addToCart(product, quantity);
              }}
            >
              Buy Now
            </Link>
          </div>

          <div className="product-details__delivery">
            <strong>Delivery:</strong> Nationwide delivery available. Pickup also available from either
            Computer Village location in Ikeja, Lagos.
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="product-details__related">
          <div className="section-head">
            <h2>Related Products</h2>
          </div>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
