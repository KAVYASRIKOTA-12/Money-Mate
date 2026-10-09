import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SLIDES = [
  {
    icon: 'bi-person-plus-fill',
    title: 'Get Started in Seconds',
    description:
      'Create your account and start tracking your finances immediately.',
    theme: 'success',
  },
  {
    icon: 'bi-bar-chart-line-fill',
    title: 'Real-Time Dashboard',
    description:
      'Monitor income, expenses, and balance with live updates.',
    theme: 'primary',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Monthly Reports',
    description:
      'Understand your spending with category breakdowns.',
    theme: 'info',
  },
  {
    icon: 'bi-shield-check',
    title: 'Private & Secure',
    description:
      'Your data stays on your device — never shared.',
    theme: 'dark',
  },
];

function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

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

    navigate('/login', { state: { registered: true } });
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="container-fluid px-0">
      <div className="row g-0 min-vh-100">

        {/* LEFT: Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center py-5 auth-form-side">
          <div style={{ maxWidth: '420px', width: '100%' }} className="px-4">
            <h2 className="fw-bold mb-2">Create Account</h2>
            <p className="text-muted mb-4">
              Start tracking your money with MoneyMate.
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Create Account
              </button>
            </form>

            <p className="text-muted text-center mt-4 mb-0">
              Already have an account?{' '}
              <Link to="/login" className="fw-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT: Carousel Card */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center auth-carousel-side">
          <div className="w-100 px-4">
            <div
              id="registerCarousel"
              className="carousel slide auth-carousel-wrapper"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div className="carousel-indicators">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#registerCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="carousel-inner">
                {SLIDES.map((slide, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? 'active' : ''
                      }`}
                  >
                    <div className="card border-0 shadow-sm auth-slide-card">
                      <div className="card-body text-center p-4 p-md-5">
                        <div
                          className={`d-inline-flex align-items-center justify-content-center rounded-circle mb-4 auth-slide-icon auth-slide-${slide.theme}`}
                        >
                          <i className={`bi ${slide.icon} fs-1`}></i>
                        </div>

                        <h3 className="fw-bold mb-3">
                          {slide.title}
                        </h3>

                        <p className="text-muted mb-0">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#registerCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#registerCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Trust section */}
            <p className="text-muted text-center small mt-4 mb-0">
              ⭐ Trusted by <strong className="text-success">1,000+ users</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;