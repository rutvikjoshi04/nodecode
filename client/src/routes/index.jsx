import { Switch, Route } from "react-router-dom";
import AddMovie from "../components/AddMovie";
import AllMoviesPage from "../pages/all-movies";
import MovieDetailPage from "../pages/movie-detail";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/movies">
        <AllMoviesPage />
      </Route>
      <Route path="/movie-detail">
        <MovieDetailPage />
      </Route>
      <Route path="/">
        <AddMovie />
      </Route>
    </Switch>
  );
}
