import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { getMovieService, getMoviesService } from "../services/movieService.js";

const typeDefs = `
    type Rating {
      rating: Float
      votes: Float
      text: String
    }

    type Award {
      wins: Int
      nominations: Int
      text: String
    }

    type Tomatoe {
      numReviews: Int
      meter: Int
    }

    type Movie {
      _id: String
      plot: String
      title: String
      cast: [String]
      countries: [String]
      type: String
      imdb: Rating
      genres: [String]
      runtime: Int
      num_mflix_comments: Int
      fullplot: Int
      released: String
      directors: [String]
      rated: String
      lastupdated: String
      Year: Int
      tomatoes: Tomatoe
      awards: Award
    }

    type MovieList {
      data: [Movie]
      prev: Int
      next: Int
    }

    type Query {
      paginatedMovies(title: String!, page: Int!, perPage: Int!): MovieList
      movieDetail(id: String!): Movie
    }

    type Mutation {
        getPaginatedMovies(title: String!, page: Int!, perPage: Int!): MovieList
        getMovieDetail(id: String!): Movie
    }
`;

const resolvers = {
  Query: {
    paginatedMovies: async (_, args) => {
      console.log("args: ", args);
      const { title, page, perPage } = args;
      const { data, paging } = await getMoviesService(page, perPage, title);

      const prev = page == 1 ? null : page - 1;
      const next = page < (paging.pages ?? 1) ? page + 1 : null;

      return { data: data, prev, next };
    },
    movieDetail: async (_, args) => {
      const { id } = args;
      const movie = await getMovieService(id);

      return {
        plot: movie.plot,
        title: movie.title,
        cast: movie.cast,
        countries: movie.countries,
        type: movie.type,
        imdb: movie.imdb ?? {},
        genres: movie.genres,
        runtime: movie.runtime,
        num_mflix_comments: movie.num_mflix_comments,
        fullplot: movie.fullplot,
        released: movie.released,
        directors: movie.directors,
        rated: movie.rated,
        lastupdated: movie.lastupdated,
        Year: movie.Year,
        tomatoes: movie.tomatoes ?? {},
        awards: movie.awards ?? {},
      };
    },
  },
  Mutation: {
    getPaginatedMovies: async (_, args) => {
      console.log("args: ", args);
      const { title, page, perPage } = args;
      const { data, paging } = await getMoviesService(page, perPage, title);

      const prev = page == 1 ? null : page - 1;
      const next = page < (paging.pages ?? 1) ? page + 1 : null;

      return { data: data, prev, next };
    },
    getMovieDetail: async (_, args) => {
      console.log("args: ", args);
      const { id } = args;
      const movie = await getMovieService(id);
      console.log("movie: ", movie);

      return {
        plot: movie.plot,
        title: movie.title,
        cast: movie.cast,
        countries: movie.countries,
        type: movie.type,
        imdb: movie.imdb ?? {},
        genres: movie.genres,
        runtime: movie.runtime,
        num_mflix_comments: movie.num_mflix_comments,
        fullplot: movie.fullplot,
        released: movie.released,
        directors: movie.directors,
        rated: movie.rated,
        lastupdated: movie.lastupdated,
        Year: movie.Year,
        tomatoes: movie.tomatoes ?? {},
        awards: movie.awards ?? {},
      };
    },
  },
};

const apolloServer = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
});

export { apolloServer, expressMiddleware };
