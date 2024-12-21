/**
 * Filters movies based on the specified genres.
 * 
 * @param {Array} movies - The array of movies to filter.
 * @param {Array} genres - The array of genres to filter by.
 * @returns {Array} - A new array of movies that match at least one of the specified genres.
 */

const filterMoviesByGenre = (movies, genres) => {
    return movies?.filter(movie =>
        movie.genre.some(genre => genres.includes(genre))
    );
};

export default filterMoviesByGenre