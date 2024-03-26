
import Layout from "@/layouts/dashboardLayout"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import { Grid, FormControl, TextField } from '@mui/material'
import { Container, InputLabel, MenuItem, Select, Button, Box } from "@mui/material";
import { AddNewCard, EditCard } from "@/components/Dashboard/cardThumpnailGroup";
import React, { useState, useEffect } from 'react';
import { config } from "@/config"
import styles from '@/app/template.module.scss'

import axios from "axios"
import { getCookies } from "cookies-next";
import { Refresh, DeleteForever, ArrowForwardIos, Folder as ArrowUP } from "@mui/icons-material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function ArticleGroup() {
    const [error, setError] = useState<any>(null);
    const [parent, setParent] = useState<any>('');
    const [parentnode, setParentnode] = useState<any>('');

    const [article, setArticle] = useState<any>(null);
    const [namefilter, setNameFilter] = useState<any>('');

    const [page, setPage] = useState<any>(1);

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
            name: i18n.t('Discount Code')
        }
    ]
    let cookie = getCookies();
    const GotoParent = async (id: any) => {
        await setParent(id);
        LoadArticle(1, id);
    }

    const LoadArticle = (current: any, parent: any) => {
        console.log(parent);
        axios.get(`${config.url}/v1/dashboard/discount?&page=${current}&name=${namefilter}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            console.log(res.data);
            setArticle(res.data.message);
            setParentnode(res.data.parent)
        })
    }
    const deleteItem = (id: String) => {
        axios.delete(`${config.url}/v1/dashboard/discount/${id}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            LoadArticle(page, parent);
        })

    }
    const ChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        LoadArticle(value, parent);

    }
    const covert = (item: any) => {
        const date = new DateObject({
            date: item * 1000
        }).convert(persian, persian_fa)
        console.log(date)
        return date.year + '/' + date.monthIndex + '/' + date.day;
    }
    useEffect(() => {
        LoadArticle('1', '');
    }, []);
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                <Refresh onClick={() => LoadArticle('1', parent)}></Refresh>

                {i18n.t('Discount Code')}
            </Typography>

            <Grid container>
                <Grid xs={12} md={8} pl={3}>
                    <FormControl fullWidth dir='lrt'>
                        <InputLabel id="demo-simple-select-label">{i18n.t('Search')} </InputLabel>
                        <TextField
                            onChange={(e) => { setNameFilter(e.target.value) }}
                        ></TextField>
                    </FormControl>
                </Grid>

                <Grid xs={6} md={2} pr={1} pl={1}>
                    <Button onClick={(e) => { LoadArticle(1, parent) }} className={styles.btnupload} style={{ height: 50, backgroundColor: '#444' }} variant="contained" >
                        <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Search')}
                    </Button>
                </Grid>
                <Grid xs={6} md={2} pr={1} pl={1} >
                    <Link href={`/Dashboard/Products/DiscountCode/new`}>
                        <Button className={styles.btnupload} style={{ height: 50 }} variant="contained" >
                            {i18n.t('New')}  <img className={styles.m1} height={20} src="/assets/plus.svg"></img>
                        </Button>
                    </Link>

                </Grid>
            </Grid>
            <Grid container mt={5}>
                <Box height={30} mt={2}>
                    {
                        parentnode != null &&
                        <Box onClick={() => { LoadArticle(1, parentnode.ToSub != null ? parentnode.ToSub.id : '') }} >
                            <Typography style={{ cursor: 'pointer' }} fontSize={18}> <ArrowForwardIos fontSize={'small'}></ArrowForwardIos>  {parentnode.name}</Typography>
                        </Box>
                    }
                </Box>
            </Grid>

            <Box mt={4}>

                {
                    article != null &&

                    <TableContainer component={Paper} dir={'rtl'}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{i18n.t('name')}</TableCell>
                                    <TableCell align="right">{i18n.t('مقدار')}</TableCell>
                                    <TableCell align="right">{i18n.t('مدل')}</TableCell>
                                    <TableCell align="right">{i18n.t('تاریخ انقضا')}</TableCell>

                                    <TableCell align="center">{i18n.t('وضعیت')}</TableCell>
                                    <TableCell align="center">{i18n.t('delete')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {article.docs.map((row: any) => (
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right" component="th" scope="row"> {row.suffex} </TableCell>
                                        <TableCell align="right">  {row.data}</TableCell>
                                        <TableCell align="right">  {row.mode == "price" ? 'مبلغ ثابت' : 'درصد'}</TableCell>
                                        <TableCell align="right">

                                            {covert(row.expiredate)}
                                        </TableCell>

                                      
                                        <TableCell align="center">  {row.status == false ? '-' : 'استفاده شده'}</TableCell>
                                        <TableCell align="center">
                                            <Box onClick={(e) => { deleteItem(row.id) }}>
                                                <DeleteForever ></DeleteForever>

                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                }

                {
                    article != null &&
                    <Stack spacing={2} dir='rtl' mt={5} alignContent={'center'}>
                        <Pagination
                            onChange={ChangePage}
                            count={article.totalPages} defaultPage={page} siblingCount={0} boundaryCount={2} />
                    </Stack>
                }
            </Box>
        </Container>

    </Layout>
}