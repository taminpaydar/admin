
import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Box, Button, Container, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import i18n from 'i18n';
import { config } from "@/config";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { getCookies } from "cookies-next";
import cookie from "cookie";
import { useSearchParams } from 'next/navigation'
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useRef } from 'react'
import dynamic from "next/dynamic";



type Repo = any;
export default function EditGroup({ current }: any) {
    const [error, setError] = useState<any>(null);

    const [data, setData] = useState<any>(null);
    let cookie = getCookies();
    const [center, setCenter] = useState<any>({ lat: 35.7219, lng: 51.3347 })
    const ZOOM_LEVEL = 9
    const mapRef = useRef()

    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Others',
            url: '/Dashboard/Menus'
        },
        {
            name: 'Users',
            url: '/Dashboard/Menus/Users'
        },
        {
            name: 'Users',
        }
    ]
    const changelocation = (item: any) => {
        setData({ ...data, latlng: item })
    
    }
    function loadUsers() {
        axios.get(`${config.url}/v1/dashboard/address/${current}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setData(res.data.message);
        })
    }
    function save() {
        axios.put(`${config.url}/v1/dashboard/address/${current}`,
            data, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            Swal.fire('ذخیره سازی شد')
        })
    }
    const Map = useMemo(() => dynamic(
        () => import('@/components/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), []);
    useEffect(() => {

        loadUsers();

    }, []);
    return (
        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'20px'} mt={4} mb={3} fontWeight={'bold'}>

                    {i18n.t('User Detail')}
                </Typography>
                <hr />
                {data != null &&
                    <Grid container p={3}>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>نام:  </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, recivername: e.target.value })}

                                    fullWidth size="small" defaultValue={data.recivername}></TextField>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>نام خانوادگی: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, lastnamereciver: e.target.value })}

                                    fullWidth size="small" defaultValue={data.lastnamereciver}></TextField>

                            </Box>
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>منطقه: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, zone: e.target.value })}

                                    fullWidth size="small" defaultValue={data.zone}></TextField>

                            </Box>
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>

                                <Typography>شماره گیرنده: </Typography>
                                <TextField fullWidth size="small"
                                    onChange={(e) => setData({ ...data, recivermobile: e.target.value })}


                                    defaultValue={data.recivermobile}></TextField>

                            </Box>
                        </Grid>

                        <Grid xs={12} sm={4}>
                            <Box p={2}>

                                <Typography>شهر: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, city: e.target.value })}

                                    fullWidth size="small" defaultValue={data.city}></TextField>

                            </Box>

                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>منطقه: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, zone: e.target.value })}

                                    fullWidth size="small" defaultValue={data.zone}></TextField>
                            </Box>

                        </Grid>

                        <Grid xs={12} sm={12}>
                            <Box p={2}>
                                <Typography>آدرس: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, address: e.target.value })}

                                    fullWidth size="small" defaultValue={data.address}></TextField>
                            </Box>

                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>واحد: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, unint: e.target.value })}

                                    fullWidth size="small" defaultValue={data.unint}></TextField>
                            </Box>

                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>پلاک: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, plaque: e.target.value })}

                                    fullWidth size="small" defaultValue={data.plaque}></TextField>
                            </Box>

                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Box p={2}>
                                <Typography>کد پستی: </Typography>
                                <TextField
                                    onChange={(e) => setData({ ...data, postalcode: e.target.value })}

                                    fullWidth size="small" defaultValue={data.postalcode}></TextField>
                            </Box>

                        </Grid>
                        <Grid xs={12} gap={4} textAlign={'center'} p={3}>
                         <Box m={2}>
                         <Button
                           onClick={(e)=>{ save()}}
                           variant={`contained`} >ذخیره سازی</Button>
                         </Box>
                         <Box m={2}>
                           ‌<Button
                             variant={`contained`}
                             color={'success'}
                           href={`/Dashboard/Menus/Users/${data.parent}`}
                           >بازگشت</Button>
                           </Box>
                        </Grid>
                        <Grid xs={12}>
                            {/* <Map latlng={center} changelocation={changelocation} /> */}
                        </Grid>
                    </Grid>
                }
            </Container>
        </Layout>


    )
}


export const getServerSideProps = async (context: any) => {
    return {
        props: {

            current: context.params.id,


        }
    }
}