import PageHeader from '../components/PageHeader';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';

function Deals() {
  const deals = products.filter((p) => p.deal);

  return (
    <>
      <PageHeader
        kicker="Limited-time"
        title="Deals You Don't Want to Miss"
        sub="Quality gadgets. Better prices."
      />
      <section className="section">
        <div className="container">
          <ProductGrid products={deals} />
        </div>
      </section>
    </>
  );
}

export default Deals;
