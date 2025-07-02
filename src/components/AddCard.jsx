import React, { useState, useEffect } from 'react';
//import {addContext} from '../context/ExpenseContext';
import '../Styles/AddCard.css';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/expenseSlice';

const AddCard = () => {
   //const {addExpense}=useContext(addContext);
   const dispatch = useDispatch();
   const [type, setType] = useState('Expense');
   const [formData, setFormData] = useState({
       fullDate: '',
       item: '',
       price: '',
       category: ''
   });

   const getTodayDate = () => {
       return new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
   };

   useEffect(() => {
       setFormData(prevData => ({
           ...prevData,
           fullDate: getTodayDate()
       }));
   }, []);

   const handleChange = (event) => {
       //event is an object in js which deals with handling events
       const { name, value } = event.target;
       //event.target targets the particular element which triggered this event
       //in this case a particular input box has triggered
       setFormData(prevData => ({
           ...prevData,[name]: value
       //prev data comes as is
       //name sets the name of the item
       }));
      
   };

   const handleSubmit = (event) => {
       event.preventDefault();
       const newExpense = {
           fullDate: formData.fullDate,
           type: type,
           item: formData.item,
           price: formData.price,
           category: formData.category
       };
       // addExpense({
   //   item:formData.item,
   //   price:formData.price,
   //   category:formData.category,
   // });
       dispatch(addExpense(newExpense));
       setFormData({
           fullDate: getTodayDate(),
           item: '',
           price: '',
           category: ''
       });
       setType('Expense'); // Reset type to 'Expense' after submission
       alert("card added successfully");
   };

   const toggleExpenseIncome = (newType) => {
       setType(newType);
   };

   return (
       <div className={`addcard ${type.toLowerCase()}`}>
           <div className='toggle'>
               <button
                   className={`toggle-button-left ${type === 'Expense' ? 'active' : ''}`}
                   onClick={() => toggleExpenseIncome('Expense')}
                   type="button"
               >
                   Expense
               </button>
               <button
                   className={`toggle-button-right ${type === 'Income' ? 'active' : ''}`}
                   onClick={() => toggleExpenseIncome('Income')}
                   type="button"
               >
                   Income
               </button>
           </div>
           <form onSubmit={handleSubmit}>
               <div className='input-group'>
                   <label className='input-label' htmlFor='date'>Date:</label>
                   <input className='input-field' type='date' name='fullDate' value={formData.fullDate} onChange={handleChange} />
               </div>
               <div className="input-group">
                   <label className="input-label" htmlFor="item">Item:</label>
                   <input
                       className="input-field"
                       type="text"
                       name="item"
                       value={formData.item}
                       onChange={handleChange}
                       required
                   />
               </div>
               <div className="input-group">
                   <label className="input-label" htmlFor="price">price:</label>
                   <input
                       className="input-field"
                       type="number"
                       name="price"
                       value={formData.price}
                       onChange={handleChange}
                       required
                   />
               </div>
               <div className="input-group">
                   <label className="input-label" htmlFor="category">Category:</label>
                   <input
                       className="input-field"
                       type="text"
                       name="category"
                       value={formData.category}
                       onChange={handleChange}
                       required
                   />
               </div>
               <button className="add-button" type="submit">Add</button>
           </form>
       </div>
   );
};

export default AddCard;
