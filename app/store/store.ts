"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/FavoritesMoviesSlice";

export const store = configureStore({
	reducer: {
		favorites: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
