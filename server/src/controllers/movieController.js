/****************************************************************************** ***
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. *
 * Group member Name: Rutvik Joshi Student IDs: N01475751 Date: 30-Nov-2022
 ****************************************************************************** ***/
import {
  getMoviesService,
  getMovieService,
  updateMovieByIdService,
  deleteMovieByIdService,
  addNewMovieService,
} from "../services/movieService.js";
import { validateFormUI } from "../utils/validation.js";

export const getFormUI = async (req, res) => {
  const query = req.query ?? {};
  let errors = [];
  let fields = null;
  let hasError = false;
  let prev = null;
  let next = null;
  let movies = [];
  const renderPage = "ui-form";

  // validate the query params. Query params are holding the value from the frontend form.
  if (query.submit) errors = validateFormUI(query);

  if (errors.length > 0) {
    fields = null;
    hasError = true;
  } else if (query.submit) {
    errors = null;
    fields = query;
    hasError = false;

    const { data, paging } = await getMoviesService(
      parseInt(query.page),
      parseInt(query.perPage),
      query.title
    );

    prev = query.page == 1 ? null : +query.page - 1;
    next = +query.page < (paging.pages ?? 1) ? +query.page + 1 : null;
    movies = data.map((movie) => ({
      title: movie.title,
      rating: movie.imdb?.rating ?? "Not Mentioned",
      votes: movie.imdb?.votes ?? "Not Mentioned",
      type: movie.type ?? "Not Mentioned",
      genres: movie.genres ?? "Not Mentioned",
      plot: movie.plot ?? "Not Mentioned",
      cast: movie.cast ?? "Not Mentioned",
    }));
  }

  res.render(renderPage, { errors, fields, hasError, prev, next, movies });
};

export const getMovies = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await getMoviesService(
          parseInt(req.query.page) || 1,
          parseInt(req.query.perPage) || 10,
          req.query.title || ""
        )
      );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMovie = async (req, res) => {
  try {
    res.status(200).json(await getMovieService(req.params.id));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMovieById = async (req, res) => {
  try {
    await updateMovieByIdService(req.params.id, req.body);
    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log("Error :( ", error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteMovieById = async (req, res) => {
  try {
    const deletedCount = await deleteMovieByIdService(req.params.id);
    console.log("deletedCount ", deletedCount);
    if (deletedCount == 0) {
      res.status(404).json({ message: "ID does not exists" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addNewMovie = async (req, res) => {
  try {
    res.status(201).json(await addNewMovieService(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
