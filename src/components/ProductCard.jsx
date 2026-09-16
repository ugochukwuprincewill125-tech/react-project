import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';
import './ProductCard.css';

const STOCK_LABEL = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
};

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
  const outOfStock = product.stock === 'out-of-stock';

  return (
    <div className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.id}`} className="product-card__image-link">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-card__image" />
          ) : (
            <div className="product-card__placeholder" aria-hidden="true">
              <span>{product.name.charAt(0)}</span>
            </div>
          )}
        </Link>

        {hasDiscount && <span className="product-card__badge">-{discountPct}%</span>}

        <button
          className={`product-card__wishlist ${wishlisted ? 'product-card__wishlist--active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'}>
            <path
              d="M12 20s-7.2-4.4-9.5-8.8C.8 7.8 2.6 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.4.5 5.2 3.8 3.5 7.2C19.2 15.6 12 20 12 20z"
              stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-card__name">
          {product.name}
        </Link>

        <div className="product-card__prices">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {hasDiscount && <span className="product-card__old-price">{formatPrice(product.oldPrice)}</span>}
        </div>

        <span className={`product-card__stock product-card__stock--${product.stock}`}>
          {STOCK_LABEL[product.stock] || 'In Stock'}
        </span>

        <button
          className="btn btn-primary btn-sm btn-block product-card__cta"
          onClick={() => addToCart(product)}
          disabled={outOfStock}
        >
          {outOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
