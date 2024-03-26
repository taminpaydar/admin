import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Typography, Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';
import i18n from "i18n";
import axios from "axios";
import { getCookies } from "cookies-next";
import styles from '@/app/template.module.scss'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import { config } from "@/config";

export default function InvoiceList({ current }: any) {
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [page, setPage] = useState<any>(1);

    let cookie = getCookies();

    const loadallgroup = () => {
        axios.get(`${config.url}/v1/dashboard/order/${current}`, {
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
    const checkthisobject = (status: boolean) => {
        axios.put(`${config.url}/v1/dashboard/order/${current}`, {
            status: status
        }, {

            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            loadallgroup();
        })
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
                        <Container>
                            <Box>
                                <Typography>Name : {data.name}</Typography>
                                <Typography>Last name : {data.lastname}</Typography>
                                <Typography>phone : {data.phone}</Typography>
                                <Typography>compnay name  : {data.data.companyname}</Typography>
                                <Typography>Country  : {data.data.country}</Typography>
                                <Typography>E-mail  : {data.data.email}</Typography>
                                <Typography>QTY  : {data.data.quantity}</Typography>
                                <Typography>description  : {data.data.description}</Typography>
                                <Typography>Date  Order : {convertodate(data.createdAt)}</Typography>
                                <Typography>Status : {statustotext(data.status)}</Typography>

                                <Box mt={3}>
                                    <Container>
                                        <Box>
                                        </Box>
                                        <Box mt={3}>
                                            {
                                                data.status == false ? <Button onClick={(e) => { checkthisobject(true) }} variant="contained">  checked</Button> :
                                                <Button onClick={(e) => { checkthisobject(false) }} variant="contained">  unchecked</Button>
                                            }

                                        </Box>
                                    </Container>
                                </Box>
                            </Box>
                        </Container>
                    }
                    <Container>
                        <Box mt={2} mb={2}>
                            <Container>
                                <Button href="/Dashboard/Products/Invoices" variant="outlined"> Bakc to list</Button>

                            </Container>
                        </Box>

                    </Container>

                </Paper>

            </Container>
        </Layout>
    )
}
export const getServerSideProps = async (context: any) => {


    return {
        props: {

            current: context.params.id

        }
    }
}