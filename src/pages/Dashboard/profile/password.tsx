
import Layout from "@/layouts/dashboardLayout"
import { Container, Typography, Box, Paper, TextField, FormGroup, Button } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import i18n from 'i18n';
import React, { useState, useEffect  } from 'react';
import { useRouter } from "next/router";
import { infoUser } from "@/hoc/checkUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { config } from "@/config";
import axios from "axios";
import { getCookies } from "cookies-next";
import ErrorDB from "@/components/ErrorValidation";
export default function Editprofile() {
    let cookie = getCookies();
    const [key, setKey] = useState<any>(0);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();
    const [error, setError] = useState<any>(null);
    const router = useRouter();

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
                method: 'post',
                url: config.url + '/v1/auth/profile/change',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            router.push('/Dashboard/profile')
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response.data);
            console.log(error.response.data);
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
                                            onChange={(e) => setdata({ ...data, password: e.target.value })}

                                            fullWidth label={i18n.t('new password')}></TextField>
                                    </Box>

                                    <Box textAlign={'center'} mt={1}>
                                        <Button type="submit" variant={'contained'} color={'primary'}>{i18n.t('save new password')}</Button>
                                    </Box>

                                </form>

                                <Box textAlign={'center'} mt={1}>
                                    <Button href="/Dashboard/profile" variant={'contained'} color={'primary'}>{i18n.t('bacto profile')}</Button>
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