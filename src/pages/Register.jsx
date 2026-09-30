import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = register({ name, email, password });

    if (!result.success) {
      setError(result.error);
      return;
    }

    // Success → go to Login page
    navigate('/login', { state: { registered: true } });
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
            <h2 className="fw-bold">📝 Create Account</h2>
            <p className="text-muted">
              Start tracking your money with MoneyMate.
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">👤 Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className="mb-3">
                <label className="form-label">🔒 Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">🔒 Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                ✅ Create Account
              </button>
            </form>

            <p className="text-muted text-center mt-3 mb-0">
              Already have an account?{' '}
              <Link to="/login" className="fw-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;