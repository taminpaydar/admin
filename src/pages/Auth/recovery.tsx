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

export default function RegsiterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
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
                            name: 'recovery passowrd',
                            url: null

                        },

                    ]}

                ></BreadcrumbCom>
                <Box mt={1}>
                    <Box mt={3} mb={3}>
                                <Typography textAlign={'center'} fontWeight={'bolder'} fontSize={'28px'}>{i18n.t('recovery passowrd')}</Typography>

                            </Box>
                            <Box mt={3} mb={3}>
                                <Typography color="#666" textAlign={'center'} fontSize={17} >{i18n.t('confrim your Identity, is now can change password')}</Typography>

                            </Box>
                    <Grid container dir="rtl">
                    <Grid xs={12} md={12} sx={GridSpacing} >
                            <Typography m={1}>{i18n.t('new password')}</Typography>
                            <TextField

                                dir="rtl"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <Box className={styles.cursuer} onClick={() =>{
                                                setPassword(password==true ? false : true)
                                            }} >
                                                <ShowEye show={password} width='20px' />

                                            </Box>
                                        </InputAdornment>
                                    ),
                                }}
                                type={password==true ? 'password': 'text'} className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                        </Grid>
                        <Grid xs={12} md={12} sx={GridSpacing} >
                            <Typography m={1}>{i18n.t('confrim new password')}</Typography>
                            <TextField

                                dir="rtl"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <Box className={styles.cursuer} onClick={() =>{
                                                setPassword(password==true ? false : true)
                                            }} >
                                                <ShowEye show={password} width='20px' />

                                            </Box>
                                        </InputAdornment>
                                    ),
                                }}
                                type={password==true ? 'password': 'text'} className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                        </Grid>


                        <Grid xs={12}>
                            <Box mt={3}>
                                <Container >
                                    <Button fullWidth className={styles.buttonblack} variant="contained" >
                                        <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('login')}
                                    </Button>
                                </Container>
                                <Container>
                                    <Box mt={2} >
                                        <Button href="/Auth/forget" fullWidth className={styles.buttonoutline} variant={'outlined'} >
                                            <img className={styles.m1} src="/assets/key.svg"></img>    
                                            <Typography color={'#333'}>  {i18n.t('forget password')}</Typography>
                                        </Button>
                                    </Box>

                                </Container>
                                <Container >
                                    <Box mt={2}>
                                        <Link href="/Auth/register" className={styles.underlineblack} >
                                            <Typography fontWeight={'bold'} color={'black'} textAlign={'center'}>{i18n.t('I don\'t have a user account')}</Typography>
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

