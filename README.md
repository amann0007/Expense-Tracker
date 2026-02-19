# 💸 Expense Sharing System (Pair-Wise Owes Model)

A full-stack web application that helps groups track shared expenses and automatically calculate who owes whom.
The system splits expenses equally, computes net balances, and minimizes transactions using a pair-wise settlement algorithm.

---

## 🚀 Live Demo

👉 Frontend: *Add your Vercel link here*
👉 Backend API: *Add your Render link here*

---

## 📌 Features

* 👥 Add and view group members (no duplicates)
* 💰 Add shared expenses with description
* ⚖️ Equal split among all members
* 🔄 Automatic debt recalculation
* 🔗 Pair-wise settlement (minimal transactions)
* 📊 Dashboard showing who owes and receives
* 🔍 Member filter to view individual balance
* 📜 Transaction history
* 💾 JSON file storage (no database)

---

## 🏗️ Tech Stack

**Frontend**

* React
* JavaScript
* CSS

**Backend**

* Node.js
* Express

**Storage**

* JSON files using `fs` module

---

## 🧠 How It Works

1. When an expense is added, the total amount is split equally among all members.
2. The payer’s balance increases, and others’ balances decrease.
3. The system calculates net balances.
4. A greedy settlement algorithm converts balances into pair-wise debts.
5. The frontend displays the final debts and transaction history.

---

## 📂 Project Structure

```
expense-sharing-app
│
├── backend
│   ├── server.js
│   ├── members.json
│   ├── expenses.json
│   └── debts.json
│
└── frontend
    └── src
        ├── App.js
        └── App.css
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/expense-sharing-app.git
cd expense-sharing-app
```

---

### 2️⃣ Run Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🌐 API Endpoints

### Members

* `GET /members` → Get all members
* `POST /members` → Add a member

### Expenses

* `GET /expenses` → Get all expenses
* `POST /expenses` → Add expense

### Debts

* `GET /debts` → Get pair-wise debts

### Transactions

* `GET /transactions` → Get expense history

---

## 🧪 Example Flow

1. Add members: Aman, Rahul, Priya
2. Add expense: Aman paid ₹900
3. Each share = ₹300
4. Final result:

   * Rahul owes Aman ₹300
   * Priya owes Aman ₹300

---

## 🎓 Learning Outcomes

* Building REST APIs with Express
* Using file system for persistence
* Connecting React with backend APIs
* Implementing financial calculation logic
* Managing derived state in frontend

---
## 📜 License

This project is for educational purposes.
