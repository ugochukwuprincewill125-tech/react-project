import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import allProducts from '../data/products';
import categories from '../data/categories';
import './Shop.css';

const PAGE_SIZE = 6;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const queryFromUrl = searchParams.get('q') || '';

  const matchedCategory = categories.find((c) => c.id === categoryFromUrl);

  const [filters, setFilters] = useState({
    category: matchedCategory ? matchedCategory.name : '',
    availability: '',
    maxPrice: 60000,
  });
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(queryFromUrl);

  function updateFilters(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  function resetFilters() {
    setFilters({ category: '', availability: '', maxPrice: 60000 });
    setSearch('');
    setPage(1);
  }

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesAvailability = !filters.availability || p.stock === filters.availability;
      const matchesPrice = p.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'newest') list = [...list].sort((a, b) => (a.id < b.id ? 1 : -1));

    return list;
  }, [search, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ minHeight: '100vh'}}>
      <PageHeader
        kicker="Shop"
        title="All Products"

      />
      <section className="section shop">
        <div className="container shop__layout">
          <FilterSidebar filters={filters} onChange={updateFilters} onReset={resetFilters} />

          <div className="shop__main">
            <div className="shop__toolbar">
              <input
                type="search"
                className="shop__search-input"
                placeholder="Search within results..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <label className="shop__sort">
                Sort:
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <p className="shop__count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

            <ProductGrid products={pageItems} />

            {totalPages > 1 && (
              <div className="shop__pagination">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`shop__page-btn ${page === i + 1 ? 'shop__page-btn--active' : ''}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
