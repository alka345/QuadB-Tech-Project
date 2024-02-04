import React, { useState, useEffect } from 'react';
import useFetchShows from './hooks/useFetchShows'
import ShowList  from './pages/ShowList'
import ShowDetails  from './pages/ShowDetails'
import BookTickets from './pages/BookTickets'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ShowItem from './components/ShowItem';
import CategoryPage from './pages/CategoryPage';


const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    useFetchShows().then((data) => setShows(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList shows={shows} />} />
        <Route path="/show/:id" element={<ShowDetails shows={shows} />} />
        <Route path="/show/category" element={<CategoryPage shows={shows} />} />
        <Route path="/book/:id" element={<BookTickets shows={shows} />} />
      </Routes>
    </Router>
  );
};

export default App;
