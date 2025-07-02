import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TopNav from './components/topnav';
import Footer from './components/Footer';
import AddCard from './components/AddCard';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
// import { ExpenseProvider } from './context/ExpenseContext';
import { useDispatch } from 'react-redux';
import { fetchExpenses } from './redux/expenseSlice';

const App = () => {
 const dispatch = useDispatch();

 useEffect(() => {
   dispatch(fetchExpenses());
 }, [dispatch]);

 return (
   // <ExpenseProvider> this is for context api
   <Router>
     <TopNav />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/AddCard" element={<AddCard />} />
       <Route path="/Settings" element={<Settings />} />
       <Route path="/Analytics" element={<Analytics />} />
     </Routes>
     <Footer />
   </Router>
   // /ExpenseProvider>
 );
};

export default App;
