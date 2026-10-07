import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const displayName = currentUser?.name
        ? currentUser.name.charAt(0).toUpperCase() +
        currentUser.name.slice(1)
        : '';

    const initials = currentUser?.name
        ? currentUser.name
            .trim()
            .split(/\s+/)
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : '?';

    function handleLogout() {
        logout();
        setIsOpen(false);
        setProfileOpen(false);
        navigate('/welcome');
    }

    function closeAll() {
        setIsOpen(false);
        setProfileOpen(false);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
            <div className="container">
                <NavLink
                    className="navbar-brand fw-bold text-success"
                    to="/welcome"
                    onClick={closeAll}
                >
                    💰 MoneyMate
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/dashboard"
                                        onClick={closeAll}
                                    >
                                        📊 Dashboard
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/transactions"
                                        onClick={closeAll}
                                    >
                                        📋 Transactions
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/add-expense"
                                        onClick={closeAll}
                                    >
                                        ➕ Add Transaction
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/reports"
                                        onClick={closeAll}
                                    >
                                        📈 Reports
                                    </NavLink>
                                </li>

                                {/* Profile Dropdown */}
                                <li className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0">
                                    <button
                                        className="btn btn-link nav-link dropdown-toggle d-flex align-items-center gap-2 text-decoration-none p-0"
                                        type="button"
                                        onClick={() => setProfileOpen((prev) => !prev)}
                                        aria-expanded={profileOpen}
                                    >
                                        <span
                                            className="badge rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            {initials}
                                        </span>
                                        <span className="fw-semibold text-dark">
                                            {displayName}
                                        </span>
                                    </button>

                                    <ul
                                        className={`dropdown-menu dropdown-menu-end ${profileOpen ? 'show' : ''
                                            }`}
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: '100%',
                                            marginTop: '0.5rem',
                                            pointerEvents: 'auto',
                                        }}
                                    >
                                        <li>
                                            <div className="dropdown-header">
                                                <div className="fw-bold">{displayName}</div>
                                                <small className="text-muted">
                                                    {currentUser?.email}
                                                </small>
                                            </div>
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/profile"
                                                onClick={closeAll}
                                            >
                                                ✏️ Profile Settings
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/settings"
                                                onClick={closeAll}
                                            >
                                                ⚙️ App Settings
                                            </NavLink>
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={handleLogout}
                                            >
                                                🚪 Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/login"
                                        onClick={closeAll}
                                    >
                                        🔐 Login
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/register"
                                        onClick={closeAll}
                                    >
                                        📝 Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;