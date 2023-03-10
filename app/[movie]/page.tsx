import { getRate } from "../../utils/getRate";
import Image from "next/image";
import AddToFavorites from "../components/AddToFavorites";

interface IMovieDetail {
	params: { movie: string };
}

export default async function MovieDetail({ params }: IMovieDetail) {
	const id = params.movie;

	const data = await fetch(
		`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`,
		{ next: { revalidate: 60 } }
	);
	const movie = await data.json();

	return (
		<div>
			<div className="flex justify-center items-start flex-wrap sm:flex-nowrap">
				<Image
					src={movie.Poster}
					width={300}
					height={445}
					alt="poster"
					placeholder="blur"
					blurDataURL={movie.Poster}
				/>
				<AddToFavorites id={movie.imdbID} />
				<div className="mx-2">
					<h2 className="text-2xl font-bold">{movie.Title}</h2>
					<h2 className="text-lg">Released: {movie.Released}</h2>
					<h2 className="text-lg">Runtime: {movie.Runtime}</h2>
					<h2 className="text-lg">Languages: {movie.Language}</h2>
					{getRate(movie.Rated)}
					{movie.Ratings &&
						movie.Ratings.map((rating: { Source: string; Value: string }) => (
							<div key={rating.Source} className="flex flex-row gap-2">
								<div>{rating.Source}:</div>
								<div>{rating.Value}</div>
							</div>
						))}
				</div>
			</div>
			<div className="py-4">
				<h3>About</h3>
				<span>{movie.Plot}</span>
			</div>
		</div>
	);
}
