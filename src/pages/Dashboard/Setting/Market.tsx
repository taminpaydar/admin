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

            name: 'Market Setting',

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
                url: config.url + '/v1/dashboard/marketseting',
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

        axios.get(`${config.url}/v1/dashboard/marketseting`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setConfig(res.data.message);
        })

    }, []);

    return (

        <Layout>
            <Container dir='rtl'  sx={{ background:'#fff',padding:'30px',borderRadius:'20px'}}>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Market Setting')}</Typography>

                {
                    setting != null &&
                    <Grid 
                   
                    container>

                        <Grid xs={12} md={12}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('متن SMS خوش آمدید')} </Typography>
                                        <TextField dir='rtl'
                                            multiline
                                            rows={8}
                                            defaultValue={setting.loginsms}
                                            onChange={(e) => setConfig({ ...setting, loginsms: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                        <Typography fontSize={14} dir="ltr">[code]</Typography>

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('متن SMS تایید فاکتور')} </Typography>
                                        <TextField dir='rtl'
                                            multiline
                                            rows={8}
                                            defaultValue={setting.invoicesms}
                                            onChange={(e) => setConfig({ ...setting, invoicesms: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                        <Typography fontSize={14} dir="ltr">[invoicenumber]  [price]</Typography>

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('متن SMS تایید پرداخت')} </Typography>
                                        <TextField dir='rtl'
                                            multiline
                                            rows={8}
                                            defaultValue={setting.paysms}
                                            onChange={(e) => setConfig({ ...setting, paysms: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                        <Typography fontSize={14} dir="ltr">[invoicenumber] [date] [price]</Typography>
                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('متن SMS هدیه خرید اول')} </Typography>
                                        <TextField dir='rtl'
                                            multiline
                                            rows={8}
                                            defaultValue={setting.giftsms}
                                            onChange={(e) => setConfig({ ...setting, giftsms: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                        <Typography fontSize={14} dir="ltr"> [code] [name] [lastname] [percent]  [expiredate]  </Typography>
                                    </Grid>
                                
                                    <Grid xs={12} md={3} p={1}>
                                        <Typography m={1}>{i18n.t(' درصد مالیات')} </Typography>
                                        <TextField dir='rtl'
                                            type="number"
                                            defaultValue={setting.tax}
                                            onChange={(e) => setConfig({ ...setting, tax: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={3} p={1}>
                                        <Typography m={1}>{i18n.t('درصد هدیه خرید اول')} </Typography>
                                        <TextField dir='rtl'
                                            type="number"
                                            defaultValue={setting.percent}
                                            onChange={(e) => setConfig({ ...setting, percent: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={3} p={1}>
                                        <Typography m={1}>{i18n.t('روز هدیه خرید اول')} </Typography>
                                        <TextField dir='rtl'
                                            type="number"
                                            defaultValue={setting.giftday}
                                            onChange={(e) => setConfig({ ...setting, giftday: e.target.value })}
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>

                                    <Grid xs={12} md={3} p={1}>
                                        <Typography m={1}>{i18n.t('ایمیل ادمین')} </Typography>
                                        <TextField dir='ltr'
                                            type="email"
                                            defaultValue={setting.emailconfirm}
                                            onChange={(e) => setConfig({ ...setting, emailconfirm: e.target.value })}
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
