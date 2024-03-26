import { Container, TextField, Button, Snackbar, Alert, Typography } from "@mui/material";
import * as React from 'react';

export default function ErrorDB({ err }: any) {
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
            console.log('fuck eror');
            console.log(x[index1].message);
            mytext += x[index1].message.toString() + "</br> ";
        }
        return mytext;

    }
    var x = err.data.message.errors;
    return (
        <Snackbar dir="rtl" open={open} autoHideDuration={3000} onClose={handleClose}>
            {
                err.data.message.code == 11000 ? <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>     </Alert>
                    :

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