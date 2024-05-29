import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, InputLabel, MenuItem, Paper, Select, Checkbox, TextField, Switch, Button, FormControl, Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react';

import axios from "axios"
import { getCookies } from "cookies-next";
import cookie from "cookie";
import { config } from "@/config"
import styles from '@/app/template.module.scss'
import i18n from 'i18n';
import changeUrl from "@/hoc/changeurl";
import ErrorDB from "@/components/ErrorDb";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


import Swal from 'sweetalert2'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { t } from "i18next";
type Repo = any;

type Inputs = any;

export default function ItemEdit({
    repo, editprice, myid
}: any) {
    const router = useRouter()

    let cookie = getCookies();
    const [error, setError] = useState<any>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [key, setKey] = useState<any>(0);
    const [Price, setPrice] = useState<any>(repo.message);

    const [data, setData] = useState<any>(editprice.message);
    const handleChangeMultiple = (event: any) => {
        console.log(event.target.value);


    };




    const loadallgroup = () => {
        axios.get(`${config.url}/v1/dashboard/pgroup/allgroup`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {

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
            name: 'Products list',
            url: '/Dashboard/Products/Items'
        },
        {
            name: data.name,
            url: `/Dashboard/Products/Items/${repo.message.parent}`
        },
        {
            name: i18n.t('list price'),
            url: `/Dashboard/Products/ItemsPrice/${repo.message.parent}`
        },

        {
            name: i18n.t('edit') + repo.message.title,
        }
    ]

    const onSubmit: SubmitHandler<Inputs> = async ss => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + `/v1/dashboard/price/${repo.message._id}`,
                data: Price,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;

            router.push('/Dashboard/Products/ItemsPrice/' + repo.message.parent)
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    };

    useEffect(() => {

    }, []);
    return (
        <Layout>
            <Container dir='rtl'  >
                <Paper>

                    <Box p={3}>
                        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                        <Typography color={'gray'} variant="h4" m={1}>{i18n.t('new custom price')}{repo.message.name}</Typography>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <Grid container>
                                <Grid xs={12} md={6} p={1}>
                                    <Typography m={1}>{i18n.t('Title')} </Typography>
                                    <TextField dir='rtl'
                                        defaultValue={Price.title}
                                        onChange={(e) => setPrice({ ...Price, title: e.target.value })}
                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                </Grid>
                                <Grid xs={12} md={6} p={1}>
                                    <Typography m={1}>کاربران معمولی</Typography>
                                    <TextField dir='ltr'
                                        defaultValue={Price.price}
                                        type="number"
                                        onChange={(e) => setPrice({ ...Price, price: e.target.value })}

                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                </Grid>
                                <Grid xs={12} md={6} p={1}>
                                    <Typography m={1}>نمایندگی</Typography>
                                    <TextField dir='ltr'
                                        defaultValue={Price.price2}
                                        type="number"
                                        onChange={(e) => setPrice({ ...Price, price2: e.target.value })}

                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                </Grid>
                                <Grid xs={12} md={6} p={1}>
                                    <Typography m={1}>فروشنده </Typography>
                                    <TextField dir='ltr'
                                        defaultValue={Price.price3}
                                        type="number"
                                        onChange={(e) => setPrice({ ...Price, price3: e.target.value })}

                                        className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                </Grid>
                                <Grid xs={12} textAlign={'center'} p={3}>
                                    <Button type="submit" variant={'outlined'}>{i18n.t('Save')}</Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Box>

                </Paper>
                {error != null && <ErrorDB key={key} err={error} />}
            </Container >

        </Layout >
    )
}
export const getServerSideProps: GetServerSideProps<{
    repo: Repo
}> = async (context: any) => {

    const cookies = cookie.parse(context.req.headers.cookie);
    const res = await fetch(config.url + '/v1/dashboard/price/' + context.params.id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + cookies['token']

        }
    })
    const res2 = await fetch(config.url + '/v1/dashboard/company/all', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + cookies['token']

        }
    })
    if (res.status != 200) {
        return {
            notFound: true, //redirects to 404 page
        };
    }
    const repo = await res.json()
    const price = await res2.json();
    return { props: { repo: repo, editprice: price, myid: context.params.id } }
}
