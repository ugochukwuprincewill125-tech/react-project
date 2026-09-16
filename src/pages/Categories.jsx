import PageHeader from '../components/PageHeader';
import categories from '../data/categories';
import CategoryCard from '../components/CategoryCard';
import '../components/CategoryGrid.css';

function Categories() {
  return (
    <>
      <PageHeader
        kicker="Browse"
        title="All Categories"
        sub="Every category of accessory and gadget Timeline Global Systems carries."
      />
      <section className="section">
        <div className="container">
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Categories;
