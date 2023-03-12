'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

interface IPaginationProps {
    items: number;
    customPage: number;
    customSearch: string | undefined;
}

export default function PaginationLine({
    items,
    customPage,
    customSearch,
}: IPaginationProps) {
    const [currentPage, setCurrentPage] = useState<number>();
    const [pageSize] = useState(10);
    const router = useRouter();
    const [search, setSearch] = useState<string>();

    useEffect(() => {
        if (
            customPage === null ||
            customPage === undefined ||
            customPage === 1
        ) {
            setCurrentPage(1);
        }
        if (customSearch === undefined) {
            setSearch('new');
        }
    }, [customPage, customSearch]);

    useEffect(() => {
        if (customSearch !== search && customSearch) {
            setSearch(customSearch);
        }
    }, [customSearch]);

    useEffect(() => {
        if (currentPage && search)
            router.push(`/?search=${search}&page=${currentPage}`);
    }, [currentPage]);

    const pagesCount = Math.ceil(items / pageSize);
    if (pagesCount === 1) return null;

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='my-6 flex flex-wrap items-center justify-center rounded-lg bg-slate-600 p-4 md:flex-nowrap md:justify-between'>
            <p className='text-md text-white-500 my-4 pl-6 font-montserrat'>
                Showing{' '}
                <span className='text-2xl font-bold text-slate-900'>
                    {currentPage || 1}
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
