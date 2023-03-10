import Movies from "./Movies";
import PaginationContainer from "./components/PaginationContainer";

interface IMovie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

async function getData(params = "new", page = 1) {
	// console.log("Page from function", page);
	const queryPage = page || 1;
	try {
		const res = await fetch(
			`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${params}&page=${page}`
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
	const querySearch = searchParams?.search;
	// const queryPage = searchParams?.page;

	// console.log("queryPage", queryPage);

	let moviesData = await getData(querySearch);

	// let moviesData;

	// if (!queryPage) {
	// 	moviesData = await getData(querySearch);
	// }

	// if (queryPage) {
	// 	const page = Number(queryPage);
	// 	moviesData = await getData(querySearch, page);
	// }
	// console.log(moviesData);
	// console.log(moviesData.totalResults);

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
			7
			{/* <PaginationContainer page={queryPage} querySearch={querySearch} /> */}
		</main>
	);
}
