import { useState } from 'react';

const APP_VERSION = '1.0.0';

function Settings({ transactions, onClearTransactions }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');

  // --- Storage stats ---
  const storedJson = JSON.stringify(transactions);
  const storageBytes = new Blob([storedJson]).size;
  const storageKB = (storageBytes / 1024).toFixed(2);

  // --- Handlers ---
  function handleExportJSON() {
    if (transactions.length === 0) {
      setMessage('No transactions to export.');
      return;
    }

    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: 'application/json',
    });
    downloadBlob(blob, 'moneymate-backup.json');
    setMessage('Exported as JSON.');
  }

  function handleExportCSV() {
    if (transactions.length === 0) {
      setMessage('No transactions to export.');
      return;
    }

    const headers = ['id', 'date', 'type', 'title', 'category', 'amount'];
    const rows = transactions.map((t) =>
      [t.id, t.date, t.type, t.title, t.category, t.amount]
        .map(csvEscape)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    downloadBlob(blob, 'moneymate-transactions.csv');
    setMessage('Exported as CSV.');
  }

  function handleConfirmClear() {
    onClearTransactions();
    setShowConfirm(false);
    setMessage('All transactions cleared.');
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function csvEscape(value) {
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Settings</h2>
      <p className="text-muted">
        Manage your MoneyMate preferences and data.
      </p>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      {/* --- Data Management --- */}
      <h5 className="fw-bold mt-4 mb-3">Data Management</h5>

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 className="fw-bold mb-1">Storage</h6>
              <p className="text-muted small mb-0">
                Your data is saved in your browser's LocalStorage.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="border rounded p-3">
                <p className="text-muted small text-uppercase mb-1">
                  Transactions Stored
                </p>
                <h4 className="fw-bold mb-0">{transactions.length}</h4>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border rounded p-3">
                <p className="text-muted small text-uppercase mb-1">
                  Storage Used
                </p>
                <h4 className="fw-bold mb-0">{storageKB} KB</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Export --- */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <h6 className="fw-bold mb-1">Export Data</h6>
          <p className="text-muted small mb-3">
            Download a backup of all your transactions.
          </p>

          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-outline-success"
              onClick={handleExportJSON}
            >
              Export as JSON
            </button>
            <button
              className="btn btn-outline-success"
              onClick={handleExportCSV}
            >
              Export as CSV
            </button>
          </div>
        </div>
      </div>

      {/* --- Danger Zone --- */}
      <div className="card border-0 shadow-sm mb-3 border-danger-subtle">
        <div className="card-body">
          <h6 className="fw-bold text-danger mb-1">Danger Zone</h6>
          <p className="text-muted small mb-3">
            Clearing your data is permanent and cannot be undone. Export
            a backup first if you want to keep it.
          </p>

          {!showConfirm ? (
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowConfirm(true)}
              disabled={transactions.length === 0}
            >
              Clear All Transactions
            </button>
          ) : (
            <div className="alert alert-danger mb-0">
              <p className="fw-bold mb-2">
                Are you sure? This will delete all {transactions.length}{' '}
                transaction{transactions.length === 1 ? '' : 's'}.
              </p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleConfirmClear}
                >
                  Yes, delete everything
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- About --- */}
      <h5 className="fw-bold mt-4 mb-3">About</h5>

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">App</span>
            <span className="fw-semibold">MoneyMate</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Version</span>
            <span className="fw-semibold">{APP_VERSION}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Data</span>
            <span className="fw-semibold">
              Stored locally on your device
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Built with</span>
            <span className="fw-semibold">
              React + Vite + Bootstrap
            </span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-muted text-center small mt-4 mb-0">
        💰 Track your money, master your future.
      </p>
    </div>
  );
}

export default Settings;