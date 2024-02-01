import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fetchShows = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
  const data = await response.json();
  return data;
};

const ShowList = ({ shows }) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className=' w-3/4 m-auto mt-11 '>
      <Slider {...carouselSettings}>
        {shows.map((show) => (
          <div key={show.show.id} className="px-4">
            <h1 className='font-bold mt-6'>{show.show.name}</h1>
            {show.show.image && <img height={300}width={300}src={show.show.image.medium} alt={show.show.name} className="w-full" />}
            
            {/* <p>{show.show.summary}</p> */}
            <Link to={`/show/${show.show.id}`}>
              {/* <button >View Details</button> */}
              <button type="button" class=" mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View Details</button>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const ShowDetails = ({ shows }) => {
  const { id } = useParams();
  const selectedShow = shows.find((show) => show.show.id.toString() === id);

  if (!selectedShow) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       {selectedShow.show.image && <img height={300}width={300}src={selectedShow.show.image.medium} alt={selectedShow.show.name} className="w-full" />}
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

  if (!selectedShow) {
    return <div>Loading...</div>;
  }

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

export default App;
