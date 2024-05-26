import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView= () => {
  const storedUser= JSON.parse(localStorage.getItem("user"));
  const storedToken= localStorage.getItem("token");

  const [user, setUser]= useState(storedUser? storedUser: null);
  const [token, setToken]= useState(storedToken? storedToken : null);

  const [movies, setMovies]= useState([]);

  const [selectedMovie, setSelectedMovie]= useState(null);

  useEffect(()=> {
    if (!token) {
      return;
    }

    fetch("https://my-movieflix-e95b2c0e9dda.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("Movies: ", movies);
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
  }, [token]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
      {user && ( //{condition && <Component />}, renders <Component /> if condition is true
      <Row>
        <Col>
          <Button 
            variant="primary" 
            type="submit"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
    )}
    </Container>
  );
};