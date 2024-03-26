import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {Container, DialogContent, Grid} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";


export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
    const { onClose , open } = props;

    const handleClose = () => {
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Table Editor</DialogTitle>
            <List sx={{ pt: 0 }}>
              <DialogContent>
                  <Container>
                      <Grid container>
                          <Grid xs={2}>
                              <Button
                                  onClick={(e) => {
                                      document.execCommand('bold', false, '');

                                      e.preventDefault();
                                  }}
                              > BackGround Color </Button>
                          </Grid>
                      </Grid>
                  </Container>
              </DialogContent>
            </List>
        </Dialog>
    );
}

