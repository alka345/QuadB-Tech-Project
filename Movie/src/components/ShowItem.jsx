import React, { useState } from 'react';
import sortShows from './sortShows';
import filterGenres from './filterGenres'
import DOMPurify from 'dompurify';
import useFetchShows from '../hooks/useFetchShows';
import { uniqueId } from 'lodash';

const ShowItem = ({ show }) => {


  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  const sanitizedSummary = show.show.summary ? show.show.summary.replace(/<[^>]*>/g, '') : '';

  return (
    <div className="bg-white text-black p-4 border rounded">
      <img
        src={show.show.image && show.show.image.medium}
        alt={show.show.name}
        className="w-full h-40 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold text-black">{show.show.name}</h3>
      <p className="text-gray-600 font-sans">
        {isSummaryVisible ? sanitizedSummary : 'Click the button to view summary'}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-gray-700">Rating: {show.show.rating.average || 'N/A'}</p>
          <p className="text-gray-700">Runtime: {show.show.runtime || 'N/A'} mins</p>
        </div>
        <button
          onClick={toggleSummaryVisibility}
          className="bg-teal-900 text-white py-2 px-4 rounded"
        >
          {isSummaryVisible ? 'Hide Summary' : 'Summary'}
        </button>
      </div>
    </div>
  );
};

export default ShowItem;
