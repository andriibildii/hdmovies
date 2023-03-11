// import { getRate } from '../../utils/getRate';
import Image from 'next/image';
import AddToFavorites from '../components/AddToFavorites';
import { IMovie } from '../types';

function getRate(param: string) {
    switch (param) {
        case 'G':
            return (
                <h2 className='bg-green-800 my-2 rounded-sm pl-2'>
                    {param} – General Audiences
                </h2>
            );
        case 'PG':
            return (
                <h2 className='bg-orange-500 pl-2 rounded-sm'>
                    {param} – Parental Guidance Suggested
                </h2>
            );
        case 'PG-13':
            return (
                <h2 className='bg-purple-800 rounded-sm pl-2'>
                    {param} – Parents Strongly Cautioned
                </h2>
            );
        case 'R':
            return (
                <h2 className='bg-red-800 rounded-sm pl-2'>
                    {param} – Restricted
                </h2>
            );

        case 'NC-17':
            return (
                <h2 className='bg-blue-800 rounded-sm pl-2'>
                    {param} – Adults Only
                </h2>
            );
        default:
            return <h2 className='bg-gray-800 rounded-sm pl-2'>{param}</h2>;
    }
}

interface IMovieDetail {
    params: { movie: string };
}

export default async function MovieDetail({ params }: IMovieDetail) {
    const id = params.movie;

    const data = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`
    );
    const movie: IMovie = await data.json();

    return (
        <div className='my-6 p-6 bg-slate-600 rounded-lg'>
            <div className='flex justify-center items-start flex-wrap sm:flex-nowrap'>
                <Image
                    src={`${
                        movie.Poster === 'N/A'
                            ? 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3JtNTI0LWlsbHVzLTAxOGIteC5qcGc.jpg'
                            : movie.Poster
                    } `}
                    width={300}
                    height={445}
                    alt='poster'
                    priority={true}
                    className='my-2 drop-shadow-xl'
                />
                <AddToFavorites id={movie.imdbID} />
                <div className='mx-2 text-md '>
                    <h2 className='text-2xl font-bold'>{movie.Title}</h2>
                    <h2 className='pl-2'>
                        <span className='text-slate-900 font-bold'>
                            Released:
                        </span>{' '}
                        {movie.Released}
                    </h2>
                    <h2 className='pl-2'>
                        <span className='text-slate-900 font-bold'>
                            Runtime:
                        </span>{' '}
                        {movie.Runtime}
                    </h2>
                    <h2 className='pl-2'>
                        <span className='text-slate-900 font-bold'>
                            Actors:
                        </span>{' '}
                        {movie.Actors}
                    </h2>
                    <h2 className='pl-2'>
                        <span className='text-slate-900 font-bold'>
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
                                    <div className='text-slate-900 font-bold pl-2'>
                                        {rating.Source}:
                                    </div>
                                    <div>{rating.Value}</div>
                                </div>
                            )
                        )}
                </div>
            </div>
            <div className='py-4'>
                <h3 className='text-slate-900 font-bold'>About</h3>
                <span>{movie.Plot}</span>
            </div>
        </div>
    );
}
