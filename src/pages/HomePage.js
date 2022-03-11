import React, { useEffect, useState } from "react";
import Carrousel from "../components/Carrousel/Carrousel";
import Catalog from "../components/Catalog/Catalog";
import Search from "../components/Search/Search";
import {
  getConfiguration,
  getPopularMovies,
  getRecentMovies,
  searchMovie,
} from "../services/moviesService";

const HomePage = () => {
  const [title, setTitle] = useState('Recent movies');  
  const [moviesAndConf, setMoviesAndConf] = useState({
    popular: {},
    recent: {},
    conf: {},
  });  
  const searchHandler = async(query)=>{   
    const {results} = await searchMovie(query)
    setTitle(`Results for ${query}`)
    setMoviesAndConf({
      ...moviesAndConf,
      moviesSearch: {
        results,
        query
      },
    })
  }
  const recentHandler = async()=>{
    return await getRecentMovies();
  }
  useEffect(() => {
    const fetchMovies = async () => {
      const popular = await getPopularMovies();
      const recent = await getRecentMovies();
      const conf = await getConfiguration();
      const data = {
        popular,
        recent,
        conf,
      };
      setMoviesAndConf(data);
    };
    fetchMovies().catch((error) => error);
  }, []);

  return (
    <React.Fragment>
      <h2>Movies List</h2>
      {moviesAndConf.popular.results && (
        <Carrousel
          items={moviesAndConf.popular.results}
          conf={moviesAndConf.conf.images}
          path="poster_path"
          loop={true}
          effect={"coverflow"}
          autoplay={true}
          className={'.swiper-slide'}
          pagination={{clickable:true}}
          classNameSwiper={'swiper-popular'}
          />
      )}
      <Search onSearch={searchHandler}  />

      {moviesAndConf.recent.results && (        
        <Catalog 
          recent={moviesAndConf.recent.results}
          search={moviesAndConf?.moviesSearch}
          conf={moviesAndConf.conf}
          title={title}
        />
      )}
    </React.Fragment>
  );
};

export default HomePage;
