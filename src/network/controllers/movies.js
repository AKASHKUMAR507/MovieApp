import { Request } from "../network";

const MoviesListController = async () => {
    try {
        const response = await Request('GET', 'movies');
        return response.data;
    } catch (error) {
        throw error
    }
}


export { MoviesListController }