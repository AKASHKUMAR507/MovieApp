import { MoviesListController } from "../controllers/movies";

const Movies = async () => {
    try {
        const response = await MoviesListController();
        return response
    } catch (error) {
        throw error
    }
}

export { Movies }