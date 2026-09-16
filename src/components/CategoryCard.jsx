import { Link } from 'react-router-dom';
import Icon from './Icon';
import './CategoryCard.css';

function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.id}`} className="category-card tick-corner">
      <span className="category-card__icon">
        <Icon name={category.icon} />
      </span>
      <span className="category-card__name">{category.name}</span>
    </Link>
  );
}

export default CategoryCard;
