import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './AuthForm.css';

function Register() {
  return (
    <>
      <PageHeader kicker="Account" title="Create an Account" />
      <section className="section">
        <div className="container">
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <p className="auth-form__note">
              Registration isn't connected to a backend yet — this form is a
              frontend placeholder to be wired up to real authentication.
            </p>
            <label>
              Full Name
              <input type="text" required />
            </label>
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Password
              <input type="password" required />
            </label>
            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
            <p className="auth-form__switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
