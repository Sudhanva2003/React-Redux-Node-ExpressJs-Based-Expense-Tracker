import React from 'react';
import Card from "./Card.jsx";
import "../Styles/Home.css";
import { useSelector } from 'react-redux';
import SummaryBar from './SummaryBar.jsx';

const formatDate = (dateString) => {
   try {
       const date = new Date(dateString);
       if (isNaN(date.getTime())) {
           throw new Error('Invalid date');
       }
       const day = date.getDate();
       const month = date.toLocaleString('default', { month: 'short' });

       const getOrdinal = (n) => {
           if (n > 3 && n < 21) return 'th';
           switch (n % 10) {
               case 1: return 'st';
               case 2: return 'nd';
               case 3: return 'rd';
               default: return 'th';
           }
       };

       return `${day}${getOrdinal(day)} ${month}`;
   } catch (error) {
       console.error('Error formatting date:', error);
       return 'Invalid Date';
   }
};

const Home = () => {
   const expenses = useSelector((state) => state.expSlice.expenses);
   const currentDate = new Date(useSelector((state) => state.expSlice.currentDate)); // Parse ISO string to Date

   // Filter expenses for the current month and year
   const filteredExpenses = expenses.filter(expense => {
       const expenseDate = new Date(expense.fullDate);
       return expenseDate.getMonth() === currentDate.getMonth() &&
              expenseDate.getFullYear() === currentDate.getFullYear();
   });

   const { totalExpense, totalIncome } = filteredExpenses.reduce((acc, expense) => {
       const amount = parseFloat(expense.price);
       if (!isNaN(amount)) { // Ensure the price is a valid number
           if (expense.type === 'Expense') {
               acc.totalExpense += amount;
           } else if (expense.type === 'Income') {
               acc.totalIncome += amount;
           }
       } else {
           console.error('Invalid price for expense:', expense);
       }
       return acc;
   }, { totalExpense: 0, totalIncome: 0 });

   let netAmount = totalIncome - totalExpense;


   // Group expenses by date
   const groupedExpenses = filteredExpenses.reduce((acc, expense) => {
       if (!expense.fullDate) {
           console.error('Expense missing fullDate:', expense);
           return acc;
       }
       const date = expense.fullDate // Get date part only
       if (!acc[date]) {
           acc[date] = [];
       }
       acc[date].push(expense);
       return acc;
   }, {});

   console.log('Grouped expenses:', groupedExpenses);

   // Sort dates in descending order
   const sortedDates = Object.keys(groupedExpenses).sort((a, b) => new Date(b) - new Date(a));

   console.log('Sorted dates:', sortedDates);

  
   return (
       <div className='home'>
       <SummaryBar totalExpenses={totalExpense} totalIncome={totalIncome} netAmount={netAmount} />
       <div className='home-card'>
           {filteredExpenses.length === 0 ? (
               <h1>No Expenses for {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
           )  : (
               sortedDates.map((date) => (
                   <div key={date} className="date-group">
                       <div className='fulldate'>{formatDate(date)}</div>
                       <div className="expense-cards">
                           {groupedExpenses[date].map((expense) => (
                               <Card
                                   key={expense.id}
                                   type={expense.type}
                                   fullDate={expense.fullDate}
                                   id={expense.id}
                                   item={expense.item}
                                   price={expense.price}
                                   category={expense.category}
                               />
                           ))}
                       </div>
                   </div>
               ))
           )}
       </div>
   </div>
   );
};

export default Home;
