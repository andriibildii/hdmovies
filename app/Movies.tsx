import Link from 'next/link';
import Image from 'next/image';

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
                    src={`${
                        poster === 'N/A'
                            ? 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3JtNTI0LWlsbHVzLTAxOGIteC5qcGc.jpg'
                            : poster
                    } `}
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
