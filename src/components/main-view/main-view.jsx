import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView= () => {
  const [movies, setMovies]= useState([
    {
      id: 1,
      Title: "The Secret Garden",
      Description: "A young girl discovers a magical garden hidden on her uncle's estate.",
      Genre: {
        Name: "Fantasy",
        Description: "Movies that involve magical or supernatural elements."
      },
      Director: {
        Name: "Marc Munden",
        Bio: "Marc Munden is a British film and television director known for his work on various drama series.",
        Birth: "January 1, 1966",
        Death: null
      },
      Actors: [
        "Dixie Egerickx",
        "Colin Firth",
        "Julie Walters"
      ],
      ImagePath: "the_secret_garden.jpg",
      Featured: true
    },
    {
      id: 2,
      Title: "Inception",
      Description: "A thief who enters the dreams of others to steal secrets from their subconscious gets a chance to redeem himself with a final job.",
      Genre: {
        Name: "Science Fiction",
        Description: "Movies that explore futuristic or speculative concepts."
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Nolan is a British-American film director and screenwriter known for his distinctive directing style and innovative storytelling.",
        Birth: "July 30, 1970",
        Death: null
      },
      Actors: [
        "Leonardo DiCaprio",
        "Joseph Gordon-Levitt",
        "Ellen Page"
      ],
      ImagePath: "inception.jpg",
      Featured: true
    },
    {
      id: 3,
      Title: "The Shawshank Redemption",
      Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
        Name: "Drama",
        Description: "Movies that depict realistic human emotions and conflicts."
      },
      Director: {
        Name: "Frank Darabont",
        Bio: "Frank Darabont is a Hungarian-American film director, screenwriter, and producer.",
        Birth: "January 28, 1959",
        Death: null
      },
      Actors: [
        "Tim Robbins",
        "Morgan Freeman",
        "Bob Gunton"
      ],
      ImagePath: "shawshank_redemption.jpg",
      Featured: false
    }
  ]);

  const [selectedMovie, setSelectedMovie]= useState(null);

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