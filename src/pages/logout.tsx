import React, { useState, useEffect } from 'react';
import { logout } from '@/hoc/checkUser';
import { Box, Button, Container, Typography } from '@mui/material';
export default function CheckPage(){
    useEffect(() => {

        logout();
  
    }, []);
    return(<>
    <Container>
        <Box p={4} textAlign={'center'}>
            <Typography fontSize={12}>Logout Success</Typography>
            <Box mt={3}>
            <Button variant={'contained'} href='/Auth'> Back to Login Page</Button>

            </Box>
        </Box>
    </Container>
    </>)
}
