import React from 'react'


const sortShows = (shows, sortBy) => {
    switch (sortBy) {
      case 'name':
        return shows.slice().sort((a, b) => a.show.name.localeCompare(b.show.name));
      case 'runtime':
        return shows.slice().sort((a, b) => a.show.runtime - b.show.runtime);
      case 'rating':
        return shows.slice().sort((a, b) => b.show.rating.average - a.show.rating.average);
      default:
        return shows;
    }
  };

export default sortShows
