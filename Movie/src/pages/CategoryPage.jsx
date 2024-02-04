import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import ShowItem from '../components/ShowItem';
import sortShows from '../components/sortShows';
import filterGenres from '../components/filterGenres';
const apiUrl = 'https://api.tvmaze.com/search/shows?q=all';



const CategoryPage= () => {
  const [shows, setShows] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [isGenreVisible, setIsGenreVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleGenreVisibility = () => {
    setIsGenreVisible(!isGenreVisible);
  };

  const filteredShows = filterGenres(shows, selectedGenres);
  const sortedShows = sortShows(filteredShows, sortBy);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar/Navbar */}
      <div className="md:w-1/4 p-4 text-slate-200 bg-gradient-to-br from-black via-teal-800 to-black">
        {/* Wrap the genre section inside a button for small screens */}
        {isGenreVisible && (
          <div className='mx-auto px-10 py-10'>
            <h1 className='font-extrabold text-3xl mx-auto mb-10'>Show Genre List</h1>
            {Array.from(new Set(shows.flatMap((show) => show.show.genres))).map((genre) => (
              <div key={uniqueId()}>
                
                <label className="flex items-center">
                  
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="mr-2"
                  />
                  {genre}
                </label>
              </div>
            ))}
          </div>
        )}
        {/* Button to toggle genre visibility on small screens */}
        <button
          onClick={toggleGenreVisibility}
          className="md:hidden bg-teal-800 text-slate-200 font-bold py-2 px-4 rounded mt-2 w-full"
        >
          {isGenreVisible ? 'Hide Genres' : 'Filter Show based on Genre'}
        </button>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 p-4 text-slate-200 bg-gradient-to-br from-black via-teal-800 to-black">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">Filtered Shows</h2>
          <div className="flex items-center space-x-2">
            <label className="mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border text-black p-1"
            >
              <option value="name">Name</option>
              <option value="runtime">Runtime</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black bg-gradient-to-br from-black via-teal-800 to-black">
          {sortedShows.map((show) => (
            <ShowItem key={show.show.id} show={show} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
