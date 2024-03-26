import { Container, InputAdornment, OutlinedInput, Box, Typography, Input, Grid, TextField, Button, Link } from "@mui/material"

import styles from '../../app/template.module.scss'

import { useForm, SubmitHandler } from "react-hook-form";
import '../../../i18n'
import React from 'react';
import Layout from '../../layouts/registerLayout'
import { BreadcrumbCom } from '../../components/BreadCrumpCom';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { render } from "react-dom";

type Inputs = {
        example: string,
};
import i18n from '../../../i18n';
export default function RegsiterPage() {
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

                                <Box mt={8}>
                                        <Box alignContent={'center'} textAlign={'center'}>
                                                <img src="/assets/success.svg" />
                                                <Box>
                                                        <Typography fontSize={'22px'} fontWeight={'bold'}>{i18n.t('success login !')}</Typography>
                                                </Box>
                                                <Box mt={2}>
                                                        <Typography fontSize={'14px'} color={'gray'}>{i18n.t('thnaks :)')}</Typography>
                                                </Box>
                                        </Box>
                                </Box>
                        </Box>
                </Layout>


        )
}

