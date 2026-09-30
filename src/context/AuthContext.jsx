import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'moneymate_users';
const CURRENT_USER_KEY = 'moneymate_current_user';

// ⚠️ DEMO ONLY — passwords stored in plain text in localStorage.
// NEVER do this in a real app. Real apps use a backend + bcrypt + JWT.

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.email ? parsed : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);

  // Persist users
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  // Persist current user (or remove if logged out)
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // --- Register ---
  function register({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    const exists = users.some(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password, // ⚠️ DEMO ONLY
    };

    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  }

  // --- Login ---
  function login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      return { success: false, error: 'No account found with this email.' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { success: true };
  }

  // --- Logout ---
  function logout() {
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}