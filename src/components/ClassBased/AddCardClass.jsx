import React, { Component } from 'react';
import '../Styles/AddCard.css';
import { connect } from 'react-redux';
import { addExpense } from '../../redux/expenseSlice';

class AddCardClass extends Component {
 constructor(props) {
   super(props);
   this.state = {
     item: '',
     amount: '',
     category: '',
   };
 }

 handleChange = (event) => {
   const { name, value } = event.target;
   this.setState({ [name]: value });
 };

 handleSubmit = (event) => {
   event.preventDefault();
   const { item, amount, category } = this.state;
   const newExpense = {
     item,
     price: amount.startsWith('-') ? amount : `+${amount}`,
     category,
   };
   this.props.addExpense(newExpense);
   this.setState({ item: '', amount: '', category: '' });
   alert('Card added successfully');
 };

 render() {
   const { item, amount, category } = this.state;
   return (
     <div className="addcard">
       <h2>Expense</h2>
       <form onSubmit={this.handleSubmit}>
         <div className="input-group">
           <label className="input-label" htmlFor="item">Item:</label>
           <input
             className="input-field"
             type="text"
             name="item"
             value={item}
             onChange={this.handleChange}
             required
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
             required
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
             required
           />
         </div>
         <button className="add-button" type="submit">Add</button>
       </form>
     </div>
   );
 }
}

const mapDispatchToProps = { addExpense };

export default connect(null, mapDispatchToProps)(AddCardClass);

//usedispatch is used in functional components to dispatch actions
//connect is used in class components to dispatch actions
