import { Container, TextField, Button, Snackbar, Alert, Typography } from "@mui/material";
import * as React from 'react';

export default function MessageBox({ Message }: any) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <Snackbar dir="rtl" open={open} autoHideDuration={3000} onClose={handleClose}>

            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>


                <Typography

                > Saved {Message}</Typography>

            </Alert>


        </Snackbar>
    )
}