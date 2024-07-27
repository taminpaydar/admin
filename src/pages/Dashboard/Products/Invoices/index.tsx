import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Box, Paper, TableContainer, Table, TableHead, Select, TableRow, TableCell, TableBody, Link, Button, Grid, TextField, MenuItem } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import i18n from "i18n";
import axios from "axios";
import { getCookies } from "cookies-next";
import styles from '@/app/template.module.scss'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { config } from "@/config";

export default function InvoiceList() {
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [page, setPage] = useState<any>(1);
    const [key, setKey] = useState<any>(1);

    const [filter, setFilter] = useState<any>({
        name: "",
        family: "",
        mobile: "",
        invoicenumber: "",
        status: 0

    });
    const filterd = () => {
        console.log("dsd");
    }
    let cookie = getCookies();

    const loadallgroup = () => {
        axios.get(`${config.url}/v1/dashboard/order?page=${page}&name=${filter.name}&lastname=${filter.family}&mobile=${filter.mobile}&invoicenumber=${filter.invoicenumber}&status=${filter.status}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {

            setData(res.data.message);
            var x = key + 1;
            setKey(x);
        })
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        loadallgroup();
    };
    const deleteitem = (item: String) => {
        axios.delete(`${config.url}/v1/dashboard/order/${item}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setPage(1);
            
            loadallgroup();
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
            name: 'Invoices',
        }
    ]
    const convertodate = (data: any) => {

        let date = new Date(Date.parse(data)).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' }); // 08/19/2020 (month and day with two digits);
        return date;

    }
    const statustotext = (data: any) => {
        if (data == 1) { return 'عدم پرداخت' };
        if (data == 2) { return 'پرداخت شده' };
        if (data == 3) { return 'در حال ارسال' };
        if (data == 4) { return 'بایگانی' };
        if (data == 5) { return 'کنسل شده ها' };

        return data == false ? 'new' : 'read';
    }
    useEffect(() => {
        loadallgroup();
    }, []);
    return (
        <Layout>
            <Container dir='rtl'  >
                <Paper>

                    <Box p={3}>
                        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                        <Box mt={4} mb={4}>
                            <Grid container spacing={4}>

                                <Grid xs={12} sm={4} p={3}>
                                    <label>نام </label>

                                    <TextField
                                        onChange={(e) => setFilter({ ...filter, name: e.target.value })}

                                        defaultValue={filter.name} fullWidth placeholder="نام"></TextField>
                                </Grid>
                                <Grid xs={12} sm={4} p={3}>
                                    <label>نام خانوادگی</label>

                                    <TextField
                                        onChange={(e) => setFilter({ ...filter, family: e.target.value })}


                                        defaultValue={filter.family} fullWidth placeholder="نام خانوادگی"></TextField>
                                </Grid>
                                <Grid xs={12} sm={4} p={3}>
                                    <label>موبایل</label>

                                    <TextField
                                        onChange={(e) => setFilter({ ...filter, mobile: e.target.value })}

                                        defaultValue={filter.mobile} fullWidth placeholder="موبایل"></TextField>
                                </Grid>
                                <Grid xs={12} sm={4} p={3} >
                                    <label>شماره فاکتور</label>

                                    <TextField

                                        onChange={(e) => setFilter({ ...filter, invoicenumber: e.target.value })}
                                        defaultValue={filter.invoicenumber} fullWidth placeholder="شماره فاکتور"></TextField>

                                </Grid>
                                <Grid xs={12} sm={4} p={3} >
                                    <label>وضعیت</label>
                                    <Select
                                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                        defaultValue={filter.status}
                                        fullWidth
                                        placeholder="وضعیت"
                                    >
                                        <MenuItem value={0}>همه</MenuItem>
                                        <MenuItem value={1}>عدم پرداخت</MenuItem>
                                        <MenuItem value={2}>پرداخت شده</MenuItem>
                                        <MenuItem value={3}>در حال ارسال</MenuItem>
                                        <MenuItem value={4}>بایگانی</MenuItem>
                                        <MenuItem value={5}>کنسل شده ها</MenuItem>

                                    </Select>

                                </Grid>
                                <Grid p={3} xs={12} sm={4} >
                                    <label>وضعیت</label>
                                    <Button

                                        fullWidth
                                        onClick={(e) => { loadallgroup() }}
                                        variant="contained"
                                    >فیلتر</Button>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {
                        data != null &&

                        <TableContainer key={key} component={Paper} dir={'rtl'}>
                            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">{i18n.t('name')}</TableCell>
                                        <TableCell align="right">{i18n.t('last name')}</TableCell>
                                        <TableCell align="right">{i18n.t('تاریخ')}</TableCell>
                                        <TableCell align="right">{i18n.t('شماره فاکتور')}</TableCell>

                                        <TableCell align="right">{i18n.t('وضعیت')}</TableCell>

                                        <TableCell align="right">{i18n.t('edit')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.docs != null &&
                                        data.docs.map((row: any) => (

                                            <TableRow

                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="right" component="th" scope="row">
                                                    <Box className={` bg-gray `}>
                                                        {row.name}


                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">{row.lastname}</TableCell>
                                                <TableCell align="right">{row.invoicenumber}</TableCell>


                                                <TableCell align="right" dir="ltr">{convertodate(row.createdAt).toString()}</TableCell>
                                                <TableCell align="right">
                                                    {statustotext(row.status)}</TableCell>
                                                <TableCell align="right">
                                                    <Link href={`/Dashboard/Products/Invoices/${row.id}`}>
                                                        <img className={styles.m1} src="/assets/eye.svg" width={20}></img>
                                                    </Link>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    }
                    <Box textAlign={'center'} p={3}>
                        {
                            data != null &&
                            <Stack key={key} spacing={2}>
                                <Pagination count={data.totalPages} onChange={handleChange} variant="outlined" />
                            </Stack>
                        }
                    </Box>
                </Paper>

            </Container>
        </Layout>
    )
}