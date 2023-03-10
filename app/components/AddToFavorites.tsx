"use client";
import { MdFavorite } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, fetchMovie } from "../../slices/FavoritesMoviesSlice";
import type { RootState } from "../../store/store";
import { useState } from "react";

interface IFavoritesMovie {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: Array<{ Source: string; Value: string }>;
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

export default function AddToFavorites({ ...favoriteFilm }: IFavoritesMovie) {
	const dispatch = useDispatch();
	const favoriteMovie = favoriteFilm;

	const addToFavorites = () => {
		// console.log(favoriteMovie.imdbID);
		const id = favoriteMovie.imdbID;
		// console.log(id);

		dispatch(fetchMovie(id));
	};

	return (
		<div>
			<button onClick={addToFavorites}>
				<MdFavorite className="text-3xl text-red-500" />
			</button>
		</div>
	);
}
