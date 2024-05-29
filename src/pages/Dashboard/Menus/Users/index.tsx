import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { menuitem } from '@/utils/TopMenuItems';
import { Container, Grid, Card, CardMedia, CardContent, Box, Typography, Link, Stack, Pagination, TextField, Select, MenuItem, Button } from "@mui/material";
import i18n from 'i18n';
import React, { useState, useEffect } from 'react';
import { config } from "@/config"
import axios from "axios";
import { getCookies } from "cookies-next";

export default function UserManager() {
    const [page, setPage] = useState<any>(1);
    const [list, setUserlist] = useState<any>(null);
    const [phone, setPhone] = useState<any>('');
    const [name, setName] = useState<any>('');
    const [rule, setRule] = useState<any>('');

    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Others',
            url: '/Dashboard/Menus'
        },
        {
            name: 'Users',
        }
    ]
    let cookie = getCookies();

    function loadUsers(page: any) {
        setPage(page);

        axios.get(`${config.url}/v1/dashboard/users?page=${page}&phone=${phone}&name=${name}&rule=${rule}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setUserlist(res.data.message);
        })
    }
    const ChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        loadUsers(value);

    }
    useEffect(() => {
        loadUsers('1');
    }, []);
    return (
        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'20px'} mt={4} mb={3} fontWeight={'bold'}>

                    {i18n.t('User Manager')}
                </Typography>
                <hr />
                <Box>
                    <Box bgcolor={'lgihtblue'} p={3} mt={3} borderBottom={'solid 1px #333'} borderRadius={'14px'} >
                        <Grid container>
                            <Grid xs={12} md={4} p={1}>
                                <Box>
                                    <Typography fontSize={13}>نام کاربر</Typography>
                                    <Box mt={2}>
                                        <TextField
                                        onChange={(e)=>{setName(e.target.value)}}
                                        size="small" fullWidth placeholder="جستجو"></TextField>

                                    </Box>
                                </Box>
                            </Grid>
                            <Grid xs={12} md={4} p={1} >
                                <Box>
                                    <Typography fontSize={13}>شماره همراه</Typography>
                                    <Box mt={2}>
                                        <TextField size="small" onChange={(e)=>{setPhone(e.target.value)}} dir="ltr" fullWidth placeholder="09XXXXXXXX"></TextField>

                                    </Box>
                                </Box>
                            </Grid>
                            <Grid xs={12} md={2} p={1}>
                                <Box>
                                    <Typography fontSize={13}>نوع کاربری</Typography>
                                    <Box mt={2}>
                                        <Select
                                        onChange={(e)=>{
                                            setRule(e.target.value);
                                        }}
                                        size="small" fullWidth dir="rtl">
                                            <MenuItem value={''} dir="rtl">همه</MenuItem>
                                            <MenuItem value={1} dir="rtl">ادمین</MenuItem>
                                            <MenuItem value={2} dir="rtl">کاربر عادی</MenuItem>
                                            <MenuItem value={3} dir="rtl">کاربر نمایندگی</MenuItem>
                                            <MenuItem value={4} dir="rtl">فروشنده</MenuItem>

                                        </Select>

                                    </Box>
                                </Box>
                            </Grid>
                            <Grid xs={12} md={2} p={1}>
                                <Box pt={4}>
                                    <Button onClick={(e)=>{loadUsers(1)}} size={`large`} variant="contained" >جستجو</Button>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box>
                    {list!=null && 
                     <Box mt={3}>
                            <Typography fontSize={12}>  تعداد کاربران : {list.totalDocs}</Typography>
                     </Box>
                    }
                    {list != null && list.docs.map((row: any) => (

                        <Box bgcolor={'#eee'} p={3} mt={3} borderBottom={'solid 1px #333'} borderRadius={'14px'}>
                           
                            <Grid container dir="rtl">
                                <Grid xs={12} sm={3}>
                                    <Typography color={'green'} fontSize={10}>نام کاربری</Typography>
                                    <Typography fontSize={14}> {row.email}</Typography>
                                </Grid>
                                <Grid xs={12} sm={3}>
                                    <Typography color={'green'} fontSize={10}>نام کاربر</Typography>

                                    <Typography fontSize={14}> {`${row.name!=undefined ? row.name  : '' }  ${row.lastname!=undefined ? row.lastname  : '' } `}</Typography>
                                </Grid>
                                <Grid xs={12} sm={2}>
                                    <Typography color={'green'} fontSize={10}>شماره همراه</Typography>
                                    <Typography fontSize={14}> {row.mobile}</Typography>
                                </Grid>


                                <Grid xs={12} sm={2}>
                                    <Typography color={'green'} fontSize={10}>نوع کاربری</Typography>
                                    <Typography fontSize={14}>
                                        {row.usertype == 1 && 'ادمین'}
                                        {row.usertype == 2 && 'کاربر معمولی'}
                                        {row.usertype == 3 && 'کاربر نمایندگی'}
                                        {row.usertype == 4 && 'فروشنده'}
                                    </Typography>
                                </Grid>
                                <Grid xs={12} sm={2}>
                                    <Typography fontSize={14}>
                                        <a href={`/Dashboard/Menus/Users/${row.id}`}>
                                            <img src="/assets/components/edit.svg" width={20}></img>
                                        </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                    ))}
                    {list != null &&
                        <Box dir="ltr">
                            <Stack spacing={2} dir='rtl' mt={5} alignContent={'center'}>
                                <Pagination
                                    onChange={ChangePage}
                                    count={list.totalPages}  defaultPage={list.page} siblingCount={0} boundaryCount={2} />
                            </Stack>
                        </Box>
                    }

                </Box>
            </Container>
        </Layout>

    )
}