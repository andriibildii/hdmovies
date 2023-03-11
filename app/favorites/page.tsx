'use client';
import Image from 'next/image';
import Link from 'next/link';
import RemoveFromFavorites from '../components/RemoveFromFavorites';
import { useAppSelector } from '../hooks';

export default function FavoritesFilms() {
    const favoriteMovies = useAppSelector((state) => state.favorites.favorites);

    return (
        <div className='grid gap-1 grid-cols-fluid my-6 p-6 bg-slate-600 rounded-lg'>
            {favoriteMovies?.map((movie) => (
                <div
                    key={movie.imdbID}
                    className='flex justify-start items-center flex-wrap sm:flex-nowrap flex-col mb-2'
                >
                    <Link href={`/${movie.imdbID}`} className='drop-shadow-xl '>
                        <Image
                            src={`${
                                movie.Poster === 'N/A'
                                    ? 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3JtNTI0LWlsbHVzLTAxOGIteC5qcGc.jpg'
                                    : movie.Poster
                            } `}
                            width={200}
                            height={220}
                            alt='poster'
                        />
                    </Link>
                    <div className='flex flex-col justify-center items-center pt-4'>
                        <h4 className='text-md text-slate-900 font-bold'>
                            {movie.Title}
                        </h4>
                        <RemoveFromFavorites id={movie.imdbID} />
                    </div>
                </div>
            ))}
        </div>
    );
}
