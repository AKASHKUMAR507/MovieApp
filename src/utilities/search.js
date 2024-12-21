/**
 * Searches for movies in the provided list based on the given query.
 * 
 * @param {Array} searchList - The list of movies to search through.
 * @param {String} query - The search query.
 * @returns {Array} - A new array of movies that match the search query.
 */
const SearchMovie = (searchList, query) => {
    // Clean the query by removing extra spaces and converting to lowercase
    const cleanedQuery = query.replace(/\s+/g, ' ').toLowerCase().toString();

    // Define the fields in the movie object that are searchable
    const searchableFields = ['title', 'language'];

    // Filter the search list based on the cleaned query
    const filter = searchList?.filter((item) => {
        // Check if any of the searchable fields match the query
        return searchableFields.some((field) => {
            // Get the value of the field from the item
            const fieldValue = item[field];

            // Convert the field value to a string and lowercase it for comparison
            const fieldValueAsString = fieldValue !== undefined ? fieldValue?.toString()?.toLowerCase() : '';

            // Check if the field value string includes the cleaned query
            return fieldValueAsString?.includes(cleanedQuery);
        });
    });

    // Return the filtered list or an empty array if no matches found
    return filter || [];
};

export default SearchMovie;