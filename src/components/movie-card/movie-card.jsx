//Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

//The MovieCard function component
export const MovieCard= ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text>{movie.genre}</Card.Text>
        <Card.Text>{movie.director}</Card.Text>
        <Card.Text>{movie.actors}</Card.Text>
        <Card.Text>{movie.featured}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
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