import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNextMonth, setPrevMonth } from '../redux/expenseSlice';
import ProfilePicture from "../assets/Profile_Picture_1.jpg";
import '../Styles/topnav.css'
import '../index.css'

const TopNav = () => {
   const dispatch = useDispatch();
   const currentDate = new Date(useSelector(state => state.expSlice.currentDate)); // Parse ISO string to Date
  
   const [clicked, setClicked] = useState(null);

   const handlePrevMonth = () => {
       dispatch(setPrevMonth());
       setClicked('prev');
       setTimeout(() => setClicked(null), 200);
   };

   const handleNextMonth = () => {
       dispatch(setNextMonth());
       setClicked('next');
       setTimeout(() => setClicked(null), 200);
   };

   const month = currentDate.toLocaleString('default', { month: 'long' });
   const year = currentDate.getFullYear();

   return (
   <div className="topnav">
      

           <div className="profile">
               <img src={ProfilePicture} alt="Profile" className="profile-picture" />
               <span className="profile-name">Sudhanva</span>
           </div>
           <div className="date-navigation">
               <div className={`svg-background svg-left ${clicked === 'prev' ? 'active' : ''}`}>
                   <svg
                       onClick={handlePrevMonth}
                       xmlns="http://www.w3.org/2000/svg"
                       color="black"
                       width="48"
                       height="48"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="feather feather-chevron-left svg-click-effect"
                   >
                       <polyline points="15 18 9 12 15 6"></polyline>
                   </svg>
               </div>
               <div className="date">
                   {month}, {year}
               </div>
               <div className={`svg-background svg-right ${clicked === 'next' ? 'active' : ''}`}>
                   <svg
                       onClick={handleNextMonth}
                       xmlns="http://www.w3.org/2000/svg"
                       color="black"
                       width="48"
                       height="48"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="feather feather-chevron-right svg-click-effect"
                   >
                       <polyline points="9 18 15 12 9 6"></polyline>
                   </svg>
               </div>
           </div>
           <div className="search">
                   <svg
                       onClick={() => {
                           setClicked('search');
                           setTimeout(() => setClicked(null), 300);
                       }}
                       xmlns="http://www.w3.org/2000/svg"
                       color="black"
                       width="36"
                       height="36"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="feather feather-search svg-click-effect"
                   >
                       <circle cx="11" cy="11" r="8"></circle>
                       <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                   </svg>
           </div>
       </div>
  
   );
};

export default TopNav;

