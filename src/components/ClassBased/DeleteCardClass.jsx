import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/expenseSlice';
import '../Styles/DeletePopup.css';

class DeleteCardClass extends Component {
 handleDelete = () => {
   const { id, deleteExpense, onClose } = this.props;
   deleteExpense(id);
   onClose();
 };

 render() {
   const { onClose } = this.props;

   return (
     <div className="popup-overlay">
       <div className="popup">
         <h2>Are you sure you want to delete?</h2>
         <div className="popup-buttons">
           <button className="popup-button popup-button-yes" onClick={this.handleDelete}>
             Yes
           </button>
           <button className="popup-button popup-button-no" onClick={onClose}>
             No
           </button>
           <button className="popup-close" onClick={onClose}></button>
         </div>
       </div>
     </div>
   );
 }
}

const mapDispatchToProps = { deleteExpense };

export default connect(null, mapDispatchToProps)(DeleteCardClass);

