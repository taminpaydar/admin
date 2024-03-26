import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Button } from "@mui/material";
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

    let cookie = getCookies();

    const loadallgroup = () => {
        axios.get(`${config.url}/v1/dashboard/order?page=${page}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setData(res.data.message);
        })
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        loadallgroup();
    };
    const deleteitem = (item:String)=>{
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

        let date = new Date(Date.parse(data)).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); // 08/19/2020 (month and day with two digits);
        return date;

    }
    const statustotext = (data: boolean) => {
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
                    </Box>
                    {
                        data != null &&

                        <TableContainer component={Paper} dir={'rtl'}>
                            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">{i18n.t('name')}</TableCell>
                                        <TableCell align="right">{i18n.t('last name')}</TableCell>
                                        <TableCell align="right">{i18n.t('date')}</TableCell>
                                        <TableCell align="right">{i18n.t('status')}</TableCell>

                                        <TableCell align="right">{i18n.t('edit')}</TableCell>
                                        <TableCell align="right">{i18n.t('delete')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.docs.map((row: any) => (

                                        <TableRow

                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right" component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.lastname}</TableCell>


                                            <TableCell align="right">{convertodate(row.createdAt).toString()}</TableCell>
                                            <TableCell align="right">
                                                {statustotext(row.status)}</TableCell>
                                            <TableCell align="right">
                                                <Link href={`/Dashboard/Products/Invoices/${row.id}`}>
                                                    <img className={styles.m1} src="/assets/insert.svg"></img>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box  >
                                                    <Button onClick={(e)=>{deleteitem(row.id)}}>
                                                    <DeleteForever  ></DeleteForever>

                                                    </Button>
                                                </Box>
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
                            <Stack spacing={2}>
                                <Pagination count={data.totalPages} onChange={handleChange} variant="outlined" />
                            </Stack>
                        }
                    </Box>
                </Paper>

            </Container>
        </Layout>
    )
}