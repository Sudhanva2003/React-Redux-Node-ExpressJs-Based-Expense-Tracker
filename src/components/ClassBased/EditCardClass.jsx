import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense } from '../redux/expenseSlice';
import '../Styles/EditPopup.css';

class EditCardClass extends Component {
 constructor(props) {
   super(props);
   this.state = {
     item: props.item,
     amount: props.price.startsWith('+') ? props.price.slice(1) : props.price,
     category: props.category,
     isEdited: false,
   };
 }

 handleChange = (event) => {
   const { name, value } = event.target;
   this.setState({ [name]: value, isEdited: true });
 };

 handleEdit = (event) => {
   event.preventDefault();
   const { id, editExpense, onClose } = this.props;
   const { item, amount, category, isEdited } = this.state;

   if (!isEdited) {
     onClose();
     return;
   }

   const newExpense = {
     item,
     price: amount.startsWith('-') ? amount : `+${amount}`,
     category,
   };

   editExpense({ id, newExpense });
   onClose();
 };

 render() {
   const { item, amount, category } = this.state;
   const { onClose } = this.props;

   return (
     <div className="edit-popup">
       <div className="addcard">
         <h2>Edit Expense</h2>
         <form onSubmit={this.handleEdit}>
           <div className="input-group">
             <label className="input-label" htmlFor="item">Item:</label>
             <input
               className="input-field"
               type="text"
               name="item"
               value={item}
               onChange={this.handleChange}
             />
           </div>
           <div className="input-group">
             <label className="input-label" htmlFor="amount">Amount:</label>
             <input
               className="input-field"
               type="number"
               name="amount"
               value={amount}
               onChange={this.handleChange}
             />
           </div>
           <div className="input-group">
             <label className="input-label" htmlFor="category">Category:</label>
             <input
               className="input-field"
               type="text"
               name="category"
               value={category}
               onChange={this.handleChange}
             />
           </div>
           <button type="submit" className="add-button">Edit</button>
           <button type="button" className="popup-close" onClick={onClose}></button>
         </form>
       </div>
     </div>
   );
 }
}

const mapDispatchToProps = { editExpense };

export default connect(null, mapDispatchToProps)(EditCardClass);
