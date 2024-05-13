//Here you import the PropTypes library
import PropTypes from "prop-types";

//The MovieCard function component
export const MovieCard= ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

//Here is where we define all the props constraints for the MovieCard

MovieCard.propTypes= {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    featured: PropTypes.bool
  }).isRequired
};