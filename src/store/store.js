import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../feature/movieslice";

const store = configureStore({
    reducer: {
        movies: movieSlice
    }
})

export default store