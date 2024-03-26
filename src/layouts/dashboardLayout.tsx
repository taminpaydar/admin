import { Container, Box, AppBar, Toolbar, Stack } from "@mui/material"
import '../app/globals.css'
import styles from '../app/template.module.scss'

import AccountMenu from "@/utils/topmenux";
import NotifyCom from "@/utils/notify";
import React, { useState, useEffect } from 'react';
import HeaderProfile from "@/utils/headerprofile";
import  { checkLogin,infoUser}  from "../hoc/checkUser";
import { getCookies } from "cookies-next";
import axios from "axios";
import Head from "next/head";
import SwipeableTemporaryDrawer from "@/utils/CanvasMenu";
import { config } from "@/config";
export default function dashboardLayout({ children }: {
    children: React.ReactNode
}) {
    const [userinfo, setUserinfo] =  useState<any>(null);
    let cookie =getCookies();
    //checkLogin();


    useEffect(() => {
           axios.get(`${config.url}/v1/Auth/profile`,{
              headers:{
                  Authorization:'Bearer '+cookie['token'] ,
      
              }
          }).then(function(res){
            setUserinfo(res.data.message);
          })
 
    }, []);
    return <Box className={styles.backgroundcolor} >

        <Box dir='rtl'>
            <Head>
                <title>TISS ENGINE 2.2</title>
                <link rel="icon"  type="image/png" href="/oranglogo.png" />

            </Head>
            <AppBar color={'inherit'}>
                <Toolbar>

                    <Box sx={{
                        display: { xs: 'none', md: 'inline-flex' }
                    }}>
                        <Stack direction="row" spacing={2}>
                           {userinfo!=null &&   <HeaderProfile data={userinfo}> </HeaderProfile> }
                            <NotifyCom></NotifyCom>

                        </Stack>
                    </Box>
                    <Box
                        width={'60%'} sx={{
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <AccountMenu></AccountMenu>

                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'block', md: 'none' }
                        }}
                    >
                        <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
                    </Box>
                    <Box

                        p={1}
                        justifyItems={'flex-start'}

                        sx={{ flexGrow: 0, float: 'right' }}>
                        <img className={styles.logologin}
                            src='/assets/logo.svg'
                            width={'200px'}

                            alt='Tiss Engine'
                            loading="lazy"
                        />
                    </Box>

                </Toolbar>

            </AppBar>

        </Box>
        <Box  mt={12} dir="rtl">
            {children}
        </Box>

    </Box>
}