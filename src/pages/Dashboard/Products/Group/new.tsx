import Layout from "@/layouts/dashboardLayout"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Grid } from '@mui/material'
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
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
    url: String,
    subgroup: any

};

export default function newArticleGroup() {
    const router = useRouter()


    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<Inputs>({
        name: '',
        url: '',
        subgroup:router.query.parent
       

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
            router.push('/Dashboard/Products/Group/' + res.data.data.id)
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    };

    function ChangeData(e: String) {
        setData({
            name: e,
            url: changeUrl(e),
            subgroup:router.query.parent
        })
    }
    function ChangeDataUrl(e: String) {
        setData({
            name: data.name,
            url: changeUrl(e),
            subgroup:router.query.parent
        })
    }
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Products',
            url: '/Dashboard/Products'
        },
        {
            name: 'Products Group',
            url: '/Dashboard/Products/Groups'
        },
        {
            name: 'New Product Group',
        }

    ]
    return <Layout>
        <Container>
            { router.query.parent }
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>{i18n.t('New Product Group')}</Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container>
                    <Grid></Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('Name')} </Typography>
                        <TextField dir='rtl'
                            onChange={(e) => ChangeData(e.target.value)}
                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('URL')} </Typography>
                        <TextField
                            value={data.url}

                            onChange={(e) => ChangeDataUrl(e.target.value)}
                            dir='rtl' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={3} p={1}>

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