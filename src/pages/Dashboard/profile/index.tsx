
import Layout from "@/layouts/dashboardLayout"
import { Container, Typography, Box, Paper, TextField, FormGroup, Button } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import i18n from 'i18n';
import React, { useState, useEffect } from 'react';
import { infoUser } from "@/hoc/checkUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { config } from "@/config";
import axios from "axios";
import { getCookies } from "cookies-next";
import ErrorDB from "@/components/ErrorDb";

export default function Editprofile() {
    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();
    const [error, setError] = useState<any>(null);

    const [data, setdata] = useState<any>(null);

    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },

        {

            name: 'Edit Profile',

        },
    ];
    const onSubmit: SubmitHandler<any> = async ss => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/auth/profile/current',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
          
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    };
    const loaduser = async () => {
        let user = await infoUser();
        setdata(user);
    }
    useEffect(() => {

        loaduser();

    }, []);
    return (
        <Layout >
            <Container dir='rtl'>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Edit Profile')}</Typography>
                <Box mt={3}>
                    <Paper>
                        {data != null &&
                            <Box p={4}>
                                            <form onSubmit={handleSubmit(onSubmit)} >

                                <Box mt={3}>
                                    <TextField
                                        onChange={(e) => setdata({ ...data, name: e.target.value })}

                                        fullWidth defaultValue={data.name} label={i18n.t('name')}></TextField>

                                </Box>
                                <Box mt={3}>
                                    <TextField
                                        onChange={(e) => setdata({ ...data, lastname: e.target.value })}

                                        fullWidth defaultValue={data.lastname} label={i18n.t('lastname')}></TextField>
                                </Box>
                                <Box mt={3}>

                                    <TextField
                                        onChange={(e) => setdata({ ...data, email: e.target.value })}
                                        type="email"
                                        fullWidth defaultValue={data.email} label={i18n.t('email')}></TextField>


                                </Box>
                                <Box textAlign={'center'} mt={4}>
                                    <Button type="submit" variant={'contained'} color={'info'}>{ i18n.t('Save Changes') }</Button>
                                </Box>

                                    </form>
                                    <Box textAlign={'center'} mt={1}>
                                    <Button type="submit" href="/Dashboard/profile/password" variant={'contained'} color={'error'}>{ i18n.t('Change Password') }</Button>
                                </Box>
                                    {error != null && <ErrorDB key={key} err={error} />}

                            </Box>
                        }
                    </Paper>

                </Box>

            </Container>
        </Layout>
    )
}