import movieModel from "../database/models/movie.js";

export const getMoviesService = async (page, perPage, title) => {
  const startIndex = (page - 1) * perPage;
  const totalMovies = await movieModel
    .countDocuments({ title: { $regex: title, $options: "i" } })
    .exec();

  console.log('Movies with "', title, '" in title: ', totalMovies);
  const result = {
    data: [],
    paging: {},
  };

  //Set pagination information
  result.paging.total = totalMovies;
  result.paging.page = page;
  result.paging.pages = Math.ceil(totalMovies / perPage);

  result.data = await movieModel
    .find({ title: { $regex: title, $options: "i" } }, null, {
      sort: { _id: -1 },
    })
    .skip(startIndex)
    .limit(perPage);
  console.log("Total:", result.data.length);
  return result;
};

export const getMovieService = async (id) => {
  const data = await movieModel.findById(id);
  return data;
};

export const updateMovieByIdService = async (id, body) => {
  await movieModel
    .findByIdAndUpdate(id, body, { new: "true", overwrite: "true" })
    .then(function (data) {
      console.log("New movie info: ", data);
    });
};

export const deleteMovieByIdService = async (id) => {
  let deletedCount;
  await movieModel
    .deleteOne({
      _id: id,
    })
    .then(function (data) {
      console.log(data);
      deletedCount = data.deletedCount;
    });
  return deletedCount;
};

export const addNewMovieService = async (body) => {
  const newMovie = await movieModel.create(body);
  console.log("newMovie: ", newMovie);
  return newMovie;
};
