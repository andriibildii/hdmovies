export function getRate(param: string) {
    switch (param) {
        case 'G':
            return (
                <h2 className='bg-green-800 my-2 rounded-sm'>
                    {param} – General Audiences
                </h2>
            );
        case 'PG':
            return (
                <h2 className='bg-orange-500'>
                    {param} – Parental Guidance Suggested
                </h2>
            );
        case 'PG-13':
            return (
                <h2 className='bg-purple-800'>
                    {param} – Parents Strongly Cautioned
                </h2>
            );
        case 'R':
            return <h2 className='bg-red-800'>{param} – Restricted</h2>;

        case 'NC-17':
            return <h2 className='bg-blue-800'>{param} – Adults Only</h2>;
        default:
            return <h2 className='bg-gray-800'>{param}</h2>;
    }
}
