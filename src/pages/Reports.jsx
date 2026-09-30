import { useState, useMemo } from 'react';

function Reports({ transactions }) {
  // --- Group transactions by month (YYYY-MM) ---
  const monthlyData = useMemo(() => {
    const groups = {};

    transactions.forEach((t) => {
      const month = t.date.slice(0, 7); // "2026-01"
      if (!groups[month]) {
        groups[month] = { income: 0, expenses: 0, count: 0 };
      }
      if (t.type === 'Income') {
        groups[month].income += Number(t.amount);
      } else {
        groups[month].expenses += Number(t.amount);
      }
      groups[month].count += 1;
    });

    // Sort months descending (most recent first)
    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([month, data]) => ({ month, ...data }));
  }, [transactions]);

  // --- Available months for the dropdown ---
  const availableMonths = monthlyData.map((m) => m.month);

  const [selectedMonth, setSelectedMonth] = useState(
    availableMonths[0] || ''
  );

  // Ensure selectedMonth stays valid if data changes
  const activeMonth =
    availableMonths.includes(selectedMonth)
      ? selectedMonth
      : availableMonths[0] || '';

  // --- Filtered transactions for selected month ---
  const monthTransactions = useMemo(() => {
    if (!activeMonth) return [];
    return transactions.filter((t) => t.date.startsWith(activeMonth));
  }, [transactions, activeMonth]);

  // --- Summary for selected month ---
  const monthIncome = monthTransactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthExpenses = monthTransactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthBalance = monthIncome - monthExpenses;

  // --- Category breakdown (expenses only) ---
  const categoryBreakdown = useMemo(() => {
    const totals = {};

    monthTransactions
      .filter((t) => t.type === 'Expense')
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
      });

    return Object.entries(totals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [monthTransactions]);

  const maxCategoryAmount =
    categoryBreakdown[0]?.amount || 0;

  // --- Helpers ---
  const formatINR = (value) =>
    `₹${Math.abs(value).toLocaleString('en-IN')}`;

  const formatMonth = (yyyyMm) => {
    if (!yyyyMm) return '';
    const [year, month] = yyyyMm.split('-');
    const date = new Date(year, month - 1, 1);
    return date.toLocaleString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Reports</h2>
      <p className="text-muted">
        View your monthly income, spending, and balance.
      </p>

      {/* Empty state: no data at all */}
      {monthlyData.length === 0 ? (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body text-center py-5 text-muted">
            No transactions yet. Add your first transaction to see reports!
          </div>
        </div>
      ) : (
        <>
          {/* Month Selector */}
          <div className="row g-3 my-3">
            <div className="col-md-4">
              <label className="form-label">Select Month</label>
              <select
                className="form-select"
                value={activeMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {formatMonth(m)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary Cards for selected month */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1 small text-uppercase">
                    Income
                  </p>
                  <h3 className="fw-bold text-success mb-0">
                    +{formatINR(monthIncome)}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1 small text-uppercase">
                    Expenses
                  </p>
                  <h3 className="fw-bold text-danger mb-0">
                    -{formatINR(monthExpenses)}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1 small text-uppercase">
                    Balance
                  </p>
                  <h3
                    className={`fw-bold mb-0 ${
                      monthBalance >= 0 ? 'text-primary' : 'text-danger'
                    }`}
                  >
                    {monthBalance < 0 ? '-' : ''}
                    {formatINR(monthBalance)}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <h5 className="fw-bold mb-3">
            Spending by Category — {formatMonth(activeMonth)}
          </h5>

          {categoryBreakdown.length > 0 ? (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                {categoryBreakdown.map(({ category, amount }) => {
                  const pct =
                    monthExpenses > 0
                      ? (amount / monthExpenses) * 100
                      : 0;
                  const barWidth =
                    maxCategoryAmount > 0
                      ? (amount / maxCategoryAmount) * 100
                      : 0;

                  return (
                    <div key={category} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="fw-semibold">{category}</span>
                        <span className="text-muted">
                          {formatINR(amount)}{' '}
                          <small>({pct.toFixed(1)}%)</small>
                        </span>
                      </div>
                      <div
                        className="progress"
                        style={{ height: '8px' }}
                      >
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: `${barWidth}%` }}
                          aria-valuenow={barWidth}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body text-center py-4 text-muted">
                No expenses recorded for this month.
              </div>
            </div>
          )}

          {/* Monthly Breakdown Table */}
          <h5 className="fw-bold mb-3">All Months</h5>

          <div className="card border-0 shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Month</th>
                    <th>Transactions</th>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map(({ month, income, expenses, count }) => {
                    const balance = income - expenses;
                    return (
                      <tr
                        key={month}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedMonth(month)}
                      >
                        <td className="fw-semibold">
                          {formatMonth(month)}
                        </td>
                        <td>{count}</td>
                        <td className="text-success fw-semibold">
                          +{formatINR(income)}
                        </td>
                        <td className="text-danger fw-semibold">
                          -{formatINR(expenses)}
                        </td>
                        <td
                          className={`fw-bold ${
                            balance >= 0 ? 'text-primary' : 'text-danger'
                          }`}
                        >
                          {balance < 0 ? '-' : ''}
                          {formatINR(balance)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;