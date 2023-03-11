'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

interface IPaginationProps {
    items: number;
    mainPage: number;
    resetPage: number;
}

export default function PaginationLine({
    items,
    mainPage,
    resetPage,
}: IPaginationProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState(10);
    const router = useRouter();

    useEffect(() => {
        if (currentPage) router.push(`/?page=${currentPage}`);
    }, [currentPage]);

    useEffect(() => {
        if (currentPage && currentPage !== 1) {
            console.log('resetPage from useEffect', resetPage);
            setCurrentPage(resetPage);
        }
    }, [resetPage]);

    const pagesCount = Math.ceil(items / pageSize);
    if (pagesCount === 1) return null;

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='flex justify-between items-center px-2 bg-slate-600 rounded-lg my-6 p-2 '>
            <p className='text-md text-white-500 my-4 pl-6 font-montserrat'>
                Showing{' '}
                <span className='text-2xl text-slate-900 font-bold'>
                    {currentPage}
                </span>{' '}
                of <span className='font-medium'>{pagesCount}</span> results
            </p>
            <Pagination
                count={pagesCount}
                onChange={handleChange}
                color='primary'
                variant='outlined'
            />
        </div>
    );
}
