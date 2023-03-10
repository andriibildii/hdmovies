import Movies from "./Movies";

interface IMovie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

async function getData(params = "new") {
	try {
		const res = await fetch(
			`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${params}`
		);
		const moviesJson = await res.json();

		if (moviesJson.Search) {
			return moviesJson;
		}

		if (!moviesJson.Search) {
			throw new Error(moviesJson.Error);
		}
	} catch (error) {
		console.error("Catch some error", { error });
		return {
			error: `Catch some ${error}`,
		};
	}
}

export default async function Home({
	searchParams,
}: {
	searchParams?: { [key: string]: string };
}) {
	const querySearch = searchParams?.search || "new";

	const moviesData = await getData(querySearch);

	return (
		<main className="text-lg">
			<div className="grid gap-10 grid-cols-fluid my-6 p-6 bg-slate-600 rounded-lg">
				{moviesData.error ? (
					<h3>{moviesData.error}</h3>
				) : (
					moviesData.Search?.map((movies: IMovie) => (
						<Movies
							id={movies.imdbID}
							key={movies.imdbID}
							title={movies.Title}
							year={movies.Year}
							poster={movies.Poster}
						/>
					))
				)}
			</div>
		</main>
	);
}
