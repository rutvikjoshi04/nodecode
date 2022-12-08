import { useState } from "react";
import { useMutation } from "urql";
import { getMovies } from "../graphql/query";

export default function AllMoviesPage() {
  const [res, func] = useMutation(getMovies);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();

  const handleInputFields = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    await submitRequest();
  };

  const handleRefillForm = () => {
    setForm({});
    setMovies([]);
  };

  const handleNextOrPrev = async (isNext) => {
    const _prev = prev === 0 ? 1 : prev;
    const pageNo = isNext ? next : _prev;
    setForm((prev) => ({ ...prev, page: pageNo }));
    await submitRequest();
  };

  const submitRequest = async () => {
    setIsLoading(true);

    const { title, page, perPage } = form;

    const errors = [];
    if (!title) errors.push("Title is a required field");
    if (!page) errors.push("Page is a required field");
    if (!perPage) errors.push("PerPage is a required field");

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    console.log("clicked: ", form);
    try {
      const result = await func({ title: form.title, page: +form.page, perPage: +form.perPage });
      console.log("result: ", result);
      setMovies(result.data.getPaginatedMovies.data);
      setPrev(result.data.getPaginatedMovies.prev);
      setNext(result.data.getPaginatedMovies.next);
      console.log("res: ", res);
      setIsLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setIsLoading(false);
    }
  };

  const getForm = () => {
    if (movies.length > 0) return null;

    return (
      <div className="movies_form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            id="usr"
            name="title"
            value={form.title}
            onChange={handleInputFields}
          />
        </div>
        <div className="form-group">
          <label>Page</label>
          <input
            type="number"
            className="form-control"
            id="usr"
            name="page"
            value={form.page}
            onChange={handleInputFields}
          />
        </div>
        <div className="form-group">
          <label>PerPage</label>
          <input
            type="number"
            className="form-control"
            id="usr"
            name="perPage"
            value={form.perPage}
            onChange={handleInputFields}
          />
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Save
        </button>
      </div>
    );
  };

  const getMoviesCard = () => {
    if (isLoading) return <p>Loading ...</p>;

    if (movies.length === 0) return null;

    return (
      <div>
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 my-2">
              <SingleMovieCard movie={movie} />
            </div>
          ))}
        </div>

        <div className="mt-3">
          {prev && (
            <button className="btn btn-primary float-left" onClick={() => handleNextOrPrev(false)}>
              Previous
            </button>
          )}
          {next && (
            <button className="btn btn-primary float-right" onClick={() => handleNextOrPrev(true)}>
              Next
            </button>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-5" onClick={handleRefillForm}>
            Refill the form again
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container my-4">
      <DisplayErrors errors={errors} />

      {getForm()}

      {getMoviesCard()}
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

function SingleMovieCard({ movie }) {
  return (
    <div className="card" key={movie._id}>
      <div className="card-header">{movie.title}</div>
      <div className="card-body">
        <p>Plot: {movie.plot ?? "Not Mentioned"}</p>
        <p>Rating: {movie.imdb?.plot ?? "Not Mentioned"}</p>
        <p>Votes: {movie.imdb?.votes ?? "Not Mentioned"}</p>
        <p>Type: {movie.type ?? "Not Mentioned"}</p>
        <p>
          Genre:{" "}
          {movie.genres && movie.genres.length > 0 ? movie.genres.toString() : "Not Mentioned"}
        </p>
      </div>
    </div>
  );
}
