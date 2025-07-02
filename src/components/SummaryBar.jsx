import React from 'react';
import '../Styles/SummaryBar.css'; // Assuming you have a CSS file for styling


const SummaryBar = ({ totalIncome, totalExpenses, netAmount }) => {
   return (
       <div className="summary-bar">
           <div className="summary-item">Income: ₹{totalIncome.toFixed(2)}</div>
           <div className="summary-item">Expenses: ₹{totalExpenses.toFixed(2)}</div>
           <div className="summary-item">Net: ₹{netAmount.toFixed(2)}</div>
       </div>
   );
};


export default SummaryBar;


