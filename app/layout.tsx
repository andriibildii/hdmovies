import './globals.css';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import SearchField from './components/SearchField';
import { Providers } from './store/provider';
import { MdFavorite } from 'react-icons/md';
import NavBar from './components/NavBar';

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat',
});

export const metadata = {
    title: 'HD Movies',
    description:
        'Movie search application using Next.js 13 and the OMDB API by Andrii Bildii',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className={`${montserrat.variable}`}>
            <body className='px-6 mx-0 md:max-w-5xl md:mx-auto bg-slate-900 text-cyan-50 font-montserrat'>
                <Providers>
                    <NavBar />
                    <SearchField />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
