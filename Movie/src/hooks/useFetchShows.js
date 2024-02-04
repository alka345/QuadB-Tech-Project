import React from 'react'
import DOMPurify from 'dompurify';

const useFetchShows = async () => {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
    const data = await response.json();
    return data;
  };

export default useFetchShows
