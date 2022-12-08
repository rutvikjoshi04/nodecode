import { useState } from "react";
import { useMutation } from "urql";
import { getMovieDetail } from "../graphql/query";

export default function MovieDetailPage() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_, func] = useMutation(getMovieDetail);
  const [movie, setMovie] = useState();

  const handleInputFields = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    setErrors([])
    setIsLoading(true);

    const errors = [];
    if (!form.id) errors.push("Movie ID is a required field");

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const result = await func({ movieId: form.id });
      console.log("result: ", result);
      setMovie(result.data.getMovieDetail);
      setIsLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setIsLoading(false);
    }
  };

  const refillForm = () => {
    setForm({});
    setMovie(null);
  };

  const getForm = () => {
    if (movie) return null;

    return (
      <div className="movies_form">
        <div className="form-group">
          <label>Movie ID</label>
          <input
            type="text"
            className="form-control"
            id="usr"
            name="id"
            value={form.id}
            onChange={handleInputFields}
          />
        </div>

        <button className="btn btn-primary" onClick={handleClick}>
          Save
        </button>
      </div>
    );
  };

  const getMovieInfo = () => {
    if (isLoading) return <p>Loading ..</p>;

    if (!movie) return null;

    return (
      <>
        <DisplayMovie movie={movie} />
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-3 " onClick={refillForm}>
            Refill the form
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="container my-4">
      <DisplayErrors errors={errors} />

      {getForm()}

      {getMovieInfo()}
    </div>
  );
}

function DisplayErrors({ errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="alert alert-danger">
      {errors.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </div>
  );
}

function DisplayMovie({ movie }) {
  return (
    <div className="card">
      <div className="card-header">{movie.title}</div>
      <div className="card-body">
        <p>Plot: {movie.plot ?? "Not Mentioned"}</p>
        <p>Title: {movie.title ?? "Not Mentioned"}</p>
        <p>Cast: {movie.cast && movie.cast.length > 0 ? movie.cast.toString() : "Not Mentioned"}</p>
        <p>
          Countries:{" "}
          {movie.countries && movie.countries > 0 ? movie.countries.toString() : "Not Mentioned"}
        </p>
        <p>Type: {movie.type ?? "Not Mentioned"}</p>
        <p>Rating: {movie.imdb?.rating ?? "Not Mentioned"}</p>
        <p>Votes: {movie.imdb?.votes ?? "Not Mentioned"}</p>
        <p>ImdbText: {movie.imdb?.title ?? "Not Mentioned"}</p>
        <p>Genres: {movie.genres && movie.genres.length > 0 ? movie.genres.toString() : "Not Mentioned"}</p>
        <p>Num Flix Comments: {movie.num_mflix_comments ?? "Not Mentioned"}</p>
        <p>Fullplot: {movie.fullplot ?? "Not Mentioned"}</p>
        <p>Released: {movie.released ? new Date(movie.released).toLocaleDateString() : "Not Mentioned"}</p>
        <p>Directors: {movie.directors && movie.directors.length > 0 ? movie.directors.toString() : "Not Mentioned"}</p>
        <p>Rated: {movie.rated ?? "Not Mentioned"}</p>
        <p>Number of Reviews: {movie.tomatoes?.numReviews ?? "Not Mentioned"}</p>
        <p>Meter: {movie.tomatoes?.meter ?? "Not Mentioned"}</p>
        <p>Award Wins: {movie.awards?.wins ?? "Not Mentioned"}</p>
        <p>Award Nominations: {movie.awards?.nominations ?? "Not Mentioned"}</p>
        <p>Award Text: {movie.awards?.awardText ?? "Not Mentioned"}</p>
      </div>
    </div>
  );
}
