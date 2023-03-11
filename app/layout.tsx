import './globals.css';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import SearchField from './components/SearchField';
import { Providers } from './store/provider';
import { MdFavorite } from 'react-icons/md';
import PaginationContainer from './components/PaginationContainer';

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat',
});

export const metadata = {
    title: 'HD Movies',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className={`${montserrat.variable}`}>
            <body className='px-6 mx-0 md:max-w-5xl md:mx-auto bg-slate-900 text-cyan-50 font-montserrat'>
                <nav className='py-6 flex items-center justify-between'>
                    <Link href={'/'} className='text-lg font-medium'>
                        HD Movies
                    </Link>
                    <Link href={'/favorites'}>
                        <button className='text-white-500 flex justify-center items-center gap-2 py-2 text-sm'>
                            Favorites
                            <MdFavorite className='text-3xl' />
                        </button>
                    </Link>
                </nav>
                <SearchField />
                <Providers>{children}</Providers>
                {/* <PaginationContainer /> */}
            </body>
        </html>
    );
}
