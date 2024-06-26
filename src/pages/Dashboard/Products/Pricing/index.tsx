
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
var fileDownload = require('js-file-download');

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
            name: 'Poroduts List',
        }
    ]
    let cookie = getCookies();
    const GotoParent = async (id: any) => {
        await setParent(id);
        LoadArticle(1, id);
    }

    const LoadArticle = (current: any, parent: any) => {
        console.log(parent);
        axios.get(`${config.url}/v1/dashboard/product?&page=${current}&name=${namefilter}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            console.log(res.data);
            setArticle(res.data.message);
            setParentnode(res.data.parent)
        })
    }
    const exportexcel = () => {
        axios({
            method: 'GET',
            url: `${config.url}/v1/dashboard/exportexcel`,
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            },
            responseType: 'blob',

        }).then(function (res) {
            console.log(res);
            fileDownload(res.data, 'filename.xlsx');

            // const filePath = fs.createWriteStream('./download/');
            // res.data.pipe(filePath);
            // filePath.on('finish', () => {
            //   filePath.close();
            //   console.log('File downloaded successfully.');
            // });

        })
    }
    const deleteItem = (id: String) => {
        axios.delete(`${config.url}/v1/dashboard/product/${id}`, {
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
    useEffect(() => {
        LoadArticle('1', '');
    }, []);
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                <Refresh onClick={() => LoadArticle('1', parent)}></Refresh>

                {i18n.t('Products List')}
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
                        <img className={styles.m1} src="/assets/successicon.svg"></img>
                        {i18n.t('Search')}
                    </Button>
                </Grid>
                <Grid xs={6} md={2} pr={1} pl={1} >
                    <Link href={`/Dashboard/Products/Items/new`}>
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
                <Box mb={3}>
                    <Button variant={'contained'} color={'inherit'} onClick={(e) => {
                        exportexcel()
                    }}>
                        <img src="/assets/excel.svg" width={20}></img> خروجی Excel
                    </Button>
                    {/* <Button variant={'contained'} color={'inherit'}   href="/Dashboard/Products/Pricing/upload">
                <img src="/assets/excel.svg" width={20}></img> ورود Excel
                </Button> */}
                </Box>

                {
                    article != null &&

                    <TableContainer component={Paper} dir={'rtl'}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{i18n.t('name')}</TableCell>
                                    <TableCell align="right">{i18n.t('group')}</TableCell>

                                    <TableCell align="right">{i18n.t('main price')}</TableCell>
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
                                            <TextField disabled defaultValue={row.price}></TextField>
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                row.topricegroup.map((item: any) => {
                                                    return (
                                                        <Box mt={1}>
                                                            <Typography fontWeight={'bold'} fontSize={14}>{item.title}</Typography>
                                                            {
                                                                item.toprices.map((p: any) => {
                                                                    return (
                                                                        <Box mt={1} sx={{ display: 'flex' }}>
                                                                            <Box mr={1} ml={2}>
                                                                                <Typography>{p.title}</Typography>
                                                                            </Box>
                                                                            <TextField disabled size="small" defaultValue={p.price}></TextField>

                                                                        </Box>
                                                                    )
                                                                })
                                                            }


                                                        </Box>
                                                    )
                                                })
                                            }

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