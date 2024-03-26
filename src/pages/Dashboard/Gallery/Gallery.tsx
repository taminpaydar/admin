
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
            name: 'Gallery',
            url: '/Dashboard/Gallery'
        },
        {
            name: 'Gallery',
        }
    ]
    let cookie = getCookies();
   
    const LoadArticle = (current: any) => {
        console.log(current);
        axios.get(`${config.url}/v1/dashboard/gallery?page=${current}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setArticle(res.data.message);
        })
    }
    const deleteItem = (id:String) =>{
        axios.delete(`${config.url}/v1/dashboard/gallery/${id}`, {
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
        LoadArticle('1');
    }, []);
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>

                {i18n.t('Gallery')}
            </Typography>
         
                <Grid container>
               
                    
                    <Grid xs={6} md={2} pr={1} pl={1} >
                        <Link href="/Dashboard/Gallery/Gallery/new">
                            <Button className={styles.btnupload} style={{ height: 50 }} variant="contained" >
                                {i18n.t('New')}  <img className={styles.m1} height={20} src="/assets/plus.svg"></img>
                            </Button>
                        </Link>

                    </Grid>
                </Grid>
    

            <Box mt={4}>

                {
                    article != null &&

                    <TableContainer component={Paper} dir={'rtl'}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{i18n.t('name')}</TableCell>
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
                                        <TableCell align="right">
                                            <Link href={`/Dashboard/Gallery/Gallery/${row.id}`}>
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