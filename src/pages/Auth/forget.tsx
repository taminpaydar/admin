import { Container, InputAdornment, OutlinedInput, Box, Typography, Input, Grid, TextField, Button, Link } from "@mui/material"

import styles from '../../app/template.module.scss'

import { useForm, SubmitHandler } from "react-hook-form";
import '../../../i18n'
import React from 'react';
import Layout from '../../layouts/registerLayout'
import { BreadcrumbCom } from '../../components/BreadCrumpCom';
import AccountCircle from '@mui/icons-material/AccountCircle';

type Inputs = {
        example: string,
};
import i18n from '../../../i18n';

export default function FrogetPasssword() {
        const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
        const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
        let GridSpacing = {
                paddingLeft: {
                        xs: 0,
                        md: 3
                },
                paddingRight: {
                        xs: 0,
                        md: 3
                }
        };
        return (

                <Layout>

                        <Box className={styles.boxRegister} p={2} dir="rtl">
                                <BreadcrumbCom data={[
                                        {
                                                name: 'login to portal',
                                                url: '/Auth'
                                        },
                                        {
                                                name: 'forget password',
                                                url: null

                                        },

                                ]}></BreadcrumbCom>
                                <Box mt={1} pt={3} pb={3}>
                                        <Typography textAlign={'center'} fontWeight={'bolder'} fontSize={'32px'}>{i18n.t('forget password')}</Typography>
                                        <Box mt={3}>
                                        <Typography  color="#616161"  textAlign={'center'} fontSize={17} >{i18n.t('Enter your phonenumber for send recovery to password')}</Typography>

                                        </Box>
                                        <Grid container dir="rtl" mt={'10px'}>
                                                <Grid xs={12} md={12} sx={GridSpacing}>
                                                        <Typography fontSize={'17px'} m={1}>{i18n.t('phone number')} </Typography>
                                                        <TextField dir="rtl" className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                </Grid>


                                                <Grid xs={12}>
                                                        <Box mt={3}>
                                                                <Container >
                                                                        <Button fullWidth className={styles.buttonblack} variant="contained"   >
                                                                                <img className={styles.m1} src="/assets/send.svg"></img>      {i18n.t('Send Code')}
                                                                        </Button>
                                                                </Container>
                                                                <Container >
                                                                        <Box mt={2}>
                                                                               
                                                                        </Box>

                                                                </Container>
                                                        </Box>


                                                </Grid>

                                        </Grid>
                                </Box>
                        </Box>
                </Layout>


        )
}

