
import Layout from "@/layouts/dashboardLayout"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import { Grid, FormControl, TextField, Autocomplete } from '@mui/material'
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
import Swal from "sweetalert2";
export default function ArticleGroup() {
    const [error, setError] = useState<any>(null);
    const [parent, setParent] = useState<any>('');
    const [parentnode, setParentnode] = useState<any>('');
    const [groups, setGroup] = useState<any>(null);

    const [article, setArticle] = useState<any>(null);
    const [namefilter, setNameFilter] = useState<any>('');
    const [codefilter, setCodeFilter] = useState<any>('');
    const [filterGroup, setFilterGroup] = useState<any>(null);

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
            name: 'Poroduts List',
        }
    ]
    let cookie = getCookies();
    const GotoParent = async (id: any) => {
        await setParent(id);
        LoadArticle(1, id);
    }

    const LoadArticle = (current: any, parent: any,group:any=null) => {
        console.log(parent);
        axios.get(`${config.url}/v1/dashboard/product?&page=${current}&name=${namefilter}&filterGroup=${group}&code=${codefilter}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            console.log(res.data);
            setArticle(res.data.message);
            setParentnode(res.data.parent)
        })
    }
    
    const LoadSearchCode = (current: any, parent: any) => {
        console.log(parent);
        axios.get(`${config.url}/v1/dashboard/product?&page=${current}&code=${namefilter}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            console.log(res.data);
            setArticle(res.data.message);
            setParentnode(res.data.parent)
        })
    }

    const LoadGroup = () => {
        axios.get(`${config.url}/v1/group/all`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            console.log(res.data);
            setGroup(res.data.message);
        })
    }

    const deleteItem = (id: String) => {
        Swal.fire({
            title: "از کا خود مطمئن هستید؟",
            text: "در صورت پاک کردن داده ها غیر قابل بازگشت است",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'خیر',
            confirmButtonText: "بله"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`${config.url}/v1/dashboard/product/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['token'],

                    }
                }).then(function (res) {
                    LoadArticle(1, parent);
                })
            }
        });


    }
    const ChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        LoadArticle(value, parent,filterGroup);

    }
    useEffect(() => {
        LoadArticle('1', '');
        LoadGroup();
    }, []);
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                <Refresh onClick={() => LoadArticle('1', parent)}></Refresh>

                {i18n.t('Products List')}
            </Typography>

            <Grid container>
                <Grid xs={12} md={4} pl={3}>
                    <FormControl fullWidth dir='lrt'>
                        {i18n.t('Search')}
                        <TextField
                            onChange={(e) => { setNameFilter(e.target.value) }}
                        ></TextField>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={4} pl={3}>
                    <FormControl fullWidth dir='ltr'>
                        {i18n.t('Code Search')}
                        <TextField
                            onChange={(e) => { setCodeFilter(e.target.value) }}
                        ></TextField>
                    </FormControl>
                </Grid>
                <Grid xs={4} md={2} pr={1} pl={1} pt={4} dir="rtl">
                    {
                        groups != null && <Autocomplete
                        options={groups} // Use the array as options
                        sx={{ width: 300 }}
                        getOptionLabel={(option: any) => option.name} // Map options to display their names
                        onChange={(event, value) => {
                                if(value==null){
                                    setFilterGroup(null);
                                    LoadArticle('1', '',null);
                                }else{
                                    setFilterGroup(value.id);
                                    LoadArticle('1', '',value.id);

                                }
                            console.log(value); // `value` is the selected option
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="گروه" variant="outlined" />
                        )}
                    />

                    }


                </Grid>


            </Grid>
            <Grid container mt={5}>
               
                <Grid xs={6} md={2} pr={1} pl={1} pt={4}>
                    <Button onClick={(e) => { LoadArticle(1, parent,filterGroup) }} className={styles.btnupload} style={{ height: 50, backgroundColor: '#444' }} variant="contained" >
                        <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('جستجو')}
                    </Button>
                </Grid>
                <Grid xs={6} md={2} pr={1} pl={1} pt={4} >
                    <Link href={`/Dashboard/Products/Items/new`}>
                        <Button className={styles.btnupload} style={{ height: 50 }} variant="contained" >
                            {i18n.t('New')}  <img className={styles.m1} height={20} src="/assets/plus.svg"></img>
                        </Button>
                    </Link>
                </Grid>
                <Grid xs={6} md={2} pr={1} pl={1} pt={4} >
                    <Link href={`/Dashboard/Products/Items/newfromdb`}>
                        <Button className={styles.btnupload} style={{ height: 50 }} variant="contained" >
                            {i18n.t('New DB')}  <img className={styles.m1} height={20} src="/assets/plus.svg"></img>
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
                                    <TableCell align="right">{i18n.t('code')}</TableCell>

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
                                            {row.Code}
                                            
                                        </TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box textAlign={'center'}>{row.togroup.name}</Box>
                                            <Box textAlign={'center'} fontSize={12} >{row.togroup.ToSub!=null && row.togroup.ToSub.name}</Box>
                                            <Box textAlign={'center'} fontSize={12} >{row.togroup.ToSub!=null && row.togroup.ToSub.ToSub!=null && row.togroup.ToSub.name }</Box>

                                        </TableCell>

                                        <TableCell align="right">
                                            <Link href={`/Dashboard/Products/Items/${row.id}`}>
                                                <img className={styles.m1} src="/assets/insert.svg"></img>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
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