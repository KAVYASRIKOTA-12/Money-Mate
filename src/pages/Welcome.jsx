import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div className="welcome-page">
            <div className="welcome-overlay" />

            <div className="container welcome-content">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-8 text-center">
                        {/* Brand */}
                        <div className="welcome-brand">
                            <span className="welcome-emoji">💰</span>
                            <h1 className="welcome-title">MoneyMate</h1>
                        </div>

                        <p className="welcome-tagline">
                            Track your income, expenses, and balance — all in one place.
                        </p>

                        {/* CTA Buttons */}
                        <div className="welcome-actions">
                            <Link to="/login" className="btn btn-success btn-lg">
                                🔐 Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline-secondary btn-lg"
                            >
                                📝 Register
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="row g-3 mt-5">
                            <div className="col-md-4">
                                <div className="welcome-feature">
                                    <div className="welcome-feature-icon">📊</div>
                                    <h6 className="fw-bold mb-1">Track</h6>
                                    <p className="text-muted small mb-0">
                                        Record income and expenses easily
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="welcome-feature">
                                    <div className="welcome-feature-icon">📈</div>
                                    <h6 className="fw-bold mb-1">Analyze</h6>
                                    <p className="text-muted small mb-0">
                                        Monthly reports and category insights
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="welcome-feature">
                                    <div className="welcome-feature-icon">💼</div>
                                    <h6 className="fw-bold mb-1">Balance</h6>
                                    <p className="text-muted small mb-0">
                                        Know exactly where your money stands
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="app-footer">
                            <p className="mb-1">
                                💰 <strong>MoneyMate</strong> — Track your money,
                                master your future.
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