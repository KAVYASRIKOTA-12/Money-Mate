import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddExpense from './pages/AddExpense';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// ⚠️ Storage key depends on the logged-in user
function getStorageKey(user) {
  if (!user || !user.email) return null;
  return `moneymate_transactions_${user.email.toLowerCase()}`;
}

function loadTransactions(user) {
  const key = getStorageKey(user);
  if (!key) return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function AppContent() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loadedUserEmail, setLoadedUserEmail] = useState(null);

  // --- LOAD: when user logs in/out, load THAT user's data ---
  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setLoadedUserEmail(null);
      return;
    }

    const userData = loadTransactions(currentUser);
    setTransactions(userData);
    setLoadedUserEmail(currentUser.email);
  }, [currentUser]);

  // --- SAVE: only after that user's data is loaded ---
  useEffect(() => {
    if (!currentUser) return;
    if (loadedUserEmail !== currentUser.email) return;

    const key = getStorageKey(currentUser);
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(transactions));
  }, [transactions, currentUser, loadedUserEmail]);

  function handleAddTransaction(transaction) {
    setTransactions((prev) => [...prev, transaction]);
  }

  function handleDeleteTransaction(id) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  }

  function handleClearTransactions() {
    setTransactions([]);
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* 🌟 Root → Welcome (default page) */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Public routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense onAddTransaction={handleAddTransaction} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings
                transactions={transactions}
                onClearTransactions={handleClearTransactions}
              />
            </ProtectedRoute>
          }
        />

        {/* Fallback — unknown routes → welcome */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
      
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;