import React from 'react'
import {Link, useParams } from 'react-router-dom';
import useFetchShows from '../hooks/useFetchShows';
import ShowList from './ShowList';
import DOMPurify from 'dompurify';

const ShowDetails = ({ shows }) => {
    const { id } = useParams();
    const selectedShow = shows.find((show) => show.show.id.toString() === id);
  
    if (!selectedShow) {
      return <div>Loading...</div>;
    }
  
    return (
  
      <div class="lg:m-auto max-w-md sm:w-full sm:h-screen  font-serif border border-black rounded-lg shadow">
        <img  src={selectedShow.show.image.medium} alt={selectedShow.show.name} className="w-full h-96  rounded-t-lg"/>
  
        <div class="p-5">
  
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
  

export default ShowDetails
