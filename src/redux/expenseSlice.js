import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
 const response = await axios.get('http://localhost:5000/api/expenses');
 return response.data;
});
//here this action inside the createAsyncThunk like /expenses/fetchexpenses, this will
//be called inside extra reducers to check the status of action completion.


export const addExpense = createAsyncThunk('expenses/addExpense', async (newExpense) => {
 const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
 return response.data;
});

export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (id) => {
 await axios.delete(`http://localhost:5000/api/expenses/${id}`);
 return id;
});

export const editExpense = createAsyncThunk('expenses/editExpense', async ({ id, newExpense }) => {
 const response = await axios.put(`http://localhost:5000/api/expenses/${id}`, newExpense);
 return { id, newExpense: response.data };
});

const expenseSlice = createSlice({
 name: 'expSlice',
 initialState: {
   expenses: [],
   status: 'idle',
   error: null,
   currentDate: new Date().toISOString(), // Store as ISO string
 },
 reducers: {
   setNextMonth: (state) => {
     const date = new Date(state.currentDate); // Parse ISO string back to Date
     date.setMonth(date.getMonth() + 1);
     state.currentDate = date.toISOString(); // Convert back to ISO string
   },
   setPrevMonth: (state) => {
     const date = new Date(state.currentDate); // Parse ISO string back to Date
     date.setMonth(date.getMonth() - 1);
     state.currentDate = date.toISOString(); // Convert back to ISO string
   },
   //the only reason this also is not inside extraReducers is that this is synchronous,
   // this does not need to be sent to the backend,
   // as soon as the user reloads, the state is by default set to the current month
   // so this is  an example of state mgmt locally without having to store it
 },
 extraReducers: (builder) => {

   //builder is an object provided by redux , and it allows u to add cases
   builder
     .addCase(fetchExpenses.pending, (state) => {
       state.status = 'loading';
     })
     //this is called as soon as the fetchExpenses thunk is called, even before the api call is made

     //VERY IMPORTANT
     //when this is called the state parameter is given by redux itself, it looks like the initial state,
     //but after that this guy will update the status to loading
     .addCase(fetchExpenses.fulfilled, (state, action) => {
       state.status = 'succeeded';
       state.expenses = action.payload;
     })
     //now here when status is fulfilled, it changes status to succeeded and also the actions payload,
     //which is now in json format is extracted and appended to expenses.
     .addCase(fetchExpenses.rejected, (state, action) => {
       state.status = 'failed';
       state.error = action.error.message;
     })
     .addCase(addExpense.fulfilled, (state, action) => {
       state.expenses.push(action.payload);
     })
     .addCase(deleteExpense.fulfilled, (state, action) => {
       state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
     })
     .addCase(editExpense.fulfilled, (state, action) => {
       const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
       if (index !== -1) {
         state.expenses[index] = action.payload.newExpense;
       }
     });
 },
});

export const { setNextMonth, setPrevMonth } = expenseSlice.actions;
export default expenseSlice.reducer;
