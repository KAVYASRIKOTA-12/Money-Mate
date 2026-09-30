import { Link } from 'react-router-dom';

function Dashboard({ transactions }) {
  // --- Calculations ---
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  // Last 5 transactions (most recent first)
  const recentTransactions = [...transactions].reverse().slice(0, 5);

  // --- Helpers ---
  const formatINR = (value) =>
    `₹${Math.abs(value).toLocaleString('en-IN')}`;

  return (
    <div className="dashboard-page">
      <div className="container py-4 dashboard-content">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome to your MoneyMate dashboard!
        </p>

        {/* Summary Cards */}
        <div className="row g-3 my-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-muted mb-1 small text-uppercase">
                  💰&nbsp;Total Income
                </p>
                <h3 className="fw-bold text-success mb-0">
                  +{formatINR(totalIncome)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-muted mb-1 small text-uppercase">
                  💸&nbsp;Total Expenses
                </p>
                <h3 className="fw-bold text-danger mb-0">
                  -{formatINR(totalExpenses)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <p className="text-muted mb-1 small text-uppercase">
                  💼&nbsp;Available Balance
                </p>
                <h3
                  className={`fw-bold mb-0 ${balance >= 0 ? 'text-primary' : 'text-danger'
                    }`}
                >
                  {balance < 0 ? '-' : ''}
                  {formatINR(balance)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <Link to="/add-expense" className="btn btn-primary">
            ➕ Add Transaction
          </Link>
          <Link to="/transactions" className="btn btn-outline-secondary">
            📋 View All Transactions
          </Link>
        </div>

        {/* Recent Transactions */}
        <h5 className="fw-bold mb-3">🕐 Recent Transactions</h5>

        {recentTransactions.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <ul className="list-group list-group-flush">
              {recentTransactions.map((t) => (
                <li
                  key={t.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-semibold">{t.title}</div>
                    <small className="text-muted">
                      {t.category} • {t.date}
                    </small>
                  </div>
                  <span
                    className={`fw-bold ${t.type === 'Income'
                        ? 'text-success'
                        : 'text-danger'
                      }`}
                  >
                    {t.type === 'Income' ? '+' : '-'}₹
                    {Number(t.amount).toLocaleString('en-IN')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5 text-muted">
              No transactions yet. Add your first transaction to see your
              balance!
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="app-footer">
          <p className="mb-1">
            💰 <strong>MoneyMate</strong> — Track your money, master
            your future.
          </p>
          <p className="mb-0 small">
            Built with React + Vite · v1.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;