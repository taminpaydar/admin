import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Typography, Button, Grid, Select, MenuItem, TextField } from "@mui/material";
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
            url: '/Dashboard/Products/Invoices'
        },
        {
            name: 'فاکتور',
        }
    ]
    const convertodate = (data: any) => {

        let date = new Date(Date.parse(data)).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); // 08/19/2020 (month and day with two digits);
        return date;

    }
    function timeConverter(UNIX_timestamp: any) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    const statustotext = (data: any) => {
        if (data == 1) { return 'عدم پرداخت' };
        if (data == 2) { return 'پرداخت شده' };
        if (data == 3) { return 'در حال بررسی' };
        if (data == 4) { return 'بایگانی' };
        if (data == 5) { return 'بایگانی' };

        return data == false ? 'new' : 'read';
    }
    const updateinvoce = () => {
        axios.put(`${config.url}/v1/dashboard/order/${data.id}`, data, {

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

                    <Container>
                        <Box mt={2} mb={2}>
                            {data != null &&
                                <Container>
                                    <Grid container>
                                        <Grid xs={8}>
                                            <Grid xs={12}>
                                                <Box bgcolor={'lightblue'} borderRadius={5} p={2} mb={3}>
                                                    <Typography>شماره فاکتور: {data.invoicenumber}</Typography>
                                                </Box>
                                            </Grid>
                                            {
                                                data.toDetail.map((item2: any) => {
                                                    return (
                                                        <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={8}>
                                                                    <h3>{item2.name}</h3>
                                                                    <p>{item2.name}</p>
                                                                    {
                                                                        item2.addprice != null &&
                                                                        item2.addprice.map((i: any) => {
                                                                            return (
                                                                                <Grid container spacing={2}>
                                                                                    <Grid xs={4} p={2}>{i.name}</Grid>
                                                                                    <Grid xs={4} p={2}>{i.subname}</Grid>

                                                                                    <Grid xs={4} p={2} >
                                                                                        {i.price}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            )
                                                                        })
                                                                    }
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <div>تعداد : {item2.qty}</div>
                                                                    <div>قیمت : {item2.total}</div>


                                                                </Grid>
                                                                <Grid item xs={12}>


                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </Grid>


                                        <Grid xs={4}>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>توضیحات</Typography>
                                                <hr />
                                                <Box>
                                                    <Typography>وضعیت</Typography>
                                                    <Select
                                                        defaultValue={data.status}
                                                        fullWidth
                                                        onChange={(e) => setData({ ...data, status: e.target.value })}
                                                        placeholder="وضعیت"
                                                    >
                                                        <MenuItem value={1}>عدم پرداخت</MenuItem>
                                                        <MenuItem value={2}>پرداخت شده</MenuItem>
                                                        <MenuItem value={3}>در حال ارسال</MenuItem>
                                                        <MenuItem value={4}>بایگانی</MenuItem>
                                                        <MenuItem value={5}>کنسل شده ها</MenuItem>
                                                        <MenuItem value={6}> منتظر تایید پرداخت</MenuItem>
                                                        <MenuItem value={7}> در حال آماده سازی  </MenuItem>
                                                        <MenuItem value={8}> ارسال شده</MenuItem>
                                                        <MenuItem value={9}> تحویل به مشتری</MenuItem>
                                                        <MenuItem value={10}> عدم تحویل به مشتری</MenuItem>
                                                        <MenuItem value={11}> کنسل شده</MenuItem>
                                                        <MenuItem value={12}> برگشتی</MenuItem>

                                                    </Select>
                                                    <Typography


                                                    >توضیحات</Typography>
                                                    <TextField
                                                        onChange={(e) => setData({ ...data, note: e.target.value })}
                                                        defaultValue={data.note}

                                                        fullWidth multiline >

                                                    </TextField>
                                                </Box>
                                                <Box mt={4}>
                                                    <Button variant="contained" onClick={(e)=>{updateinvoce()}}>ذخیره سازی</Button>
                                                </Box>


                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>آدرس دریافتی</Typography>
                                                <hr />
                                                <Box>  شهر : {data.address.city}</Box>
                                                <Box>  منطقه : {data.address.zone}</Box>
                                                <Box>  آدرس : {data.address.address}</Box>
                                                <Box>  واحد : {data.address.unint}</Box>
                                                <Box>  پلاک : {data.address.plaque}</Box>
                                                <Box>  گوگل : {data.address.latlng}</Box>
                                                <Box>  دربافت کننده : {data.address.recivername}  {data.address.lastnamereciver}</Box>
                                                <Box>  دربافت کننده : {data.address.recivername}</Box>

                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>توضیحات</Typography>
                                                <hr />
                                                <Box> {data.description}</Box>

                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>زمان ارسال</Typography>
                                                <hr />
                                                <Box className="text-center w-full"> {data.sendingDate}</Box>
                                                <Box> {data.sendingTime}</Box>

                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>تخفیفات</Typography>
                                                <hr />
                                                <Box className="text-center w-full"> کد تخفیف {data.discount}</Box>
                                                <Box className="text-center w-full"> مقدار تخفیف {data.dicountprice}</Box>

                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>مبلغ قابل پرداخت</Typography>
                                                <hr />
                                                <Box className="text-center w-full"> جمع کل {data.totalprice}</Box>
                                                <Box className="text-center w-full"> مقدار تخفیف {data.dicountprice}</Box>

                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>مشخصات کاربر</Typography>
                                                <hr />
                                                <Box className="text-center w-full"> نام و نام خانوادگی : {data.name}  {data.lastname}</Box>
                                                <Box className="text-center w-full"> شماره تماس {data.mobile}</Box>
                                                <Box className="text-center w-full"> شماره ثابت : {data.phone}</Box>
                                                <Box className="text-center w-full"> ایمیل : {data.email}</Box>

                                            </Box>
                                            <Box bgcolor={'#eee'} borderRadius={5} p={2} mb={3} m={3}>
                                                <Typography fontWeight={'bold'}>مشخصات پرداخت</Typography>
                                                <hr />
                                                {
                                                    data.toPay.map((p: any) => {
                                                        return (
                                                            <Box>
                                                                <Box className="text-center w-full"> authority :</Box>
                                                                <Typography fontSize={12}> {p.authority} </Typography>
                                                                <Box className="text-center w-full"> trans_id :</Box>
                                                                <Typography fontSize={12}> {p.trans_id} </Typography>
                                                                <Box className="text-center w-full"> invoice :</Box>
                                                                <Typography fontSize={12}> {p.invoice} </Typography>
                                                                <Box className="text-center w-full"> card_pan :</Box>
                                                                <Typography fontSize={12}> {p.card_pan} </Typography>
                                                                <Box className="text-center w-full"> payment_time :</Box>
                                                                <Typography fontSize={12}> {convertodate(timeConverter(p.payment_time))} </Typography>
                                                                <Box className="text-center w-full"> ref_id :</Box>
                                                                <Typography fontSize={12}> {p.ref_id} </Typography>
                                                                <Box className="text-center w-full"> staus :</Box>
                                                                <Typography fontSize={12}> {p.staus} </Typography>
                                                                <hr />

                                                            </Box>
                                                        )
                                                    })
                                                }

                                            </Box>

                                        </Grid>

                                    </Grid>

                                    <Button href="/Dashboard/Products/Invoices" variant="outlined"> Bakc to list</Button>

                                </Container>
                            }

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