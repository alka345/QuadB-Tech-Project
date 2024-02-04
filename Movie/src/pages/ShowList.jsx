import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import defaultImg from '/defaultImg.png';
import useFetchShows from '../hooks/useFetchShows';


const ShowList = ({ shows }) => {
    const getSlidesToShow = () => {
      const screenWidth = window.innerWidth;
      if(screenWidth > 789 ){
        return 3;
      } else {
        return 1;
      }
  
      }
    
    const carouselSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: getSlidesToShow(),
      slidesToScroll: 1,
    };
  
    return (
      <div className=' w-3/4 m-auto mt-11 font-serif  '>
        <Slider {...carouselSettings}>
          {shows.map((show) => (
            <div key={show.show.id} className="px-4 ">
              <h1 className='font-bold mt-6'>{show.show.name}</h1>
                {show.show.image && <img height={300} width={300} src={show.show.image.medium } alt={show.show.name} className="w-full" />}  
               
            <div className='flex '>
              <p className='mt-5'>{show.show.language}</p>
              
              <p  className='mt-5  ml-10'>
                {show.show.rating.average}
              </p>
              
              <p className='mt-5 ml-10'>{show.show.genres}</p>
              </div>
              
            <div className='flex'>
            <Link to={`/show/${show.show.id}`}>
              <button type="button" class="w-full mt-5  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Summary</button>
              </Link>
              <Link to={`/show/explore`}>
              <button type="button" class="w-full mt-5 ml-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Explore</button>
              </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

export default ShowList
