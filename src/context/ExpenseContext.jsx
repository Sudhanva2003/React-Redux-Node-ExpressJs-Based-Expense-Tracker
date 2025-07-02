import {createContext,useState,useEffect} from 'react';
export const ExpenseContext=createContext();

export const ExpenseProvider=({children})=>{
   //this is a wrapper component, that provides the context
   //here children is a prop that represents all components wrapped inside <expenseProvider> in app.jsx
   const [expenses,setExpenses]=useState([]);
   useEffect(()=>{
       const loadedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
       setExpenses(loadedExpenses);
   },[]);
   //useEffect is required only for initial load
   //if you dont use useEffect each time this component rerenders automatically it will load localstorage

   //but you dont need it to do edit and add expense, because inside that you are anyway loading the data if required
   // and also if you ara updating local storage manually inside the function
   //if you want to sync localstorage with states, such that if state changes it should change then you can use useffect for these also
   // for example :
   // useeffect (    do some edit),[expenses] now everytime there is any change this useffect runs again



   const editExpense = (id,newExpense) => {
       const storedExpenses=JSON.parse(localStorage.getItem('expenses') || '[]');
       const updatedExpenses = storedExpenses.map((expense) => {
           if(expense.id===id){
               return {...expense,...newExpense};
           }
           else return expense;
       });
       setExpenses(updatedExpenses);
       localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
   }
   const addExpense = (newExpense) => {
       const storedExpenses=JSON.parse(localStorage.getItem('expenses') || '[]');
       const newId=storedExpenses.length>0?storedExpenses[storedExpenses.length-1].id+1:1;
       const updatedExpenses=[...expenses,{id:newId,...newExpense}];
       localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
       setExpenses(updatedExpenses)
       alert('expense added successfully');
   };
   const deleteExpense = (id) => {
       const updatedExpenses = expenses.filter(expenses=>expenses.id!==id);
       setExpenses(updatedExpenses);
       localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
       alert("Expense deleted successfully");
   };
   return(
       <ExpenseContext.Provider value={{expenses,addExpense,deleteExpense,editExpense}}>
           {/* you are making expenses available globally also u are making the function which can modify expenses available globally */}
           {children}
       </ExpenseContext.Provider>
   );
};

