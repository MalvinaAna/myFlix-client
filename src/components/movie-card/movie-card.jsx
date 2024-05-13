//Here you import the PropTypes library
import PropTypes from "prop-types";

//The BookCard function component
export const MovieCard= ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

//Here is where we define all the props constraints for the BookCard
BookCard.propTypes= {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string,
      death: PropTypes.string
    }),
    actors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    featured: PropTypes.bool
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};