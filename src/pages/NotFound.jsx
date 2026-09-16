import { Link } from 'react-router-dom';
import './EmptyState.css';

function NotFound() {
  return (
    <div className="container section empty-state">
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}

export default NotFound;
