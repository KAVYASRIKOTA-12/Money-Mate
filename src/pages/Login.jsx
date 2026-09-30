import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const justRegistered = location.state?.registered;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 🔑 If already logged in, go straight to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }

    const result = login({ email, password });

    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate('/dashboard');
  }

  // Don't flash the form if already logged in
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow-sm p-4 auth-card">
            <h2 className="fw-bold">🔐 Welcome Back</h2>
            <p className="text-muted">
              Log in to your MoneyMate account.
            </p>

            {justRegistered && !error && (
              <div className="alert alert-info" role="alert">
                ✅ Account created successfully! Please log in.
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">📧 Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">🔒 Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                ✅ Log In
              </button>
            </form>

            <p className="text-muted text-center mt-3 mb-0">
              Don't have an account?{' '}
              <Link to="/register" className="fw-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;