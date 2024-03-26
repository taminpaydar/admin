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

            name: 'Contact us',

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
                url: config.url + '/v1/dashboard/contactus',
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

        axios.get(`${config.url}/v1/dashboard/contactus`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setConfig(res.data.message);
        })

    }, []);

    return (

        <Layout>
            <Container dir='ltr'>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Contact Us')}</Typography>

                {
                    setting != null &&
                    <Grid container>

                        <Grid xs={12} md={12}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container>
                                    <Grid xs={6} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('phone')} 1 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.phone1}
                                            onChange={(e) => setConfig({ ...setting, phone1: e.target.value })}
                                            placeholder='number'
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='rtl'
                                            defaultValue={setting.tphone1}
                                            onChange={(e) => setConfig({ ...setting, tphone1: e.target.value })}
                                            placeholder='title'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('phone')} 2 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.phone2}
                                            placeholder='phone number'
                                            onChange={(e) => setConfig({ ...setting, phone2: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='rtl'
                                            defaultValue={setting.tphone2}
                                            placeholder='title'

                                            onChange={(e) => setConfig({ ...setting, tphone2: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('phone')} 3 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.phone3}
                                            onChange={(e) => setConfig({ ...setting, phone3: e.target.value })}
                                            placeholder='phone number'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='rtl'
                                            defaultValue={setting.tphone3}
                                            onChange={(e) => setConfig({ ...setting, tphone3: e.target.value })}
                                            placeholder='title'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('phone')} 4 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.phone4}
                                            onChange={(e) => setConfig({ ...setting, phone4: e.target.value })}
                                            placeholder='phone number'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='rtl'
                                            defaultValue={setting.tphone4}
                                            onChange={(e) => setConfig({ ...setting, tphone4: e.target.value })}
                                            placeholder='title'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12}>
                                        <hr ></hr>
                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('mobile')} 1 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.mobile1}
                                            onChange={(e) => setConfig({ ...setting, mobile1: e.target.value })}
                                            placeholder='phone number'
                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='ltr'
                                            defaultValue={setting.tmobile1}
                                            onChange={(e) => setConfig({ ...setting, tmobile1: e.target.value })}
                                            placeholder='title'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>

                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('mobile')} 2 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.mobile2}
                                            onChange={(e) => setConfig({ ...setting, mobile2: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='rtl'
                                            defaultValue={setting.tmobile2}
                                            onChange={(e) => setConfig({ ...setting, tmobile2: e.target.value })}
                                            placeholder='title'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>

                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('mobile')} 3 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.mobile3}
                                            onChange={(e) => setConfig({ ...setting, mobile3: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={6} md={6} p={1} pt={6}>

                                        <TextField dir='ltr'
                                            defaultValue={setting.tmobile3}
                                            onChange={(e) => setConfig({ ...setting, tmobile3: e.target.value })}
                                            placeholder='title'

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1} pt={6}>
                                        <hr ></hr>
                                        </Grid>
                                  


                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('email')}  </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.email}
                                            onChange={(e) => setConfig({ ...setting, email: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={6} p={1}>
                                        <Typography m={1}>{i18n.t('email')}  2 </Typography>
                                        <TextField dir='ltr'
                                            defaultValue={setting.fax}
                                            onChange={(e) => setConfig({ ...setting, fax: e.target.value })}

                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('address')} 1 </Typography>
                                        <TextField
                                            defaultValue={setting.address1}
                                            onChange={(e) => setConfig({ ...setting, address1: e.target.value })}
                                            rows={4}
                                            maxRows={4}
                                            multiline
                                            className={styles.myformtextfield}
                                            fullWidth id="outlined-basic"
                                            variant="outlined" />

                                    </Grid>
                                    <Grid xs={12} md={12} p={1}>
                                        <Typography m={1}>{i18n.t('address')} 2 </Typography>
                                        <TextField 
                                            defaultValue={setting.address2}
                                            onChange={(e) => setConfig({ ...setting, address2: e.target.value })}
                                            rows={4}
                                            maxRows={4}
                                            multiline
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
                                <hr />

                                <AdvancedEditor parent={setting.id}></AdvancedEditor>

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
