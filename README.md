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

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, React Router v7
- **UI:** Bootstrap 5, Bootstrap Icons
- **State:** Context API
- **Storage:** LocalStorage (per-user)
- **Deployment:** Vercel


## 🚀 Setup
```
/bash
git clone https://github.com/YOUR_USERNAME/moneymate.git
cd moneymate
npm install
npm run dev
```

## 📁 Project Structure
```
MoneyMate/
├── dist/                    
├── node_modules/
├── public/
├── src/
│   ├── assets/              
│   ├── components/          
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/             
│   │   └── AuthContext.jsx
│   ├── pages/               
│   │   ├── AddExpense.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   │   ├── Transactions.jsx
│   │   └── Welcome.jsx
│   |             
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md                
└── vite.config.js
```
