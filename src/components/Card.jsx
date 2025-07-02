import React,{useState} from 'react';
import '../Styles/card.css';
import  DeleteCard from './DeleteCard';
import EditCard from './EditCard';

const Card = ({id,type,fullDate,item,price,category}) => {
   const [showDeletePopup, setShowDeletePopup] = useState(false);
   const [showEditPopup, setShowEditPopup] = useState(false);
  

   const priceStyle = {
       color: type === 'Expense' ? '#B83C08' : '#A4B465'
   };

   return (
       <div className="Card">
           <svg className="card-icon left" color="black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" onClick={() => setShowEditPopup(true)}>
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
           </svg>
           <svg
               className="card-icon right"
               color="black"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               width="48"
               height="48"
               fill="currentColor"
               viewBox="0 0 24 24"
               onClick={() => setShowDeletePopup(true)}
           >
               <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
           </svg>
           <div className="title" style={{ backgroundColor: priceStyle.color }}>
               <div className="item"></div>
               <div style={{ fontSize: '30px' }}>{item}</div>
               <div className="price" style={{fontSize:'30px'}}>
                   {type === 'Expense' ? `-₹${price}` : `+₹${price}`}
               </div>
           </div>
           <div className="category">
               <div style={{ fontSize: '30px' }}>{category}</div>

           </div>
           {showEditPopup && <EditCard
           type={type}
           fullDate={fullDate}
           id={id}
           price={price}
           item={item}
           category={category}
           onClose={() => setShowEditPopup(false)}
           />}
           {showDeletePopup && <DeleteCard
           id={id}
           onClose={() => setShowDeletePopup(false)}
          
           />}
           {/* here this is important when the state of showdeletepopup changes, react rerenders
           this component, so if its false it wont call that card itself,at any point if this state changes
           this will trigger dont have to call this file or anything, thats why in redux u can handle this
           state mgmt better */}
       </div>
   );
};

export default Card;
