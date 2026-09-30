import { useState, useMemo } from 'react';

function Transactions({ transactions, onDeleteTransaction }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // --- All categories (matches AddExpense list) ---
  const availableCategories = useMemo(() => {
    return [
      'All',
      'Salary',
      'Freelance',
      'Business',
      'Investment',
      'Food',
      'Travel',
      'Shopping',
      'Bills',
      'Health',
      'Education',
      'Other',
    ];
  }, []);

  // --- Filter logic ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // 1. Title search
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      // 2. Type filter
      const matchesType =
        filterType === 'All' || transaction.type === filterType;

      // 3. Category filter
      const matchesCategory =
        filterCategory === 'All' ||
        transaction.category === filterCategory;

      // 4. Date range filter
      // transaction.date is "YYYY-MM-DD" → safe to compare as strings
      const matchesFrom = !dateFrom || transaction.date >= dateFrom;
      const matchesTo = !dateTo || transaction.date <= dateTo;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    transactions,
    search,
    filterType,
    filterCategory,
    dateFrom,
    dateTo,
  ]);

  // --- Active filter count + clear ---
  const activeFilterCount =
    (search.trim() ? 1 : 0) +
    (filterType !== 'All' ? 1 : 0) +
    (filterCategory !== 'All' ? 1 : 0) +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  function clearAllFilters() {
    setSearch('');
    setFilterType('All');
    setFilterCategory('All');
    setDateFrom('');
    setDateTo('');
  }

  // --- Date range invalid? (From > To) ---
  const isDateRangeInvalid =
    dateFrom && dateTo && dateFrom > dateTo;

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Transactions</h2>
      <p className="text-muted">
        View and manage all your income and expenses.
      </p>

      {/* Filters Card */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h6 className="fw-bold mb-0">🔍 Search &amp; Filter</h6>

            {activeFilterCount > 0 && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearAllFilters}
              >
                ✕ Clear {activeFilterCount} filter
                {activeFilterCount > 1 ? 's' : ''}
              </button>
            )}
          </div>

          {/* ⚠️ Date range warning */}
          {isDateRangeInvalid && (
            <div className="alert alert-warning d-flex align-items-center gap-2 mb-3">
              <span>⚠️</span>
              <span>
                "From" date is <strong>after</strong> "To" date — no
                results will show. Please swap them.
              </span>
            </div>
          )}

          <div className="row g-3">
            {/* Search */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="col-6 col-md-3 col-lg-2">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div className="col-6 col-md-3 col-lg-2">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date From */}
            <div className="col-6 col-md-3 col-lg-2">
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-control"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="col-6 col-md-3 col-lg-2">
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-control"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>📝 Title</th>
                <th>🏷️ Category</th>
                <th>📅 Date</th>
                <th>🔄 Type</th>
                <th>💵 Amount</th>
                <th>⚡ Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="fw-semibold">{transaction.title}</td>

                    <td>
                      <span className="badge bg-light text-dark border">
                        {transaction.category}
                      </span>
                    </td>

                    <td>{transaction.date}</td>

                    <td>
                      <span
                        className={`badge ${transaction.type === 'Income'
                          ? 'bg-success-subtle text-success'
                          : 'bg-danger-subtle text-danger'
                          }`}
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td
                      className={`fw-bold ${transaction.type === 'Income'
                        ? 'text-success'
                        : 'text-danger'
                        }`}
                    >
                      {transaction.type === 'Income' ? '+' : '-'}₹
                      {Number(transaction.amount).toLocaleString('en-IN')}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          onDeleteTransaction(transaction.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    {transactions.length === 0
                      ? '📭 No transactions yet. Add your first transaction!'
                      : '🔍 No matching transactions found. Try different filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result count */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        <p className="text-muted mb-0">
          Showing <strong>{filteredTransactions.length}</strong> of{' '}
          <strong>{transactions.length}</strong> transaction
          {transactions.length === 1 ? '' : 's'}
        </p>

        {filteredTransactions.length > 0 && (
          <p className="text-muted mb-0 small">
            Total:{' '}
            <strong className="text-success">
              +₹
              {filteredTransactions
                .filter((t) => t.type === 'Income')
                .reduce((s, t) => s + Number(t.amount), 0)
                .toLocaleString('en-IN')}
            </strong>{' '}
            {' / '}
            <strong className="text-danger">
              -₹
              {filteredTransactions
                .filter((t) => t.type === 'Expense')
                .reduce((s, t) => s + Number(t.amount), 0)
                .toLocaleString('en-IN')}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default Transactions;