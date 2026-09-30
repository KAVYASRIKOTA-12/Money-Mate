import { useState } from 'react';

function AddExpense({ onAddTransaction }) {
  const [type, setType] = useState('Expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [message, setMessage] = useState('');

  const categories =
    type === 'Income'
      ? ['Salary', 'Freelance', 'Business', 'Investment', 'Other']
      : ['Food', 'Travel', 'Shopping', 'Bills', 'Health', 'Education', 'Other'];

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !category || !date) {
      setMessage('Please fill in all fields with valid values.');
      return;
    }

    const transaction = {
      id: Date.now(),
      type,
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    onAddTransaction(transaction);

    setMessage('Transaction added successfully!');
    setTitle('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="fw-bold">Add Transaction</h2>
            <p className="text-muted">
              Record your income or expenses.
            </p>

            {message && (
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Transaction Type */}
              <div className="mb-3">
                <label className="form-label">Transaction Type</label>

                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setCategory('');
                  }}
                >
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
              </div>

              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Groceries or Monthly Salary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label className="form-label">💵Amount (₹)</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>

                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">🏷️Select category</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="form-label">📅Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-success w-100">
                ✅ Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;