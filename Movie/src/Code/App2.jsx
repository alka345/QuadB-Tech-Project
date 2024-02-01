import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
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
        <Route path="/book/:id" element={<BookTickets shows={shows} />} />
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
        <Link to={`/show/${show.show.id}`}>
          <button>View Details</button>
        </Link>
        <Link to={`/book/${show.show.id}`}>
          <button>Book Ticket</button>
        </Link>
      </div>
    ))}
  </div>
);

const ShowDetails = ({ shows }) => {
  const { id } = useParams();
  const selectedShow = shows.find((show) => show.show.id.toString() === id);

  return (
    <div>
      <h1>{selectedShow.show.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedShow.show.summary) }} />
      <Link to="/">Back to Shows</Link> <br/>
      <Link to={`/book/${selectedShow.show.id}`}>
        <button>Book Ticket</button>
      </Link>
    </div>
  );
};

const BookTickets = ({ shows }) => {
  const { id } = useParams();
  const selectedShow = shows.find((show) => show.show.id.toString() === id);

  const [formData, setFormData] = useState({
    movieName: selectedShow.show.name,
    // Add other relevant details
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
  };

  return (
    <div>
      <h1>Booking Form for {selectedShow.show.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Name:
          <input type="text" value={formData.movieName} readOnly />
        </label>
        {/* Add other form fields for relevant details */}
        <button type="submit">Book Now</button>
      </form>
      <Link to={`/show/${id}`}>Back to Show Details</Link>
    </div>
  );
};

export default App;
