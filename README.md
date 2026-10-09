# MoneyMate — Personal Finance Tracker

A full-featured expense tracker built with React, Vite, and Bootstrap.

🔗 **Live Demo:** https://money-mate-smoky.vercel.app

## ✨ Features
- User authentication (register/login/logout)
- Real-time dashboard with income, expenses, balance
- Transaction management with 5-filter search
- Monthly reports with category breakdowns
- Data export (JSON/CSV)
- Responsive design (mobile → 4K)

### Core Features
- **Dashboard** — Real-time summary (income, expenses, balance)
- **Transactions** — 5-filter search (title, type, category, date range)
- **Add Transaction** — Quick entry with categories
- **Reports** — Monthly breakdowns + category analysis
- **Settings** — Export data (JSON/CSV), clear all
- **Profile** — Edit name, change password

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, React Router v7
- **UI:** Bootstrap 5, Bootstrap Icons
- **State:** Context API
- **Storage:** LocalStorage (per-user)
- **Deployment:** Vercel

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/moneymate.git
cd moneymate

# Install dependencies
npm install

# Start development server
npm run dev
App will run at http://localhost:5173
```
## 📁 Project Structure
```
MoneyMate/
├── public/
├── src/
│   ├── assets/          
│   ├── components/     
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         
│   │   └── AuthContext.jsx
│   ├── pages/           
│   │   ├── Welcome.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── AddExpense.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
