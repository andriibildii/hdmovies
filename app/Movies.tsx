import Link from "next/link";
import Image from "next/image";

type PropsType = {
	id: string;
	title: string;
	year: string;
	poster: string;
};

export default function Movie({ id, title, year, poster }: PropsType) {
	return (
		<div className="flex justify-start flex-col items-center">
			<Link href={`/${id}`}>
				<Image
					src={poster}
					width={300}
					height={445}
					alt="poster"
					priority={true}
				/>
			</Link>
			<div className="flex flex-col justify-center items-center pt-4">
				<h3 className="text-lg text-slate-900 font-bold">{title}</h3>
				<p>Year {year}</p>
			</div>
		</div>
	);
}
