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
            {show.show.image && <img height={300} width={300} src={show.show.image.medium} alt={show.show.name} className="w-full" />}

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

//display summary

const ShowDetails = ({ shows }) => {
  const { id } = useParams();
  const selectedShow = shows.find((show) => show.show.id.toString() === id);

  if (!selectedShow) {
    return <div>Loading...</div>;
  }

  return (

    <div class=" m-auto max-w-md  font-serif border border-black rounded-lg shadow">
      <img  src={selectedShow.show.image.medium} alt={selectedShow.show.name} className="w-full h-96 rounded-t-lg" />

      <div class="p-5 ">

        <h1 class=" flex  justify-center items-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{selectedShow.show.name}</h1>


        <p class="mb-3 font-serif text-black" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedShow.show.summary) }} />
      <div className='flex justify-center items-center'>
        <Link class="text-gray-900 ml-8  hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" to={`/book/${selectedShow.show.id}`}>
          <button>Book Ticket</button>
        </Link>
        <Link class="text-gray-900 ml-5 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" to="/"><button>Back to Shows</button></Link>
        </div>
      </div>
    </div>

  )


};

//movie ticket booking

const BookTickets = ({ shows }) => {
  const { id } = useParams();
  const selectedShow = shows.find((show) => show.show.id.toString() === id);

  if (!selectedShow) {
    return <div>Loading...</div>;
  }

  const [formData, setFormData] = useState({
    movieName: selectedShow.show.name
    // Add other relevant details
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
  };

  return (
    
    <div
    className="w-full  h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat py-5 "
     style={{
         backgroundImage: `url(${selectedShow.show.image.medium})` }}
         >

    <div className='max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-7 mt-10 text-black bg-[#c47243] font-medium '>

      {/* <h1 className=' mx-auto mt-20 font-bold'>{selectedShow.show.name}</h1> */}
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
        <img className='w-full' src={selectedShow.show.image.medium} alt="" />
        <label className='mt-10 block mb-2 text-sm font-medium text-gray-900'>
          Movie Name:
          <input className=' mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type="text" value={formData.movieName} readOnly />
        </label>
        {/* Add other form fields for relevant details */}
        {/* <button type="submit">Book Now</button> */}
        
        <button type="submit" class="mt-10 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Book Now</button>
      
      <Link className='mx-auto text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' to={`/show/${id}`}>Back to Show Details </Link>
      </form>

    </div>
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
