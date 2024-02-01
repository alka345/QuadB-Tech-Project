import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import DOMPurify from 'dompurify';

const fetchShows = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
  const data = await response.json();
  return data;
};

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows().then((data) => setShows(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList shows={shows} />} />
        <Route path="/show/:id" element={<ShowDetails shows={shows} />} />
      </Routes>
    </Router>
  );
};

const ShowList = ({ shows }) => (
  <div>
    <h1>TV Shows</h1>
    {shows.map((show) => (
      <div key={show.show.id}>
        <h2>{show.show.name}</h2>
        {/* Display only text content from the summary */}
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.show.summary) }} />
        <Link to={`/show/${show.show.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    ))}
  </div>
);

const ShowDetails = ({ shows }) => {
  const showId = window.location.pathname.split('/').pop();
  const selectedShow = shows.find((show) => show.show.id.toString() === showId);

  return (
    <div>
      <h1>{selectedShow.show.name}</h1>
      {/* Display only text content from the summary */}
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedShow.show.summary) }} />
      <Link to="/">Back to Shows</Link>
    </div>
  );
};

export default App;