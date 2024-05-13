import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView= () => {
  const [movies, setMovies]= useState([]);

  const [selectedMovie, setSelectedMovie]= useState(null);

  useEffect(()=> {
    fetch("https://my-movieflix-e95b2c0e9dda.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            image: doc.ImagePath,
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            genre: doc.Genre.Name,
            director: doc.Director.Name,
            bio: doc.Director.Bio,
            birth: doc.Director.Birth,
            death: doc.Director.Death,
            actors: doc.Actors,
            featured: doc.Featured      
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