import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView= () => {
  const [movies, setMovies]= useState([]);

  const [selectedMovie, setSelectedMovie]= useState(null);

  useEffect(()=> {
    fetch("https://my-movieflix-e95b2c0e9dda.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi= movies.map((movie) => {
          return {
            image: movie.ImagePath,
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth,
            death: movie.Director.Death,
            actors: movie.Actors,
            featured: movie.Featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie)=> (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onMovieClick={(newSelectedMovie)=> {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};