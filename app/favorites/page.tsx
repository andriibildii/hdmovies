'use client';
import Image from 'next/image';
import Link from 'next/link';
import RemoveFromFavorites from '../components/RemoveFromFavorites';
import { useAppSelector } from '../hooks';

export default function FavoritesFilms() {
    const favoriteMovies = useAppSelector((state) => state.favorites.favorites);

    return (
        <div>
            {favoriteMovies?.map((movie) => (
                <div key={movie.imdbID}>
                    <div className='flex justify-center items-start flex-wrap sm:flex-nowrap'>
                        <Link href={`/${movie.imdbID}`}>
                            <Image
                                src={movie.Poster}
                                width={300}
                                height={445}
                                alt='poster'
                            />
                        </Link>
                        <RemoveFromFavorites id={movie.imdbID} />
                        <div className='mx-2'>
                            <h2 className='text-2xl font-bold'>
                                {movie.Title}
                            </h2>
                            <h2 className='text-lg'>
                                Released: {movie.Released}
                            </h2>
                            <h2 className='text-lg'>
                                Runtime: {movie.Runtime}
                            </h2>
                            <h2 className='text-lg'>
                                Languages: {movie.Language}
                            </h2>
                        </div>
                    </div>
                    <div className='py-4'>
                        <h3>About</h3>
                        <span>{movie.Plot}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
