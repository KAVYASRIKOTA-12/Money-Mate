import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Capitalize first letter
    const displayName = currentUser?.name
        ? currentUser.name.charAt(0).toUpperCase() +
        currentUser.name.slice(1)
        : '';

    // Avatar initials
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
        navigate('/welcome');
    }

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink
                    className="navbar-brand"
                    to="/welcome"
                    onClick={closeMenu}
                >
                    💰 MoneyMate
                </NavLink>

                {/* Hamburger toggle — mobile only */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                >
                    <span className="navbar-toggler-icon-custom">
                        {isOpen ? '✕' : '☰'}
                    </span>
                </button>

                {/* Menu */}
                <div
                    className={`navbar-collapse-custom ${isOpen ? 'open' : ''}`}
                >
                    <div className="navbar-nav ms-auto align-items-lg-center">
                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    className="nav-link"
                                    to="/dashboard"
                                    onClick={closeMenu}
                                >
                                    📊 Dashboard
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/transactions"
                                    onClick={closeMenu}
                                >
                                    📋 Transactions
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/add-expense"
                                    onClick={closeMenu}
                                >
                                    ➕ Add Transaction
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/reports"
                                    onClick={closeMenu}
                                >
                                    📈 Reports
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/settings"
                                    onClick={closeMenu}
                                >
                                    ⚙️ Settings
                                </NavLink>

                                <div className="user-section">
                                    <span className="user-greeting">
                                        <span className="user-avatar">{initials}</span>
                                        {displayName}
                                    </span>

                                    <button
                                        className="btn btn-logout btn-sm"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    className="nav-link"
                                    to="/login"
                                    onClick={closeMenu}
                                >
                                    🔐 Login
                                </NavLink>

                                <NavLink
                                    className="nav-link"
                                    to="/register"
                                    onClick={closeMenu}
                                >
                                    📝 Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;