import categories from '../data/categories';
import CategoryCard from './CategoryCard';
import './CategoryGrid.css';

function CategoryGrid() {
  return (
    <section className="section category-grid-section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Browse</span>
            <h2>Shop by Category</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
