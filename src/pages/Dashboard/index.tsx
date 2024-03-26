import Layout from "@/layouts/dashboardLayout"
import { Container, Grid, Typography } from "@mui/material"
import { BreadcrumbCom } from "@/components/BreadCrumpCom"
import { PrfileFirstPage } from "@/utils/ProfileFirstPage"
import { Box } from "@mui/material"
import { BoxDashboard } from "@/utils/StyleDashboars"
import DashboardDays from "@/utils/dashboarddayes"
import ConstractThumpnail from "@/components/Dashboard/contractsThumpnail"
import RememberThumpnail from "@/components/Dashboard/rememberThumpnail"
import React, { useState, useEffect } from 'react';
import { getCookies } from "cookies-next";
import axios from "axios"
import { config } from "@/config"
import { menuitem } from '@/utils/TopMenuItems';

import i18n from "i18n"
import { Stack } from "@mui/system"
export default function dashboardPage() {
    const [userinfo, setUserinfo] = useState<any>(null);
    const [listMarket, setMarketlist] = useState<any>(null);

    let cookie = getCookies();

    useEffect(() => {

        axios.get(`${config.url}/v1/Auth/profile`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setUserinfo(res.data.message);
        })
  
    }, []);
    return (
        <Layout>
            <Container>

                <Container>
                    <Grid container     dir="rtl">
                        <Grid xs={12}>
                            <BreadcrumbCom
                        
                                data={[
                                    {
                                        name: 'User Portal',
                                        url: '/Dashboard'
                                    },
                                    {
                                        name: 'home',
                                        url: null

                                    },

                                ]}
                            ></BreadcrumbCom>
                            {userinfo != null &&
                                <Typography textAlign={'left'} fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>👋  Welcome to Dashboard </Typography>

                            }
                        </Grid>
                        <Grid md={4} xs={12} pr={6} >
                            <Box sx={BoxDashboard}>
                                {userinfo != null &&
                                    <PrfileFirstPage data={userinfo}></PrfileFirstPage>
                                }
                            </Box>


                        </Grid>
                        <Grid md={8} xs={12} pr={2} >
                           
                           
                      
                            <Grid xs={12}>
                                <Grid container mt={2}>
                                    <Grid  md={6}>
                                        <Typography
                                          
                                        >Dashboard</Typography>
                                    </Grid>
                               
                                </Grid>
                            </Grid>
                            <Grid xs={12}>
                                <Grid container>
                                    {menuitem.map((item: any) => {


                                         return(
                                            item.show==true ?    <Grid xs={12} md={6} p={1}>

                                                <RememberThumpnail data={item}></RememberThumpnail>
        
                                            </Grid> : <></>
                                            )
                                    })}
                                   
                                </Grid>

                            </Grid>
                        </Grid>





                    </Grid>
                </Container>

            </Container>
        </Layout>
    )
}