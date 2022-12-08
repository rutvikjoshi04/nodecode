export const moviesQuery = `
    query($title: String!, $page: Int!, $perPage: Int!) {
        paginatedMovies(title: $title, page: $page, perPage: $perPage) {
            data {
            title
            countries
            _id
            }
        }
    }
`;

export const movieDetailQuery = `
    query($movieDetailId: String!) {
        movieDetail(id: $movieDetailId) {
            _id
            title
            genres
        }
    }
`;

export const getMovies = `
    mutation($title: String!, $page: Int!, $perPage: Int!) {
        getPaginatedMovies(title: $title, page: $page, perPage: $perPage) {
            data {
                _id
                title
                imdb {
                    rating
                    votes
                    text
                }
                type
                countries
                plot
                genres
            }
            prev
            next
        }
    }
`;

export const getMovieDetail = `
    mutation($movieId: String!) {
        getMovieDetail(id: $movieId) {
            plot
            title
            cast
            countries
            type
            imdb {
                rating
                votes
                text
            }
            genres
            runtime
            num_mflix_comments
            fullplot
            released
            directors
            rated
            lastupdated
            Year
            tomatoes {
                numReviews
                meter
            }
            awards {
                wins
                nominations
                text
            }
        }
    }
`;
