import React, { Component } from 'react';
import '../Styles/card.css';
import DeleteCardClass from './DeleteCardClass';
import EditCardClass from './EditCardClass';

class CardClass extends Component {
 constructor(props) {
   super(props);
   this.state = {
     showDeletePopup: false,
     showEditPopup: false,
   };
 }

 toggleDeletePopup = () => {
   this.setState((prevState) => ({ showDeletePopup: !prevState.showDeletePopup }));
 };

 toggleEditPopup = () => {
   this.setState((prevState) => ({ showEditPopup: !prevState.showEditPopup }));
 };

 render() {
   const { id, item, price, category } = this.props;
   const { showDeletePopup, showEditPopup } = this.state;
   const priceStyle = {
     color: price.startsWith('-') ? '#B83C08' : '#A4B465',
   };

   return (
     <div className="Card">
       <svg
         className="card-icon left"
         color="black"
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         width="48"
         height="48"
         fill="none"
         viewBox="0 0 24 24"
         onClick={this.toggleEditPopup}
       >
         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
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
         onClick={this.toggleDeletePopup}
       >
         <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
       </svg>
       <div className="title" style={{ backgroundColor: priceStyle.color }}>
         <div className="item"></div>
         <div style={{ fontSize: '30px' }}>{item}</div>
         <div className="price" style={{ fontSize: '30px' }}>
           {price}
         </div>
       </div>
       <div className="category">
         <div style={{ fontSize: '30px' }}>{category}</div>
       </div>
       {showEditPopup && (
         <EditCardClass
           id={id}
           price={price}
           item={item}
           category={category}
           onClose={this.toggleEditPopup}
         />
       )}
       {showDeletePopup && (
         <DeleteCardClass
           id={id}
           onClose={this.toggleDeletePopup}
         />
       )}
     </div>
   );
 }
}

export default CardClass;
