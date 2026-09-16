import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './EmptyState.css';

function Orders() {
  return (
    <>
      <PageHeader kicker="Account" title="Order History" />
      <div className="container section empty-state">
        <p>
          Order history will appear here once accounts and orders are
          connected to a backend.
        </p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>
    </>
  );
}

export default Orders;
