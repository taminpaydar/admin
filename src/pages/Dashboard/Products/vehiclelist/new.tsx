import Layout from "@/layouts/dashboardLayout"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Grid } from '@mui/material'
import { Container, TextField, Button, Snackbar, Alert, Autocomplete } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import i18n from "i18n";
import changeUrl from "@/hoc/changeurl";
import React, { useState, useEffect } from 'react';

import styles from '@/app/template.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getCookies } from "cookies-next";
import { config } from "@/config";
import ErrorDB from "@/components/ErrorDb";
import { useRouter } from "next/router";

type Inputs = {
    name: String,
    url: String,
    companies: any,
    parent: any
};

export default function newArticleGroup() {
    const router = useRouter()


    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);
    const [companies, setList] = useState<any>(null);

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<Inputs>({
        name: '',
        url: '',
        parent: '',
        companies: null

    });
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ss => {
        data.parent = router.query.parent;
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/vehicle',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            router.push('/Dashboard/Products/vehiclelist/' + res.data.data.id)
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    };

    function ChangeData(e: String) {
        setData({
            name: e,
            url: changeUrl(e),
            parent: data.parent,
            companies: data.companies
        })
    }
    function ChaneAuto(e: any) {
        setData({
            name: e,
            url: data.url,
            parent: data.parent,
            companies: e
        })
    }
    function ChangeDataUrl(e: String) {
        setData({
            name: data.name,
            url: changeUrl(e),
            parent: data.parent,
            companies: data.companies

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
            name: 'Products Group',
            url: '/Dashboard/Products/Groups'
        },
        {
            name: 'New Vehicle',
        }

    ]
    const loadcomapny = async () => {
        let res: any = await axios({
            method: 'get',
            url: config.url + '/v1/dashboard/company/all',
            data: data,
            headers: {
                Authorization: 'Bearer ' + cookie['token'],
            }

        });
        setList(res.data.message);
    }
    useEffect(() => {
        loadcomapny();
    }, []);
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>{i18n.t('New Vehicle')}</Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container>

                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('Name')} </Typography>
                        <TextField dir='rtl'
                            onChange={(e) => ChangeData(e.target.value)}
                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>{i18n.t('URL')} </Typography>
                        <TextField
                            value={data.url}

                            onChange={(e) => ChangeDataUrl(e.target.value)}
                            dir='rtl' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid xs={12} md={12} p={1}>
                        <Typography m={1}>{i18n.t('Company')} </Typography>

                        {companies != null &&
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={companies}
                                onChange={(event, newValue) => {
                                    setData({ ...data, companies: newValue })
                                  }}
                               // onChange={((e)=>setData(...data,config:e.target.value))}
                                // onChange={(e:any) => setData({ ...data, companies: e.target.value })}
                                getOptionLabel={(option: any) => option.name}

                                renderInput={(params) => (
                                    <Box dir="rtl" width={'100%'}>
                                        <TextField

                                            {...params}
                                            style={{ textAlign: 'right' }}
                                            variant="standard"
                                            label="انتخاب خودرو"
                                            placeholder=""
                                        />
                                    </Box>
                                )}
                            />
                        }
                    </Grid>
                    <Grid xs={12} md={3} p={1}>

                        <Container >
                            <Button type="submit" className={styles.buttonblack} variant="contained" >
                                <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Save')}
                            </Button>
                        </Container>
                    </Grid>

                </Grid>
            </form>

            {error != null && <ErrorDB key={key} err={error} />}
        </Container>

    </Layout>
}