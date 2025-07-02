import React,{useState,useContext} from 'react'
// import { ExpenseContext } from '../context/ExpenseContext';
import '../Styles/EditPopup.css';
import '../Styles/AddCard.css';
import { useDispatch } from 'react-redux';
import { editExpense } from '../redux/expenseSlice';

const EditCard = ({type,fullDate,id,item,price,category,onClose}) => {
 // const {editExpense}=useContext(ExpenseContext);
 const dispatch=useDispatch();
 const [cardtype, setcardType] = useState(type||'Expense');
 const [formData, setFormData] = useState({
         fullDate: fullDate,
         item: item,
         price: price,
         category: category,
     });
 const [isEdited, setIsEdited] = useState(false);
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
       setIsEdited(true);
   };
 const handleEdit = (event) => {
   event.preventDefault();
   if(!isEdited){
     onClose();
     return;
   }
   const newExpense = {
     type:cardtype,
     fullDate:formData.fullDate,
     item: formData.item,
     price: formData.price,
     category: formData.category
 };
   // editExpense(id,{
   //   item:formData.item,
   //   price:formData.price,
   //   category:formData.category,
   // });
   dispatch(editExpense({id,newExpense}));
   //this is a special case where we pass two props to the reducer, you
     // it is then passed as
     //  {
           //    type:"expenses/editExpense",
           //     payload:{
           //           id:id,
           //            newExpense:newExpense  }
           // }
   onClose();
 }
 const toggleExpenseIncome = (newType) => {
       setcardType(newType);
       setIsEdited(true);
     };
  
return (
   <div className='edit-popup'>
   <div className={`addcard ${cardtype.toLowerCase()}`}>
   <div className='toggle'>
         <button
           className={`toggle-button-left ${cardtype === 'Expense' ? 'active' : ''}`}
           onClick={() => toggleExpenseIncome('Expense')}
           type="button"
         >
           Expense
         </button>
         <button
           className={`toggle-button-right ${cardtype === 'Income' ? 'active' : ''}`}
           onClick={() => toggleExpenseIncome('Income')}
           type="button"
         >
           Income
         </button>
       </div>
   <form onSubmit={handleEdit}>
           <div className="input-group">
                   <label className="input-label" htmlFor="date">Date:</label>
                   <input
                           className="input-field"
                           type="date"
                           name="fullDate"
                           value={formData.fullDate}
                           onChange={handleChange}
                   />
           </div>
           <div className="input-group">
                   <label className="input-label" htmlFor="item">Item:</label>
                   <input
                           className="input-field"
                           type="text"
                           name="item"
                           value={formData.item}
                           onChange={handleChange}
                          
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

                   />
           </div>
           <button type='submit' className='add-button'>Edit</button>
           <button type='button' className='popup-close' onClick={onClose}>
               <strong style={{ position: 'relative', top: '-8px',right:'4px' }}>X</strong>
           </button>
          

   </form>
</div>
</div>

)
}

export default EditCard;
