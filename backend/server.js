const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const membersFile = "./members.json";
const expensesFile = "./expenses.json";
const debtsFile = "./debts.json";

function calculateDebts(members, expenses) {
  const balance = {};
  members.forEach(m => (balance[m] = 0));

  expenses.forEach(exp => {
    const split = exp.amount / members.length;

    members.forEach(m => {
      if (m === exp.paidBy) balance[m] += exp.amount - split;
      else balance[m] -= split;
    });
  });

  const creditors = [];
  const debtors = [];

  Object.entries(balance).forEach(([name, amt]) => {
    if (amt > 0) creditors.push({ name, amt });
    if (amt < 0) debtors.push({ name, amt: -amt });
  });

  const debts = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt);

    debts.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: Number(pay.toFixed(2))
    });

    debtors[i].amt -= pay;
    creditors[j].amt -= pay;

    if (debtors[i].amt === 0) i++;
    if (creditors[j].amt === 0) j++;
  }

  return debts;
}

/* MEMBERS */
app.get("/members", (req, res) => {
  const members = JSON.parse(fs.readFileSync(membersFile));
  res.json(members);
});

app.post("/members", (req, res) => {
  const { name } = req.body;
  const members = JSON.parse(fs.readFileSync(membersFile));

  if (members.includes(name))
    return res.status(400).json({ message: "Member exists" });

  members.push(name);
  fs.writeFileSync(membersFile, JSON.stringify(members, null, 2));
  res.json(members);
});

/* EXPENSES */
app.get("/expenses", (req, res) => {
  const expenses = JSON.parse(fs.readFileSync(expensesFile));
  res.json(expenses);
});

app.post("/expenses", (req, res) => {
  const { paidBy, amount, description } = req.body;

  const expenses = JSON.parse(fs.readFileSync(expensesFile));
  const members = JSON.parse(fs.readFileSync(membersFile));

  const newExpense = {
    paidBy,
    amount: Number(amount),
    description,
    date: new Date()
  };

  expenses.push(newExpense);
  fs.writeFileSync(expensesFile, JSON.stringify(expenses, null, 2));

  const debts = calculateDebts(members, expenses);
  fs.writeFileSync(debtsFile, JSON.stringify(debts, null, 2));

  res.json(newExpense);
});

/* DEBTS */
app.get("/debts", (req, res) => {
  const debts = JSON.parse(fs.readFileSync(debtsFile));
  res.json(debts);
});

/* TRANSACTIONS */
app.get("/transactions", (req, res) => {
  const expenses = JSON.parse(fs.readFileSync(expensesFile));
  res.json(expenses);
});

app.listen(5000, () => console.log("Server running on port 5000"));
