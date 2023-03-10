import Image from "next/image";
import AddToFavorites from "../components/AddToFavorites";

type MovieInfoPropsType = {
	params: { movie: string };
};

export default async function MovieDetail({ params }: MovieInfoPropsType) {
	const { movie } = params;

	const data = await fetch(
		`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${movie}&plot=full`,
		{ next: { revalidate: 60 } }
	);
	const res = await data.json();

	function getRate(param: string) {
		switch (param) {
			case "G":
				return (
					<h2 className="bg-green-800 my-2 rounded-sm">
						{res.Rated} – General Audiences
					</h2>
				);
			case "PG":
				return (
					<h2 className="bg-orange-500">
						{res.Rated} – Parental Guidance Suggested
					</h2>
				);

			case "PG-13":
				return (
					<h2 className="bg-purple-800">
						{res.Rated} – Parents Strongly Cautioned
					</h2>
				);

			case "R":
				return <h2 className="bg-red-800">{res.Rated} – Restricted</h2>;

			case "NC-17":
				return <h2 className="bg-blue-800">{res.Rated} – Adults Only</h2>;

			default:
				return <h2 className="bg-gray-800">{res.Rated}</h2>;
		}
	}

	return (
		<div>
			<div className="flex justify-center items-start flex-wrap sm:flex-nowrap">
				<Image
					src={res.Poster}
					width={300}
					height={445}
					alt="poster"
					priority
				/>
				<AddToFavorites {...res} />

				<div className="mx-2">
					<h2 className="text-2xl font-bold">{res.Title}</h2>
					<h2 className="text-lg">Released: {res.Released}</h2>
					<h2 className="text-lg">Runtime: {res.Runtime}</h2>
					<h2 className="text-lg">Languages: {res.Language}</h2>
					{getRate(res.Rated)}
					{res.Ratings &&
						res.Ratings.map((rating: { Source: string; Value: string }) => (
							<div key={rating.Source} className="flex flex-row gap-2">
								<div>{rating.Source}:</div>
								<div>{rating.Value}</div>
							</div>
						))}
				</div>
			</div>
			<div className="py-4">
				<h3>About</h3>
				<span>{res.Plot}</span>
			</div>
		</div>
	);
}

const data = {
	Title: "The Lord of the Rings: The Fellowship of the Ring",
	Year: "2001",
	Rated: "PG-13",
	Released: "19 Dec 2001",
	Runtime: "178 min",
	Genre: "Action, Adventure, Drama",
	Director: "Peter Jackson",
	Writer: "J.R.R. Tolkien, Fran Walsh, Philippa Boyens",
	Actors: "Elijah Wood, Ian McKellen, Orlando Bloom",
	Plot: "An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign.",
	Language: "English, Sindarin",
	Country: "New Zealand, United States",
	Awards: "Won 4 Oscars. 123 wins & 127 nominations total",
	Poster:
		"https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
	Ratings: [
		{ Source: "Internet Movie Database", Value: "8.8/10" },
		{ Source: "Rotten Tomatoes", Value: "91%" },
		{ Source: "Metacritic", Value: "92/100" },
	],
	Metascore: "92",
	imdbRating: "8.8",
	imdbVotes: "1,893,698",
	imdbID: "tt0120737",
	Type: "movie",
	DVD: "06 Aug 2002",
	BoxOffice: "$316,115,420",
	Production: "N/A",
	Website: "N/A",
	Response: "True",
};
