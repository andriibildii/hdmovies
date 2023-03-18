import Link from 'next/link';
import Image from 'next/image';
import defaultImage from '/public/defaultImage.webp';

type PropsType = {
    id: string;
    title: string;
    year: string;
    poster: string;
};

export default function Movie({ id, title, year, poster }: PropsType) {
    return (
        <div className='flex flex-col items-center justify-start'>
            <Link href={`/${id}`}>
                <Image
                    src={poster === 'N/A' ? defaultImage : poster}
                    width={300}
                    height={445}
                    alt='poster'
                    priority={true}
                    className='drop-shadow-xl'
                />
            </Link>
            <div className='flex flex-col items-center justify-center pt-4'>
                <h3 className='text-lg font-bold text-slate-900'>{title}</h3>
                <p>Year {year}</p>
            </div>
        </div>
    );
}
