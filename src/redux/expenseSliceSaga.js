import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
 name: 'expSlice',
 initialState: {
   expenses: [],
   status: 'idle',
   error: null,
   currentDate: new Date().toISOString(), // Store as ISO string
 },
 reducers: {
   // Synchronous reducers
   setNextMonth: (state) => {
     const date = new Date(state.currentDate);
     date.setMonth(date.getMonth() + 1);
     state.currentDate = date.toISOString(); // Convert back to string
   },
   setPrevMonth: (state) => {
     const date = new Date(state.currentDate);
     date.setMonth(date.getMonth() - 1);
     state.currentDate = date.toISOString(); // Convert back to string
   },

   // Fetch Expenses
   fetchExpenses: (state) => {
     state.status = 'loading';
   },
   fetchExpensesSuccess: (state, action) => {
     state.status = 'succeeded';
     state.expenses = action.payload;
   },
   fetchExpensesFailure: (state, action) => {
     state.status = 'failed';
     state.error = action.payload;
   },

   // Add Expense
   addExpense: (state) => {
     state.status = 'loading';
   },
   addExpenseSuccess: (state, action) => {
     state.expenses.push(action.payload);
     state.status = 'succeeded';
   },
   addExpenseFailure: (state, action) => {
     state.status = 'failed';
     state.error = action.payload;
   },

   // Delete Expense
   deleteExpense: (state) => {
     state.status = 'loading';
   },
   deleteExpenseSuccess: (state, action) => {
     state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
     state.status = 'succeeded';
   },
   deleteExpenseFailure: (state, action) => {
     state.status = 'failed';
     state.error = action.payload;
   },

   // Edit Expense
   editExpense: (state) => {
     state.status = 'loading';
   },
   editExpenseSuccess: (state, action) => {
     const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
     if (index !== -1) {
       state.expenses[index] = action.payload.newExpense;
     }
     state.status = 'succeeded';
   },
   editExpenseFailure: (state, action) => {
     state.status = 'failed';
     state.error = action.payload;
   },
 },
});

export const {
 setNextMonth,
 setPrevMonth,
 fetchExpenses,
 fetchExpensesSuccess,
 fetchExpensesFailure,
 addExpense,
 addExpenseSuccess,
 addExpenseFailure,
 deleteExpense,
 deleteExpenseSuccess,
 deleteExpenseFailure,
 editExpense,
 editExpenseSuccess,
 editExpenseFailure,
} = expenseSlice.actions;

export default expenseSlice.reducer;
