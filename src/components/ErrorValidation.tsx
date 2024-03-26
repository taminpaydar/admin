import { Container, TextField, Button, Snackbar, Alert, Typography } from "@mui/material";
import * as React from 'react';

export default function ErrorValidation({ err }: any) {
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
    const showerror = (x: any) => {

        var mytext = "";
        for (var index1 in x) {
            console.log(x);

            console.log('fuck eror');
            console.log(x[index1]);
            mytext += x[index1]['msg'].toString() + "</br> ";
        }
        return mytext;

    }
    var x = err.errors;
    return (
        <Snackbar dir="rtl" open={open} autoHideDuration={3000} onClose={handleClose}>
            {
               

                    <Alert severity="warning" sx={{ width: '100%' }}>
                        <Typography

                            dangerouslySetInnerHTML={{
                                __html:
                                    showerror(x).toString()
                            }}
                        ></Typography>
                    </Alert>

            }
        </Snackbar>
    )
}