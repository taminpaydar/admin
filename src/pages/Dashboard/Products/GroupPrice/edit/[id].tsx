import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, InputLabel, MenuItem, Paper, Select, Checkbox, TextField, Switch, Button, FormControl, Box, Typography, Grid, Stack, Table, Link } from "@mui/material";
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
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2'

import { useRouter } from "next/router";
import { t } from "i18next";
import { ArrowDownward, ArrowUpward, DeleteForever, Edit, PriceChange } from "@mui/icons-material";
type Repo = any;
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = any;


export default function ItemEdit({
    repo, myid
}: any) {
    const router = useRouter()

    let cookie = getCookies();
    const [error, setError] = useState<any>(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


    const [key, setKey] = useState<any>(0);
    const [data, setData] = useState<any>(repo.message);
    const [list, setList] = useState<any>(null);

    const [keyselectgroup, setselectgroup] = useState<any>(null);


    const handleChangeMultiple = (event: any) => {
        console.log(event.target.value);


    };




    const loadallgroup = () => {

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
            url: `/Dashboard/Products/Items/${data._id}`
        },
        {
            name: i18n.t('custom price') + repo.message.name,
        }
    ]
    const onSubmit: SubmitHandler<Inputs> = async ss => {
        axios.put(`${config.url}/v1/dashboard/groupprice/${myid}`, data, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            Swal.fire('دخیره سازی انجام شد')
        })
    }

    const reload = async () => {
        // data.parent = keyselectgroup == null ? '' : keyselectgroup;

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/groupprice/' + myid,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });
            setList(res.data)
            // let mydata = res.data;
            // router.push('/Dashboard/Products/Items/' + res.data.data.id)
            // Swal.fire(`${i18n.t('Saved Success')}`)
            // return mydata;
        } catch (error: any) {
            // let x = key + 1;
            // setKey(x);
            // setError(error.response);
        }

    }
    const ArrowTop = () => {

    }
    useEffect(() => {
        reload();
    }, []);
    return (
        <Layout>
            <Container dir='rtl'  >
                <Paper>


                    <Typography color={'gray'} variant="h4" m={1}>{i18n.t('گروه قیمت گذاری ')}{repo.message.name}</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Grid container>
                            <Grid xs={12} md={6} p={1}>
                                <Typography m={1}>{i18n.t('Title')} </Typography>
                                <TextField dir='rtl'
                                    defaultValue={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}

                                    className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                            <Grid xs={12} textAlign={'center'} p={3}>
                                <Button type="submit" variant={`contained`}>{i18n.t('Save')}</Button>
                            </Grid>
                            <Grid xs={12} textAlign={'center'} p={3}>
                                <Button href={`/Dashboard/Products/GroupPrice/${data.parent}`} variant={'outlined'}>بازگشت</Button>
                            </Grid>
                        </Grid>

                    </form>






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
    const res = await fetch(config.url + '/v1/dashboard/groupprice/' + context.params.id, {
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
    return { props: { repo: repo, myid: context.params.id } }
}
