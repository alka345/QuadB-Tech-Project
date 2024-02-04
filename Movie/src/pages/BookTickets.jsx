import React, { useState, useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';
import DOMPurify from 'dompurify';



const BookTickets = ({ shows }) => {
    const { id } = useParams();
    const selectedShow = shows.find((show) => show.show.id.toString() === id);
  
    if (!selectedShow) {
      return <div>Loading...</div>;
    }
  
    const [formData, setFormData] = useState({
      movieName: selectedShow.show.name,
      Language: selectedShow.show.language,
      Genres:selectedShow.show.genres,
      Time:selectedShow.show.schedule.time,
      Day:selectedShow.show.schedule.days
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
          <label className='mt-10 block mb-2 text-sm font-medium text-gray-900'>
            Language:
            <input className=' mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type="text" value={formData.Language} readOnly />
          </label>
          <label className='mt-10 block mb-2 text-sm font-medium text-gray-900'>
            Genres:
            <input className=' mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type="text" value={formData.Genres} readOnly />
          </label>
          <label className='mt-10 block mb-2 text-sm font-medium text-gray-900'>
            Time:
            <input className=' mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type="text" value={formData.Time} readOnly />
          </label>
          <label className='mt-10 block mb-2 text-sm font-medium text-gray-900'>
            Day:
            <input className=' mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type="text" value={formData.Day} readOnly />
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

export default BookTickets
