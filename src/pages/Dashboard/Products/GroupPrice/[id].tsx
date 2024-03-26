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



export default function ItemEdit({
    repo, company, myid
}: any) {
    const router = useRouter()

    let cookie = getCookies();
    const [error, setError] = useState<any>(null);


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
    const Arrowup = async (item: any) => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/dashboard/price/ordettop/' + item,
                data: repo.message,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            reload();
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            //  setKey(x);
            //  setError(error.response);
        }
    }
    const ArrowDown = async (item: any) => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/dashboard/price/orderdown/' + item,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            reload();
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            //  setKey(x);
            //  setError(error.response);
        }
    }
    const reload = async () => {
        // data.parent = keyselectgroup == null ? '' : keyselectgroup;

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/groupprice/list/' + myid,
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

                    <Box p={3}>
                        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                        <Typography color={'gray'} variant="h4" m={1}>{i18n.t('custom price')}{repo.message.name}</Typography>
                        <Stack direction="row" spacing={2} >
                            <Box p={2}>
                                <Button variant={'outlined'} href={`/Dashboard/Products/GroupPrice/new/${repo.message.id}`}> {i18n.t('اضافه کردن گروه قیمت')} </Button>

                            </Box>
                            <Box p={2}>
                                <Button variant={'outlined'} onClick={(e) => reload()}> {i18n.t('reload')} </Button>

                            </Box>
                        </Stack>
                    </Box>


                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">تیتر</TableCell>
                                        <TableCell align="right">قیمت گذای</TableCell>
                                        <TableCell align="right">ویرایش</TableCell>

                                        <TableCell align="right">پاک کردن</TableCell>
                                        <TableCell align="center">ترتیب</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list != null && list.message.map((row: any) => (
                                        <TableRow
                                            key={row.title}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right" component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link href={`/Dashboard/Products/ItemsPrice/${row._id}`}>
                                                    <PriceChange></PriceChange>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link href={`/Dashboard/Products/GroupPrice/edit/${row._id}`}>
                                                    <Edit></Edit>
                                                </Link>

                                            </TableCell>
                                            <TableCell align="right" >
                                                <DeleteForever></DeleteForever>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button onClick={(e) => { Arrowup(row._id) }}>
                                                    <ArrowUpward></ArrowUpward>
                                                </Button>
                                                <Button onClick={(e) => { ArrowDown(row._id) }} >
                                                    <ArrowDownward></ArrowDownward>
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
    const res = await fetch(config.url + '/v1/dashboard/product/' + context.params.id, {
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
    const company = await res2.json();
    return { props: { repo: repo, company: company, myid: context.params.id } }
}
