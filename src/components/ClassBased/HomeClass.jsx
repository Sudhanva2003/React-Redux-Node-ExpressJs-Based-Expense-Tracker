import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardClass from './CardClass';

class HomeClass extends Component {
 render() {
   const { expenses } = this.props;

   return (
     <div className="home-card">
       {expenses.length === 0 ? (
         <h1>No Expenses added yet.</h1>
       ) : (
         expenses.map((expense) => (
           <CardClass
             key={expense.id}
             id={expense.id}
             item={expense.item}
             price={expense.price}
             category={expense.category}
           />
         ))
       )}
     </div>
   );
 }
}

const mapStateToProps = (state) => ({
 expenses: state.expSlice.expenses,
});

export default connect(mapStateToProps)(HomeClass);
