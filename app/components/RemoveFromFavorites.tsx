'use client';
import { removeMovie } from '../store/slices/FavoritesMoviesSlice';
import { useAppDispatch } from '../hooks';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaTrash } from 'react-icons/fa';

export default function RemoveFromFavorites({ id }: { id: string }) {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(removeMovie(id));
    };

    return (
        <div>
            <Tooltip title='Remove from Favorites' sx={{ color: 'red' }}>
                <IconButton onClick={handleClick}>
                    <FaTrash className='text-2xl text-red-500 hover:text-red-900 ' />
                </IconButton>
            </Tooltip>
        </div>
    );
}
