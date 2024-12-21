import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        favoriteMovie: (state, action) => {
            state.favorites.push(action.payload);
        },
        unfavoriteMovie: (state, action) => {
            state.favorites = state.favorites.filter(movie => movie.id !== action.payload.id);
        },
    },
});

export const { favoriteMovie, unfavoriteMovie } = movieSlice.actions;

export default movieSlice.reducer;
