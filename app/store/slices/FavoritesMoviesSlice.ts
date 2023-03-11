'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../types';

export const fetchMovie = createAsyncThunk(
    'favorites/getFavorites',
    async (id: string) => {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();
        return data;
    }
);

interface IInitialState {
    favorites: Array<IMovie>;
}

const initialState: IInitialState = {
    favorites: [],
};

const FavoritesMoviesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        removeMovie(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(
                (movie) => movie.imdbID !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchMovie.fulfilled,
            (state, action: PayloadAction<IMovie>) => {
                const movie = state.favorites.find(
                    (movie) => movie.imdbID === action.payload.imdbID
                );
                if (!movie) {
                    state.favorites.push(action.payload);
                } else {
                    console.error('Movie has already added to the Favorites');
                }
            }
        );
    },
});

export const { removeMovie } = FavoritesMoviesSlice.actions;
export default FavoritesMoviesSlice.reducer;
