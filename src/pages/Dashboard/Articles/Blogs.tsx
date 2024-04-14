
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
import { Refresh,DeleteForever } from "@mui/icons-material";
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

export default function ArticleGroup() {
    const [error, setError] = useState<any>(null);
    const [groups, setGroups] = useState<any>(null);
    const [article, setArticle] = useState<any>(null);
    const [groupfilter, setGoupFilter] = useState<any>('');
    const [namefilter, setNameFilter] = useState<any>('');

    const [page, setPage] = useState<any>(1);

    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Articles',
            url: '/Dashboard/Articles'
        },
        {
            name: 'Articles',
        }
    ]
    let cookie = getCookies();
    const LoadGroup = () => {
        axios.get(`${config.url}/v1/dashboard/bloggroup/all`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setGroups(res.data.message);
        })
    }
    const LoadArticle = (current: any) => {
       // alert(`${config.url}/v1/dashboard/blog?page=${current}&group=${groupfilter}&name=${namefilter}`)
        console.log(current);
        axios.get(`${config.url}/v1/dashboard/blog?page=${current}&group=${groupfilter}&name=${namefilter}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setArticle(res.data.message);
        })
    }
    
    const deleteItem = (id:String) =>{
        axios.delete(`${config.url}/v1/dashboard/blog/${id}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            LoadArticle(page);
        })

    }
    const ChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value);
        setPage(value);
        LoadArticle(value);

    }
    useEffect(() => {
        LoadGroup();
        LoadArticle('1');
    }, []);
    return <Layout>
        <Container sx={{ background:'#fff',padding:'30px',borderRadius:'20px'}}>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                <Refresh onClick={() => LoadGroup()}></Refresh>

                {i18n.t('Articles')}
            </Typography>
            {
                groups != null &&
                <Grid container>
                    <Grid xs={12} md={5} pl={3}>
                        <FormControl fullWidth dir='lrt'>
                            <InputLabel id="demo-simple-select-label">{i18n.t('Search')} </InputLabel>
                            <TextField
                                onChange={(e) => { setNameFilter(e.target.value) }}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={3}>
                        <FormControl fullWidth dir='rtl'>
                            <InputLabel id="demo-simple-select-label">{i18n.t('Group')} </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Group"
                                onChange={(e) => { setGoupFilter(e.target.value) }}

                            >
                                <MenuItem value={''} >{i18n.t('All')}</MenuItem>
                                {groups.map((item: any) => {
                                    return <MenuItem value={item.id}>{item.name}</MenuItem>

                                })}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={6} md={2} pr={1} pl={1}>
                        <Button onClick={(e) => { LoadArticle(1) }} className={styles.btnupload} style={{ height: 50, backgroundColor: '#444' }} variant="contained" >
                            <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Search')}
                        </Button>
                    </Grid>
                    <Grid xs={6} md={2} pr={1} pl={1} >
                        <Link href="/Dashboard/Articles/Article/new">
                            <Button className={styles.btnupload} style={{ height: 50 }} variant="contained" >
                                {i18n.t('New')}  <img className={styles.m1} height={20} src="/assets/plus.svg"></img>
                            </Button>
                        </Link>

                    </Grid>
                </Grid>
            }

            <Box mt={4}>

                {
                    article != null &&

                    <TableContainer component={Paper} dir={'rtl'}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{i18n.t('name')}</TableCell>
                                    <TableCell align="right">{i18n.t('group')}</TableCell>
                                    <TableCell align="right">{i18n.t('edit')}</TableCell>
                                    <TableCell align="right">{i18n.t('delete')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {article.docs.map((row: any) => (
                                    <TableRow

                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right" component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.togroup.name}</TableCell>
                                        <TableCell align="right">
                                            <Link href={`/Dashboard/Articles/Article/Edit/${row.id}`}>
                                                <img className={styles.m1} src="/assets/insert.svg"></img>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box onClick={(e)=>{deleteItem(row.id)}}>
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