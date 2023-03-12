'use client';
import Link from 'next/link';
import { MdFavorite } from 'react-icons/md';
import { useAppSelector } from '../hooks';

export default function NavBar() {
    const favoriteMovies = useAppSelector((state) => state.favorites.favorites);
    return (
        <nav className='flex items-center justify-between py-6'>
            <Link href={`/`} className='text-lg font-medium'>
                HD Movies
            </Link>
            <Link href={'/favorites'}>
                {favoriteMovies.length >= 1 ? (
                    <>
                        <button className='text-white-500 relative left-4 flex items-center justify-center gap-2 py-2 text-sm'>
                            Favorites
                            <MdFavorite className='text-3xl text-red-600' />
                            <p className='relative right-5 top-1 h-auto w-4 rounded-full bg-slate-200 text-center text-xs text-slate-900'>
                                {favoriteMovies.length}
                            </p>
                        </button>
                    </>
                ) : (
                    <button className='text-white-500 relative right-2 flex items-center justify-center gap-2 py-2 text-sm'>
                        Favorites
                        <MdFavorite className='text-3xl' />
                    </button>
                )}
            </Link>
        </nav>
    );
}
