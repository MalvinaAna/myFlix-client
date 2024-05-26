import "./movie-view.scss";

export const MovieView= ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.bio}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{movie.birth}</span>
      </div>
      <div>
        <span>Death: </span>
        <span>{movie.death}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured}</span>
      </div>
      <button 
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer"}}
      >
        Back
      </button>
    </div>
  );
};
