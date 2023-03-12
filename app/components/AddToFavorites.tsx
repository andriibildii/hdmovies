'use client';
import { forwardRef, useState } from 'react';
import { fetchMovie } from '../store/slices/FavoritesMoviesSlice';
import { useAppDispatch } from '../hooks';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MdFavorite } from 'react-icons/md';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function AddToFavorites({ id }: { id: string }) {
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
        dispatch(fetchMovie(id));
        setOpen(true);
    };

    return (
        <div>
            <Tooltip title='Add to Favorites' sx={{ color: 'red' }}>
                <IconButton onClick={handleClick}>
                    <MdFavorite className='text-2xl text-red-600 hover:text-red-900 ' />
                </IconButton>
            </Tooltip>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity='success'
                    sx={{ width: '100%' }}
                >
                    The movie has been added to Favorites
                </Alert>
            </Snackbar>
        </div>
    );
}
