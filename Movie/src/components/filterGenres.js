import React from 'react'
import { uniqueId } from 'lodash';

const filterGenres = (shows, selectedGenres) => {
    if (!selectedGenres.length) return shows;
  
    return shows.filter((show) =>
      show.show.genres.some((genre) => selectedGenres.includes(genre))
    );
  };
  

export default filterGenres
