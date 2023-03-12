'use client';
import Link from 'next/link';
import { MdFavorite } from 'react-icons/md';
import { useAppSelector } from '../hooks';

export default function NavBar() {
    const favoriteMovies = useAppSelector((state) => state.favorites.favorites);
    return (
        <nav className='py-6 flex items-center justify-between'>
            <Link href={`/`} className='text-lg font-medium'>
                HD Movies
            </Link>
            <Link href={'/favorites'}>
                <button className='text-white-500 flex justify-center items-center gap-2 py-2 text-sm'>
                    Favorites
                    {favoriteMovies.length >= 1 ? (
                        <>
                            <MdFavorite className='text-3xl text-red-600' />
                            <p className='bg-slate-300 rounded-full w-4 h-auto text-slate-900 text-xs relative right-5 top-1'>
                                {favoriteMovies.length}
                            </p>
                        </>
                    ) : (
                        <MdFavorite className='text-3xl' />
                    )}
                </button>
            </Link>
        </nav>
    );
}
