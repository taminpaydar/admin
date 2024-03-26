import Layout from "@/layouts/dashboardLayout"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, MenuItem, Select } from '@mui/material'
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import i18n from "i18n";
import { useState } from "react";
import changeUrl from "@/hoc/changeurl";
import styles from '@/app/template.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getCookies } from "cookies-next";
import { config } from "@/config";
import ErrorDB from "@/components/ErrorDb";
import { useRouter } from "next/router";
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Swal from "sweetalert2";

type Inputs = {
    percent: any,
    suffex: any,
    mode: any,
    data: any,
    qty: any,
    expiredate: any

};

export default function newArticleGroup() {
    const router = useRouter()


    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<Inputs>({
        percent: null,
        suffex: null,
        qty: null,
        data: null,
        mode: null,
        expiredate: null

    });


    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ss => {
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/discountcode',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            router.push('/Dashboard/Products/Discount')
            return mydata;
        } catch (error: any) {
            Swal.fire('اطلاعات را کامل وارد نمایید')
        }

    };


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
            name: 'Discounts',
            url: '/Dashboard/Products/Discount'
        },
        {
            name: 'New',
        }

    ]
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>{i18n.t('ساخت کد تخفیف')}</Typography>

            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container>

                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>کارکتر شروع شونده</Typography>
                        <TextField dir='ltr'
                            onChange={(e) => setData({ ...data, suffex: e.target.value })}
                            placeholder="For Examaple: noroz"
                            className={styles.myformtextfield}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                        />

                    </Grid>
                    <Grid xs={12} md={4} p={1}>
                        <Typography m={1}>مدل تخفیف</Typography>
                        <Select
                            onChange={(e) => setData({ ...data, mode: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value={'percent'}>درصد</MenuItem>
                            <MenuItem value={'price'}>قیمت</MenuItem>

                        </Select>

                    </Grid>
                    <Grid xs={12} md={6} p={1}>
                        <Typography m={1}>مقدار تخفیف</Typography>
                        <TextField
                            onChange={(e) => setData({ ...data, data: e.target.value })}

                            dir='ltr'
                            type="number"
                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    
                    <Grid xs={12} md={4} p={1}>
                        <Typography textAlign={'right'}>تاریخ اعتبار</Typography>
                        <DatePicker
                            
                            calendar={persian}
                            locale={persian_fa}
                            onChange={(e: any) => setData({ ...data, expiredate: e.toUnix() })}
                            style={{
                                padding: '27px',
                                backgroundColor: 'transparent',

                            }}

                        ></DatePicker>
                    </Grid>
                    <Grid xs={12} md={12} p={1} textAlign={'center'}>

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