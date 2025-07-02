import React from 'react';
import { useContext } from 'react';
import '../Styles/DeletePopup.css';
// import { ExpenseContext } from '../context/ExpenseContext';
import {useDispatch} from 'react-redux';
import {deleteExpense} from '../redux/expenseSlice';

// const Delete = ({onClose,id}) => {

//   const {deleteExpense}=useContext(ExpenseContext);

//   const handleDelete = () => {
//     onClose();
//     deleteExpense(id);
//   }

 const Delete=({onClose,id})=>{
   const dispatch=useDispatch();



 return (
   <div className="popup-overlay">
     <div className="popup">
       <h2>Are you sure you want to delete?</h2>
       <div className="popup-buttons">
         <button className="popup-button popup-button-yes" onClick={()=>dispatch(deleteExpense(id))}>Yes</button>
         {/* this dispatch is automatically converted into
         {
           type:"expenses/deleteExpense",
           payload:id
         } */}
         <button className="popup-button popup-button-no" onClick={onClose}>No</button>
         <button className="popup-close" onClick={onClose}></button>
       </div>
     </div>
   </div>
 );
};

export default Delete;

