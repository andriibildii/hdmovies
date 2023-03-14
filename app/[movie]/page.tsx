import Image from 'next/image';
import AddToFavorites from '../components/AddToFavorites';
import { IMovie } from '../types';
import type { Metadata } from 'next';

function getRate(param: string) {
    switch (param) {
        case 'G':
            return (
                <h2 className='my-2 rounded-sm bg-green-800 pl-2'>
                    {param} – General Audiences
                </h2>
            );
        case 'PG':
            return (
                <h2 className='rounded-sm bg-orange-500 pl-2'>
                    {param} – Parental Guidance Suggested
                </h2>
            );
        case 'PG-13':
            return (
                <h2 className='rounded-sm bg-purple-800 pl-2'>
                    {param} – Parents Strongly Cautioned
                </h2>
            );
        case 'R':
            return (
                <h2 className='rounded-sm bg-red-800 pl-2'>
                    {param} – Restricted
                </h2>
            );

        case 'NC-17':
            return (
                <h2 className='rounded-sm bg-blue-800 pl-2'>
                    {param} – Adults Only
                </h2>
            );
        default:
            return <h2 className='rounded-sm bg-gray-800 pl-2'>{param}</h2>;
    }
}

interface IMovieDetail {
    params: { movie: string };
}

async function getMovie(id: string) {
    const data = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`
    );
    return data.json();
}

export async function generateMetadata({
    params,
}: IMovieDetail): Promise<Metadata> {
    const movie: IMovie = await getMovie(params.movie);
    return { title: movie.Title, description: movie.Type };
}

export default async function MovieDetail({ params }: IMovieDetail) {
    const movie: IMovie = await getMovie(params.movie);

    const loaderProp = ({ src }: { src: string }) => {
        return src;
    };

    return (
        <div className='my-6 rounded-lg bg-slate-600 p-6'>
            <div className='flex flex-wrap items-start justify-center sm:flex-nowrap'>
                <Image
                    src={`${
                        movie.Poster === 'N/A'
                            ? 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGRmbWE2LXBkZmFtb3VzcGFpbnRpbmcwMDIwMDEtaW1hZ2UtOGFfMTAuanBn.jpg'
                            : movie.Poster
                    } `}
                    width={300}
                    height={445}
                    alt='poster'
                    priority={true}
                    className='my-2 drop-shadow-xl'
                    loader={loaderProp}
                />
                <AddToFavorites id={movie.imdbID} />
                <div className='text-md mx-2 '>
                    <h2 className='text-2xl font-bold'>{movie.Title}</h2>
                    <h2 className='pl-2'>
                        <span className='font-bold text-slate-900'>
                            Released:
                        </span>{' '}
                        {movie.Released}
                    </h2>
                    <h2 className='pl-2'>
                        <span className='font-bold text-slate-900'>
                            Runtime:
                        </span>{' '}
                        {movie.Runtime}
                    </h2>
                    <h2 className='pl-2'>
                        <span className='font-bold text-slate-900'>
                            Actors:
                        </span>{' '}
                        {movie.Actors}
                    </h2>
                    <h2 className='pl-2'>
                        <span className='font-bold text-slate-900'>
                            Languages:
                        </span>{' '}
                        {movie.Language}
                    </h2>
                    {getRate(movie.Rated)}
                    {movie.Ratings &&
                        movie.Ratings.map(
                            (rating: { Source: string; Value: string }) => (
                                <div
                                    key={rating.Source}
                                    className='flex flex-row gap-2'
                                >
                                    <div className='pl-2 font-bold text-slate-900'>
                                        {rating.Source}:
                                    </div>
                                    <div>{rating.Value}</div>
                                </div>
                            )
                        )}
                </div>
            </div>
            <div className='py-4'>
                <h3 className='font-bold text-slate-900'>About</h3>
                <span>{movie.Plot}</span>
            </div>
        </div>
    );
}
