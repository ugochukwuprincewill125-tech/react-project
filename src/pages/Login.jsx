import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './AuthForm.css';

function Login() {
  return (
    <>
      <PageHeader kicker="Account" title="Login" />
      <section className="section">
        <div className="container">
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <p className="auth-form__note">
              Sign-in isn't connected to a backend yet — this form is a
              frontend placeholder to be wired up to real authentication.
            </p>
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Password
              <input type="password" required />
            </label>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <p className="auth-form__switch">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
