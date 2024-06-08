import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite, onFavoriteToggle }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Parsing to get the user object

    if (!token || !user) {
      console.error("Token or user not found in localStorage");
      return;
    }

    console.log("Favorite before toggle:", favorite);
    console.log("User:", user);
    console.log("Movie ID:", movie.id);

    try {
      if (favorite) {
        const response = await axios.delete(
          `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${encodeURIComponent(
            user.Username
          )}/movies/${encodeURIComponent(movie.id)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Removed from favorites:", response.data);
      } else {
        const response = await axios.post(
          `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${encodeURIComponent(
            user.Username
          )}/movies/${encodeURIComponent(movie.id)}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Added to favorites:", response.data);
      }
      setFavorite(!favorite);
      if (onFavoriteToggle) {
        onFavoriteToggle(movie.id);
      }
    } catch (error) {
      console.error("Error updating favorite movie", error);
    }

    console.log("Favorite after toggle:", !favorite);
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text>{movie.genre}</Card.Text>
        <Card.Text>{movie.director}</Card.Text>
        <Card.Text>{movie.featured ? "Featured" : "Not Featured"}</Card.Text>
        <Button
          variant={favorite ? "danger" : "primary"}
          onClick={handleFavoriteToggle}
          className="ml-2"
        >
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="info" className="ml-2">Open Movie</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
};
