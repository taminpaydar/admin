import { Container, InputAdornment, OutlinedInput, Box, Typography, Input, Grid, TextField, Button, Link } from "@mui/material"

import styles from '../../app/template.module.scss'

import { useForm, SubmitHandler } from "react-hook-form";
import '../../../i18n'
import React from 'react';
import Layout from '../../layouts/registerLayout'
import { BreadcrumbCom } from '../../components/BreadCrumpCom';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { render } from "react-dom";
import { useState } from "react";
import { ShowEye } from "@/utils/eye";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { getCookies, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/router";

import { config } from "@/config";
type Inputs = any;
import i18n from '../../../i18n';
export default function RegsiterPage() {
        const router = useRouter()

        const [password, setPassword] = useState(true);
        const [error, setError] = useState<any>(null);

        const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
        const onSubmit: SubmitHandler<Inputs> = async data => {
                await axios.post(`${config.url}/v1/register`, data).then(async function (res: any) {
                        setCookie('token', res.data.token);
                        router.push('/Dashboard')



                }).catch((err: any) => {
                        setError(err.response.data.errors);
                });

        }
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
                                                        name: 'Regsiter',
                                                        url: null

                                                },

                                        ]}

                                ></BreadcrumbCom>

                                <form onSubmit={handleSubmit(onSubmit)} >

                                        <Box mt={1}>
                                                <Typography fontSize={24} fontWeight={'bold'}>{i18n.t('Register in Davaat system')}</Typography>
                                                <Grid container dir="rtl">
                                                        <Grid xs={12} md={6} sx={GridSpacing}>
                                                                <Typography m={1}>{i18n.t('name')} </Typography>
                                                                <TextField
                                                                        {...register("name")}
                                                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                        </Grid>
                                                        <Grid xs={12} md={6} sx={GridSpacing} >
                                                                <Typography m={1}>{i18n.t('last name')} </Typography>
                                                                <TextField
                                                                        {...register("lastname")}
                                                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                        </Grid>
                                                        <Grid xs={12} md={6} sx={GridSpacing} >
                                                                <Typography m={1}>{i18n.t('national code')}</Typography>
                                                                <TextField
                                                                        dir='rtl'

                                                                        {...register("nationalcode")}
                                                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                        </Grid>
                                                        <Grid xs={12} md={6} sx={GridSpacing}>
                                                                <Typography m={1}>{i18n.t('e-mail')}</Typography>
                                                                <TextField
                                                                        dir='rtl'
                                                                        type="email"
                                                                        {...register("email")}

                                                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                        </Grid>
                                                        <Grid xs={12} md={6} sx={GridSpacing}>
                                                                <Typography m={1}>{i18n.t('phone number')}</Typography>
                                                                <TextField
                                                                        {...register("mobile")}
                                                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                        </Grid>


                                                        <Grid xs={12} md={12} sx={GridSpacing} >
                                                                <Typography m={1}>{i18n.t('password')}</Typography>
                                                                <TextField
                                                                        {...register("password")}

                                                                        dir="rtl"
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
                                                        <Grid xs={12} md={12} sx={GridSpacing} >
                                                                <Typography m={1}>تکرار رمز عبور</Typography>
                                                                <TextField
                                                                        {...register("confirm_password")}

                                                                        dir="rtl"
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
                                                                                <Button type="submit" fullWidth className={styles.buttonblack} variant={'contained'} >
                                                                                        <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Check information')}
                                                                                </Button>
                                                                        </Container>

                                                                </Box>
                                                                {
                                                                        error != null &&
                                                                        <ul>
                                                                                {error.map((er: any, index: number) => (
                                                                                        <Box mt={2}>
                                                                                                <Alert severity="warning" >  {er.msg}  </Alert>

                                                                                        </Box>

                                                                                ))}
                                                                        </ul>
                                                                }

                                                        </Grid>

                                                </Grid>

                                        </Box>
                                </form>
                        </Box>
                </Layout>


        )
}

