"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchMovie = createAsyncThunk(
	"favorites/getFavorites",
	async (id) => {
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`
		);
		const data = await response.json();
		return data;
	}
);

const initialState = {
	favorites: [],
};

const FavoritesMoviesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		addToFavorites: (state, action) => {
			console.log("action", action);
			state.favorites.push(action.payload);
			console.log(state);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovie.fulfilled, (state, action) => {
			console.log(action.payload);
			state.favorites.push(action.payload);
			// console.log(state);
		});
	},
});

export const { addToFavorites } = FavoritesMoviesSlice.actions;
export default FavoritesMoviesSlice.reducer;
