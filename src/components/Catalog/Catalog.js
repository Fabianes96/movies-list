
import { LinearProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Catalog.css";

import MovieCard from "../MovieCard/MovieCard";
import { useEffect, useState } from "react";
import { getRecentMovies, searchMovie } from "../../services/moviesService";
import movieImg from "../../assets/movie_img.png";

const Catalog = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState(props.recent);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (props.search?.results) {
      setMovies(props.search.results);
    }
  }, [props.search?.results]);

  const fetchMovies = async () => {
    let data;
    if (props.search?.results) {
      data = await searchMovie(props.search.query, page);
    } else {
      data = await getRecentMovies(page);
    }
    setMovies([...movies, ...data.results]);
    if (data.results.length === 0 || data.results.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  return (
    <section className="catalog">
      <h2>{props.title}</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={hasMore}
        loader={<LinearProgress className="linear" />}
        endMessage={movies.length === 0 && <p>No movies found</p>}
      >
        <div className="container_recent">
          {movies.map((movie, idx) => (
            <MovieCard
              id={movie.id}
              key={idx}
              src={
                movie.poster_path || movie.backdrop_path
                  ? props.conf.images.base_url +
                    props.conf.images.poster_sizes[4] +
                    (movie.poster_path ?? movie.backdrop_path)
                  : movieImg
              }
              title={movie.title}
              conf={props.conf}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Catalog;