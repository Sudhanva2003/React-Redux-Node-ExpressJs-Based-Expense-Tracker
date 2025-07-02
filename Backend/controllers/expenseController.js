import ExpenseModel from '../models/expenseModel.js';
import db from '../database.js';

const fetchExpenses = (req, res) => {
   ExpenseModel.fetch((err, rows) => {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       res.json(rows);
   });
};

const addExpense = (req, res) => {
   const { type,fullDate,item, price, category } = req.body;
   db.run('INSERT INTO expenses(type,fullDate,item, price, category) VALUES(?, ?,?, ?, ?)', [type,fullDate,item, price, category],
       function (err) {
           if (err) {
               res.status(500).json({ error: err.message });
               return;
           }
           res.json({ id: this.lastID,type,fullDate,item, price, category });
       }
   );
};

const deleteExpense = (req, res) => {
   const { id } = req.params;
   ExpenseModel.delete(id, (err) => {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       res.json({ success: true });
   });
};

const updateExpense = (req, res) => {
   const { id } = req.params;
   const { type,fullDate,item, price, category } = req.body;
   ExpenseModel.update(id, type,fullDate, item, price, category, (err) => {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       res.json({ id, type, fullDate, item, price, category });
   });
};

export { fetchExpenses, addExpense, deleteExpense, updateExpense };
