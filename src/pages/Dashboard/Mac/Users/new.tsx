import Layout from "@/layouts/dashboardLayout"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Grid } from '@mui/material'
import { Container, TextField, Button, Snackbar, Alert, Select, MenuItem } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import i18n from "i18n";
import { useState } from "react";
import changeUrl from "@/hoc/changeurl";
import styles from '@/app/template.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getCookies } from "cookies-next";
import { config } from "@/config";
import ErrorDB from "@/components/ErrorDb";
import { useRouter } from "next/router";

type Inputs = {
    name: String,
    lastname: String,
    password: String,
    mobile: String,
    fathername: String,
    nationalcode: String,
    birthdate: String,
    Insurance: String,
    gender: String,
    otherInsurance: String
};

export default function newArticleGroup() {
    const router = useRouter()


    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<Inputs>({
        name: '',
        lastname: '',
        password: '',
        mobile: '',
        nationalcode: '',
        fathername: '',
        birthdate: '',
        otherInsurance: '',
        Insurance: '',
        gender: ''


    });
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ss => {
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/pgroup',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            router.push('/Dashboard/Products/Group/Edit/' + res.data.data.id)
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    };


    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'MacRemedy',
            url: '/Dashboard/Mac'
        },

        {
            name: 'New User',
        }

    ]
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>{i18n.t('New User')}</Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container>

                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('name')} </Typography>
                        <TextField dir='rtl'
                            onChange={(e) => setData({ ...data, name: e.target.value })}

                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('lastname')} </Typography>
                        <TextField dir='rtl'
                            onChange={(e) => setData({ ...data, lastname: e.target.value })}

                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('password')} </Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, lastname: e.target.value })}

                            dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('mobile')} </Typography>
                        <TextField

                            onChange={(e) => setData({ ...data, mobile: e.target.value })}

                            dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('fathername')} </Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, fathername: e.target.value })}
                            dir='ltr' className={styles.myformtextfield}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                        />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('nationalcode')} </Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, nationalcode: e.target.value })}
                            dir='ltr'
                            className={styles.myformtextfield}
                            fullWidth id="outlined-basic"
                            variant="outlined"
                        />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('birthdate')} </Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, birthdate: e.target.value })}
                            dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('Insurance')} </Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, Insurance: e.target.value })}
                            dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('otherInsurance')} </Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, otherInsurance: e.target.value })}
                            dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('gender')} </Typography>
                        {/* <Select
                            fullWidth
                            label="Age"
                            onChange={(e) => setData({ ...data, gender: e.target.value })}

                        >
                            <MenuItem value={'male'}>{i18n.t('male')}</MenuItem>
                            <MenuItem value={'famle'}>{i18n.t('famle')}</MenuItem>
                        </Select> */}
                    </Grid>


                </Grid>
                <Grid container mt={3}>
                    <Grid xs={12} md={3} >

                        <Container >
                            <Button type="submit" className={styles.buttonblack} variant="contained" >
                                <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Save')}
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </form>


            {error != null && <ErrorDB key={key} err={error} />}
        </Container>

    </Layout>
}