import categories from '../data/categories';
import './FilterSidebar.css';

function FilterSidebar({ filters, onChange, onReset }) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h3>Filters</h3>
        <button type="button" className="filter-sidebar__reset" onClick={onReset}>
          Clear all
        </button>
      </div>

      <div className="filter-sidebar__group">
        <h4>Category</h4>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="category"
                checked={filters.category === ''}
                onChange={() => onChange({ category: '' })}
              />
              All Categories
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <label>
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.name}
                  onChange={() => onChange({ category: cat.name })}
                />
                {cat.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-sidebar__group">
        <h4>Availability</h4>
        <ul>
          {[
            { value: '', label: 'All' },
            { value: 'in-stock', label: 'In Stock' },
            { value: 'low-stock', label: 'Low Stock' },
            { value: 'out-of-stock', label: 'Out of Stock' },
          ].map((opt) => (
            <li key={opt.value}>
              <label>
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === opt.value}
                  onChange={() => onChange({ availability: opt.value })}
                />
                {opt.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-sidebar__group">
        <h4>Max Price</h4>
        <input
          type="range"
          min="0"
          max="60000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
        />
        <span className="filter-sidebar__price-value">Up to ₦{filters.maxPrice.toLocaleString()}</span>
      </div>
    </aside>
  );
}

export default FilterSidebar;
