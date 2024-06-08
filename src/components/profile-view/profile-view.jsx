import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ user, token, movies }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });
  const [error, setError] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchFavoriteMovies();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${user.Username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        username: response.data.Username,
        email: response.data.Email,
        birthday: response.data.Birthday.split("T")[0],
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Error fetching user data - " + err.response.data);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const response = await axios.get(
        `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${user.Username}/movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Favorite Movies Response:", response.data);
      setFavoriteMovies(response.data);
      console.log("Favorite Movies State:", response.data);
    } catch (err) {
      console.error("Error fetching favorite movies:", err);
      setError("Error fetching favorite movies - " + err.response.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        Username: formData.username,
        Password: formData.password, // Include the new password if the user provided it
        Email: formData.email,
        Birthday: formData.birthday,
      };

      const response = await axios.put(
        `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${encodeURIComponent(user.Username)}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", response.data);
      setError(null);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user data:", err);
      setError(
        "Error updating user data - " + (err.response?.data.errors || err.message)
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeregister = async () => {
    try {
      await axios.delete(
        `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${user.Username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Account deregistered successfully!");
      localStorage.removeItem("token"); // Remove the token
      localStorage.removeItem("user"); // Remove the user data
      navigate("/login"); // Redirect to login page after deregister
    } catch (err) {
      console.error("Error deregistering user:", err);
      setError("Error deregistering user - " + err.response.data);
    }
  };

  const handleFavoriteToggle = async (movieId) => {
    try {
      const isFavorite = favoriteMovies.includes(movieId);
      const url = `https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${user.Username}/movies/${movieId}`;

      if (isFavorite) {
        // Remove from favorites
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Add to favorites
        await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchFavoriteMovies(); // Fetch favorite movies again after toggle
    } catch (err) {
      console.error("Error toggling favorite movie:", err);
      setError("Error toggling favorite movie - " + err.response.data);
    }
  };

  // Filter the movies array to get only the favorite movies
  const favoriteMoviesList = movies.filter((movie) =>
    favoriteMovies.includes(movie.id)
  );

  console.log("Favorite Movies List:", favoriteMoviesList);

  return (
    <div>
      <h2>Profile Information</h2>
      {error && <p>{error}</p>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={handleChange}
            autoComplete="new-password"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
            autoComplete="bday"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
      <Button variant="danger" onClick={handleDeregister}>
        Deregister
      </Button>

      <h2>Favorite Movies</h2>
      <ListGroup>
        {favoriteMoviesList.length > 0 ? (
          favoriteMoviesList.map((movie) => {
            console.log("Rendering movie:", movie);
            return (
              <div className="mb-4" key={movie.id}>
                <MovieCard
                  movie={movie}
                  isFavorite={true}
                  onFavoriteToggle={() => handleFavoriteToggle(movie.id)}
                />
              </div>
            );
          })
        ) : (
          <p>No favorite movies to display</p>
        )}
      </ListGroup>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default ProfileView;
















