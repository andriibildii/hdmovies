'use client';
import Image from 'next/image';
import Link from 'next/link';
import RemoveFromFavorites from '../components/RemoveFromFavorites';
import { useAppSelector } from '../hooks';

export default function FavoritesFilms() {
    const favoriteMovies = useAppSelector((state) => state.favorites.favorites);

    return (
        <div className='my-6 grid grid-cols-fluid gap-1 rounded-lg bg-slate-600 p-6'>
            {favoriteMovies?.map((movie) => (
                <div
                    key={movie.imdbID}
                    className='mb-2 flex flex-col flex-wrap items-center justify-start sm:flex-nowrap'
                >
                    <Link href={`/${movie.imdbID}`} className='drop-shadow-xl '>
                        <Image
                            src={`${
                                movie.Poster === 'N/A'
                                    ? 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGRmbWE2LXBkZmFtb3VzcGFpbnRpbmcwMDIwMDEtaW1hZ2UtOF84LmpwZw.jpg'
                                    : movie.Poster
                            } `}
                            width={200}
                            height={220}
                            alt='poster'
                        />
                    </Link>
                    <div className='flex flex-col items-center justify-center pt-4'>
                        <h4 className='text-md font-bold text-slate-900'>
                            {movie.Title}
                        </h4>
                        <RemoveFromFavorites id={movie.imdbID} />
                    </div>
                </div>
            ))}
        </div>
    );
}
