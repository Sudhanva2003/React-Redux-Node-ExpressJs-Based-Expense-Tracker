import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
 fetchExpensesSuccess,
 fetchExpensesFailure,
 addExpenseSuccess,
 addExpenseFailure,
 deleteExpenseSuccess,
 deleteExpenseFailure,
 editExpenseSuccess,
 editExpenseFailure,
 addExpense // Ensure this matches the action in expenseSliceSaga.js
} from './expenseSliceSaga';

//these are all action creators, expense/fetchExpenseSuccess

// API calls
const fetchExpensesApi = () => axios.get('http://localhost:5000/api/expenses');
const addExpenseApi = (newExpense) => axios.post('http://localhost:5000/api/expenses', newExpense);
const deleteExpenseApi = (id) => axios.delete(`http://localhost:5000/api/expenses/${id}`);
const editExpenseApi = ({ id, newExpense }) => axios.put(`http://localhost:5000/api/expenses/${id}`, newExpense);

//call is used to execute a function(here u can see it calls the fetchexpensesapi function)
//put is used to dispatch an action(now you enter this only on success)

// Worker Sagas
function* fetchExpensesSaga() {
 try {
   const response = yield call(fetchExpensesApi);
   yield put(fetchExpensesSuccess(response.data));
 } catch (error) {
   yield put(fetchExpensesFailure(error.message));
 }
}

function* addExpenseSaga(action) {
 try {
   const response = yield call(addExpenseApi, action.payload);
   yield put(addExpenseSuccess(response.data));
 } catch (error) {
   yield put(addExpenseFailure(error.message));
 }
}

function* deleteExpenseSaga(action) {
 try {
   yield call(deleteExpenseApi, action.payload);
   yield put(deleteExpenseSuccess(action.payload));
 } catch (error) {
   yield put(deleteExpenseFailure(error.message));
 }
}

function* editExpenseSaga(action) {
 try {
   const response = yield call(editExpenseApi, action.payload);
   yield put(editExpenseSuccess({ id: action.payload.id, newExpense: response.data }));
 } catch (error) {
   yield put(editExpenseFailure(error.message));
 }
}

// Watcher Saga
//it keeps listening for actions, so when it listens to expenses/fetchExpenses, it calls the fetchexpensessaga
export default function* expenseSaga() {
 yield takeEvery('expenses/fetchExpenses', fetchExpensesSaga);
 yield takeEvery(addExpense.type, addExpenseSaga); // Ensure this matches the action type
 yield takeEvery('expenses/deleteExpense', deleteExpenseSaga);
 yield takeEvery('expenses/editExpense', editExpenseSaga);
}




