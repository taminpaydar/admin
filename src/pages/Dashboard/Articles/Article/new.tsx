

import Layout from "@/layouts/dashboardLayout"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, NativeSelect } from '@mui/material'
import { Container, TextField, Button, Snackbar, Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import i18n from "i18n";
import changeUrl from "@/hoc/changeurl";
import styles from '@/app/template.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getCookies } from "cookies-next";
import { config } from "@/config";
import ErrorDB from "@/components/ErrorDb";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';

type Inputs = {
    name: String,
    url: String,
    parent: any
};

export default function newArticleGroup() {
    const router = useRouter()


    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<Inputs>({
        name: '',
        url: '',
        parent: null

    });
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [groups, setGroups] = useState<any>(null);
    const [parent, setParent] = useState<any>('');

    const onSubmit: SubmitHandler<Inputs> = async ss => {
        data.parent = parent;
        console.log(data);
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/blog',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            router.push('/Dashboard/Articles/Article/Edit/' + res.data.data.id)
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
            parent: null
        })
    }
    function ChangeDataUrl(e: String) {
        setData({
            name: data.name,
            url: changeUrl(e),
            parent: null
        })
    }
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
            name: 'New Article',
        }

    ]
    const LoadGroup = () => {
        axios.get(`${config.url}/v1/dashboard/bloggroup/all`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setGroups(res.data.message);
        })
    }
    useEffect(() => {
        LoadGroup();

    }, []);
    return <Layout>
        <Container dir="rtl">
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>{i18n.t('New Article')}</Typography>
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
                    {
                        groups != null &&
                        <Grid xs={12} md={6} mt={4}>
                            <FormControl fullWidth dir='rtl'>
                                <InputLabel id="demo-simple-select-label">{i18n.t('Group')} </InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Group"
                                    onChange={(e) => { setParent(e.target.value) }}
                                >
                                    {groups.map((item: any) => {
                                        return item.tosub.length == 0 ? <option value={item.id}>{item.name}</option> : <>
                                            <option value={item.id}><strong>{item.name}</strong></option>
                                            {item.tosub.map((k: any) => {
                                                return k.tosub.length == 0 ? <option value={k.id}> 	&#8627;  {k.name}</option> : <>
                                                    <option value={k.id}> &#8627; {k.name}</option>
                                                    {k.tosub.map((e: any) => {
                                                        return <option value={e.id}>&#160; 	&#8627; {e.name}</option>
                                                    })}
                                                </>
                                            })}
                                        </>
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    <Grid xs={12} md={12} p={1}>

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