import { Container, InputAdornment, OutlinedInput, Box, Typography, Input, Grid, TextField, Button, Link } from "@mui/material"

import styles from '../../app/template.module.scss'

import { useForm, SubmitHandler } from "react-hook-form";
import '../../../i18n'
import React from 'react';
import Layout from '../../layouts/registerLayout'
import { BreadcrumbCom } from '../../components/BreadCrumpCom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { ShowEye } from "@/utils/eye";
type Inputs = {
    example: string,
};
import i18n from '../../../i18n';
import { TimeUntil } from 'react-time-until'


export default function CheckForgetPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    const [password, setPassword] = useState(false);
    const [phone, setPhone] = useState('09120000000');

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

            <Box className={styles.boxRegister} p={2} pb={3} dir="rtl">
                <BreadcrumbCom
                    data={[
                        {
                            name: 'login to portal',
                            url: '/Auth'
                        },
                        {
                            name: 'Login',
                            url: null

                        },

                    ]}

                ></BreadcrumbCom>
                <Box mt={1}>
                    <Grid container dir="rtl">


                        <Grid xs={12} md={12} sx={GridSpacing} >
                            <Box mt={3} mb={3}>
                                <Typography textAlign={'center'} fontWeight={'bolder'} fontSize={'32px'}>{i18n.t('forget password')}</Typography>

                            </Box>
                            <Box mt={3} mb={3}>
                                <Typography color="#666" textAlign={'center'} fontSize={17} >{i18n.t('send confirm code to', { phone: phone })}</Typography>

                            </Box>
                            <Typography m={1}>{i18n.t('confrim code')}</Typography>
                            <TextField

                                dir="rtl"

                                type={'text'} className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                        </Grid>


                        <Grid xs={12}>
                            <Box mt={3}>
                                <Container >
                                    <Button fullWidth className={styles.buttonblack} variant="contained" >
                                        <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('check confirm code')}
                                    </Button>
                                </Container>
                                <Container>
                                    <Box mt={2} >
                                        <Button href="/Auth/forget" fullWidth className={styles.buttonoutline} variant={'outlined'} >
                                            <Typography color={'#333'}>
                                                <span>  {i18n.t('send again')}</span>  <TimeUntil delta={10000} format='time' />
                                            </Typography>
                                        </Button>
                                    </Box>

                                </Container>
                                <Container >
                                    <Box mt={2}>
                                        <Link href='/Auth' className={styles.underlineblack} >
                                            <Typography fontWeight={'bold'} color={'black'} textAlign={'center'}>{i18n.t('edit phone number')}</Typography>
                                        </Link>
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

