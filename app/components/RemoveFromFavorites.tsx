'use client';
import { FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../hooks';
import { removeMovie } from '../store/slices/FavoritesMoviesSlice';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, useState } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function RemoveFromFavorites({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
        dispatch(removeMovie(id));
    };

    return (
        <div>
            <Tooltip title='Remove from Favorites' sx={{ color: 'red' }}>
                <IconButton onClick={handleClick}>
                    <FaTrash className='text-3xl text-red-500 hover:text-red-900 ' />
                </IconButton>
            </Tooltip>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity='success'
                    sx={{ width: '100%' }}
                >
                    The movie has been removed from Favorites
                </Alert>
            </Snackbar>
        </div>
    );
}
