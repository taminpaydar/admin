import Layout from "@/layouts/dashboardLayout"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import Typography from '@mui/material/Typography';
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Grid, Card, CardMedia, CardContent, Box, TextField, Button } from "@mui/material";
import { AddNewCard } from "@/components/Dashboard/cardThumpnailGroup";
import { ButtonsSetting } from '../index'
import { getCookies } from "cookies-next";
import React, { useState, useEffect } from 'react';
import { config } from "@/config"
import axios from "axios"
import styles from '@/app/template.module.scss'
import { Settings } from "@mui/icons-material";
import FileManagerSingle from "@/components/ImageManager/SingleFileManager";
import { useForm, SubmitHandler } from "react-hook-form";
import MessageBox from "@/components/MessageBox";
export default function Aritlcemanager() {
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            url: '/Dashboard/Setting',

            name: 'Settings',

        },
        {

            name: 'General',

        },
    ];
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();

    let cookie = getCookies();
    const [setting, setConfig] = useState<any>(null);
    const [showmessage, setMessage] = useState<any>(null);
    const [key, setKey] = useState<number>(0);

    const onSubmit: SubmitHandler<any> = async ss => {
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/setting',
                data: setting,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
      
           setKey(key+1);
            setMessage(i18n.t('sucess'))
        
            return mydata;
        } catch (error: any) {

        }

    };

    useEffect(() => {

        axios.get(`${config.url}/v1/dashboard/setting`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setConfig(res.data.message);
        })

    }, []);

    return (

        <Layout>
            <Container >
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('General')}</Typography>

                {
                    setting != null &&
                    <Grid container>

                        <Grid xs={12} md={9}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('websitename')} </Typography>
                                        <TextField 
                                            defaultValue={setting.websitename}
                                            onChange={(e) => setConfig({ ...setting, websitename: e.target.value })}
                                            dir="rtl"
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('title')} </Typography>
                                        <TextField 
                                            defaultValue={setting.title}
                                            onChange={(e) => setConfig({ ...setting, title: e.target.value })}
                                            dir="rtl"
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('keywords')} </Typography>
                                        <TextField 
                                            defaultValue={setting.keywords}
                                            onChange={(e) => setConfig({ ...setting, keywords: e.target.value })}
                                            rows={4}
                                            maxRows={4}
                                            multiline
                                            dir="rtl"
                                            className={styles.myformtextfield}
                                            fullWidth id="outlined-basic"
                                            variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('description')} </Typography>
                                        <TextField 
                                            defaultValue={setting.description}
                                            onChange={(e) => setConfig({ ...setting, description: e.target.value })}
                                            rows={4}
                                            maxRows={4}
                                            multiline
                                            dir="rtl"
                                            className={styles.myformtextfield}
                                            fullWidth id="outlined-basic"
                                            variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('footertext')} </Typography>
                                        <TextField 
                                            defaultValue={setting.footertext}
                                            onChange={(e) => setConfig({ ...setting, footertext: e.target.value })}
                                            rows={4}
                                            maxRows={4}
                                            multiline
                                            dir="rtl"
                                            className={styles.myformtextfield}
                                            fullWidth id="outlined-basic"
                                            variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>

                                        <Container >
                                            <Button type="submit" className={styles.buttonblack} variant="contained" >
                                                <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Save')}
                                            </Button>
                                        </Container>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid xs={12} md={3}>
                            <Typography m={1}>{i18n.t('logo')} </Typography>

                            <FileManagerSingle
                                parent={setting._id}
                                component="settings"
                                insermode={false}
                            ></FileManagerSingle>
                            {showmessage!=null && <MessageBox  key={key}  Message={showmessage}></MessageBox>}
                        </Grid>

                    </Grid>

                }

                {ButtonsSetting()}

            </Container>

        </Layout>
    );
}
