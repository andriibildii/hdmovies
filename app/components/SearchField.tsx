'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchField() {
    const [querySearch, setQuerySearch] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuerySearch(e.target.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const searchParam = querySearch.trim();
        router.push(`/?search=${searchParam}`);
        setQuerySearch('');
    };

    return (
        <div className='my-2 flex items-center justify-center gap-4'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-wrap justify-center sm:flex-nowrap'
            >
                <input
                    type='text'
                    value={querySearch}
                    onChange={handleChange}
                    className='my-1 rounded-md bg-slate-200 py-2 px-4 text-sm font-medium text-slate-900'
                    placeholder='Search movie...'
                />
                <button
                    type='submit'
                    className='my-1 ml-1 rounded-lg bg-slate-600 py-2 px-4 text-sm text-white'
                >
                    Search
                </button>
            </form>
        </div>
    );
}
