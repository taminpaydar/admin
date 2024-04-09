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
import axios from "axios";
import { setCookie } from "cookies-next";
import { config } from "@/config";
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';

type Inputs = any;
import i18n from '../../../i18n';
export default function RegsiterPage() {
    const router = useRouter()

    const [error, setError] = useState<any>(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await axios.post(`${config.url}/v1/auth/login`, data).then(async function (res: any) {
            console.log(res.data.token)
            setCookie('token', res.data.token);
            router.push('/')

        }).catch((err: any) => {
            setError('رمز عبور یا نام کاربری اشتباه می باشد');
        });

    };
    
    const [password, setPassword] = useState(false);

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
                <form onSubmit={handleSubmit(onSubmit)} >

                    <Box mt={3}>
                        <Box textAlign={'center'}>
                        </Box>
                        <Typography fontSize={12} textAlign={'center'} fontWeight={'bold'}>{i18n.t('Login to TISS Engine 2.0')}</Typography>


                        <Grid container dir="rtl">

                            <Grid xs={12} md={12} sx={GridSpacing} >
                                <Typography m={1}>{i18n.t('E-mail')} </Typography>
                                <TextField dir='ltr'   {...register("email")} className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                            <Grid xs={12} md={12} sx={GridSpacing} >
                                <Typography m={1}>{i18n.t('password')}</Typography>
                                <TextField
                                    {...register("password")}
                                    dir="ltr"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <Box className={styles.cursuer} onClick={() => {
                                                    setPassword(password == true ? false : true)
                                                }} >
                                                    <ShowEye show={password} width='20px' />

                                                </Box>
                                            </InputAdornment>
                                        ),
                                    }}
                                    type={password == true ? 'password' : 'text'} className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>


                            <Grid xs={12}>
                                <Box mt={3}>
                                    <Container >
                                        <Button fullWidth type="submit"  className={styles.buttonblack} variant="contained" >
                                            <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('login')}
                                        </Button>
                                    </Container>
                                    <Container>
                                        <Box mt={2} >
                                            <Link href="/Auth/forget"  underline={'none'}>
                                                <Button fullWidth className={styles.buttonoutline} variant={'outlined'} >
                                                    <img className={styles.m1} src="/assets/key.svg"></img>
                                                    <Typography color={'#333'} >  {i18n.t('forget password')}</Typography>
                                                </Button>
                                            </Link>


                                        </Box>

                                    </Container>


                                </Box>


                            </Grid>

                        </Grid>
                    </Box>
                    {
                        error != null &&
                        <Alert>{error}</Alert>
                    }
                </form>
            </Box>
        </Layout>


    )
}

