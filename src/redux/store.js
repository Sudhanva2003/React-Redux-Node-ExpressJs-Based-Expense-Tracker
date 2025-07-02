import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import expenseReducer from './expenseSlice'; // Use the saga-compatible slice
// import expenseSaga from './saga';

//const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
 reducer: {
   expSlice: expenseReducer, // Ensure this matches the saga-compatible slice
 },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
//   devTools: process.env.NODE_ENV !== 'production',
});

// sagaMiddleware.run(expenseSaga);

export default store;
