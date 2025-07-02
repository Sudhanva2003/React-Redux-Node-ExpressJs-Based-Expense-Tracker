import express from 'express';
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();
router.get('/', fetchExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);
router.put('/:id', updateExpense);

export default router;
