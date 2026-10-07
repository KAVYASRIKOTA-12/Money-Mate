import { Link } from 'react-router-dom';

const SLIDES = [
    {
        icon: 'bi-bar-chart-line-fill',
        title: 'Real-Time Dashboard',
        description:
            'Monitor income, expenses, and available balance with live updates.',
        theme: 'success',
    },
    {
        icon: 'bi-list-check',
        title: 'Complete Transaction History',
        description:
            'Search, filter, and manage every transaction with precision.',
        theme: 'primary',
    },
    {
        icon: 'bi-graph-up-arrow',
        title: 'Monthly Reports',
        description:
            'Understand spending patterns with category-level breakdowns.',
        theme: 'info',
    },
    {
        icon: 'bi-shield-check',
        title: 'Private & Secure',
        description:
            'Your data stays on your device — never shared, never tracked.',
        theme: 'dark',
    },
];

function Welcome() {
    return (
        <div className="welcome-page">
            <div className="container welcome-content">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-10">

                        {/* Brand */}
                        <div className="text-center mb-4">
                            <h1 className="display-3 fw-bold text-success mb-2">
                                MoneyMate
                            </h1>
                            <p className="lead text-muted mb-4">
                                Professional expense tracking for individuals and teams.
                            </p>

                            {/* CTA */}
                            <div className="d-flex gap-2 justify-content-center flex-wrap mb-5">
                                <Link to="/login" className="btn btn-success btn-lg px-4">
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-outline-dark btn-lg px-4"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>

                        {/* Bootstrap Carousel */}
                        <div
                            id="welcomeCarousel"
                            className="carousel slide shadow-sm rounded-4 overflow-hidden"
                            data-bs-ride="carousel"
                            data-bs-interval="4000"
                        >
                            {/* Indicators */}
                            <div className="carousel-indicators">
                                {SLIDES.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#welcomeCarousel"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? 'active' : ''}
                                        aria-current={index === 0 ? 'true' : 'false'}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Slides */}
                            <div className="carousel-inner">
                                {SLIDES.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? 'active' : ''
                                            }`}
                                        data-bs-interval="4000"
                                    >
                                        <div
                                            className={`bg-${slide.theme} bg-opacity-10 d-flex align-items-center justify-content-center`}
                                            style={{ minHeight: '320px' }}
                                        >
                                            <div className="text-center px-4 py-5">
                                                <i
                                                    className={`bi ${slide.icon} display-1 text-${slide.theme} mb-3 d-block`}
                                                ></i>
                                                <h3 className="fw-bold mb-3">
                                                    {slide.title}
                                                </h3>
                                                <p className="text-muted mb-0 mx-auto lead">
                                                    {slide.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Controls */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#welcomeCarousel"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon bg-dark rounded-circle p-3"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#welcomeCarousel"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon bg-dark rounded-circle p-3"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Value Props */}
                        <div className="row g-3 mt-5 text-center">
                            <div className="col-md-4">
                                <div className="p-4">
                                    <i className="bi bi-lightning-charge-fill fs-1 text-success mb-2 d-block"></i>
                                    <h6 className="fw-bold mb-1">Fast Setup</h6>
                                    <p className="text-muted small mb-0">
                                        Start tracking in under a minute.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="p-4">
                                    <i className="bi bi-graph-up fs-1 text-success mb-2 d-block"></i>
                                    <h6 className="fw-bold mb-1">Actionable Insights</h6>
                                    <p className="text-muted small mb-0">
                                        See where your money goes.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="p-4">
                                    <i className="bi bi-lock-fill fs-1 text-success mb-2 d-block"></i>
                                    <h6 className="fw-bold mb-1">Data Privacy</h6>
                                    <p className="text-muted small mb-0">
                                        Stored locally on your device.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="app-footer">
                            <p className="mb-1">
                                <strong>MoneyMate</strong> — Track your money, master
                                your future.
                            </p>
                            <p className="mb-0 small">
                                Built with React + Vite · v1.0.0
                            </p>
                        </footer>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;