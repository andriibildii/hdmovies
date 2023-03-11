import Movies from './Movies';
import PaginationLine from './components/PaginationLine';

interface IMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

async function getData(params = 'new', page = '1') {
    try {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${params}&page=${page}`,
            { cache: 'no-store' }
        );
        const moviesJson = await res.json();
        if (moviesJson.Search) {
            return moviesJson;
        }
        if (!moviesJson.Search) {
            throw new Error(moviesJson.Error);
        }
    } catch (error) {
        console.error('Catch some error', { error });
        return {
            error: `Catch some ${error}`,
        };
    }
}

export default async function Home({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {
    // Take search and page params
    const customSearch = searchParams?.search;
    const customPage = searchParams?.page;

    let currentPage: string | undefined = '1';
    if (customPage !== currentPage) {
        currentPage = customPage;
    }

    let resetPages: string = '0';
    if (customPage === undefined) {
        resetPages = '1';
    }

    // Movies request
    let moviesData = await getData(customSearch);
    if (customPage && customPage !== '1') {
        moviesData = await getData(customSearch, currentPage);
    }

    return (
        <main className='text-lg'>
            <div className='grid gap-10 grid-cols-fluid my-6 p-6 bg-slate-600 rounded-lg'>
                {moviesData.error ? (
                    <h3>{moviesData.error}</h3>
                ) : (
                    moviesData.Search?.map((movies: IMovie) => (
                        <Movies
                            id={movies.imdbID}
                            key={movies.imdbID}
                            title={movies.Title}
                            year={movies.Year}
                            poster={movies.Poster}
                        />
                    ))
                )}
            </div>
            <PaginationLine
                items={Number(moviesData.totalResults)}
                mainPage={Number(currentPage)}
                resetPage={Number(resetPages)}
            />
        </main>
    );
}
