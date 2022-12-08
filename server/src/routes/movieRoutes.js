import express from "express";
import {
  getMovies,
  getMovie,
  updateMovieById,
  deleteMovieById,
  addNewMovie,
  getFormUI,

} from "../controllers/movieController.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/", authenticateToken, addNewMovie);
router.get("/ui-form",getFormUI);
router.get("/", getMovies);

router.get("/:id", getMovie);

router.put("/:id", authenticateToken, updateMovieById);

router.delete("/:id", authenticateToken, deleteMovieById);

function authenticateToken(req, res, next) {
  console.log("HELLO AUTHENTICATION")
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      res.sendStatus(403);
      res.end();
    } else {
      req.user = user;
      next();
    }
  });
}

export default router;

/*
import express from "express";
import {
  getMovies,
  getMovie,
  updateMovieById,
  deleteMovieById,
  addNewMovie,
  getFormUI,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/ui-form", getFormUI);

router.post("/", addNewMovie);

router.get("/", getMovies);

router.get("/:id", getMovie);

router.put("/:id", updateMovieById);

router.delete("/:id", deleteMovieById);

export default router;
*/