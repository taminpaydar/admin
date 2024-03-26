import Layout from "@/layouts/dashboardLayout"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import Typography from '@mui/material/Typography';
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Grid, Card, CardMedia, CardContent, Box, TextField, Button } from "@mui/material";
import { AddNewCard } from "@/components/Dashboard/cardThumpnailGroup";
import { ButtonsSetting } from './index'
import { getCookies } from "cookies-next";
import React, { useState, useEffect } from 'react';
import { config } from "@/config"
import axios from "axios"
import AdvancedEditor from "@/components/AdavncedEditor/TissEditor";

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

            name: 'social',

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
                url: config.url + '/v1/dashboard/social',
                data: setting,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;

            setKey(key + 1);
            setMessage(i18n.t('sucess'))

            return mydata;
        } catch (error: any) {

        }

    };

    useEffect(() => {

        axios.get(`${config.url}/v1/dashboard/social`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setConfig(res.data.message);
        })

    }, []);

    return (

        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Social Networks')}</Typography>

                {
                    setting != null &&
                    <Grid container>

                        <Grid xs={12} md={12}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('telegram')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.telegram}
                                            onChange={(e) => setConfig({ ...setting, telegram: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('facebook')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.facebook}
                                            onChange={(e) => setConfig({ ...setting, facebook: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('twitter')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.twitter}
                                            onChange={(e) => setConfig({ ...setting, twitter: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('blog')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.blog}
                                            onChange={(e) => setConfig({ ...setting, blog: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('instgram')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.instgram}
                                            onChange={(e) => setConfig({ ...setting, instgram: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('whatsapp')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.whatsapp}
                                            onChange={(e) => setConfig({ ...setting, whatsapp: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('youtube')} </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.youtube}
                                            onChange={(e) => setConfig({ ...setting, youtube: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('aparat')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.aparat}
                                            onChange={(e) => setConfig({ ...setting, aparat: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('signal')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.signal}
                                            onChange={(e) => setConfig({ ...setting, signal: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('eitaa')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.eitaa}
                                            onChange={(e) => setConfig({ ...setting, eitaa: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('gap')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.gap}
                                            onChange={(e) => setConfig({ ...setting, gap: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('bale')}  </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={setting.bale}
                                            onChange={(e) => setConfig({ ...setting, bale: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>

                                        <Container >
                                            <Button type="submit" className={styles.buttonblack} variant="contained" >
                                                <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Save')}
                                            </Button>
                                        </Container>
                                    </Grid>
                                </Grid>
                                <hr />


                            </form>
                        </Grid>
                        <Grid xs={12} md={12}>

                            {showmessage != null && <MessageBox key={key} Message={showmessage}></MessageBox>}
                        </Grid>

                    </Grid>

                }

                {ButtonsSetting()}

            </Container>

        </Layout>
    );
}
