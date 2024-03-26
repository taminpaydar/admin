import { Box, Grid, Link, Typography, MenuItem, Container } from "@mui/material";
import React, { useState, useEffect, ReactNode } from 'react'
import { config } from "@/config";
import styles from '../app/Main.module.scss'
import { CustomizedMenus, SubmenuItem } from "../components/menuitem";
import '../app/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import { Phone, Instagram, YouTube, Facebook, PhoneAndroid, Twitter, Telegram, LinkedIn, PhoneEnabled, Email, Map, LocationCity, Fax, Face, Search, Movie } from "@mui/icons-material";
import Head from "next/head";
export default function mainLayout({ children }: {
    children: React.ReactNode
}) {
    const [menus, setMneus] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [menu2, setMneus2] = useState<any>(null);

    useEffect(() => {
        fetch(`${config.url}/v1/headerinfomation`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
        fetch(`${config.url}/v1/menus/main`)
            .then((res) => res.json())
            .then((data) => {
                setMneus(data)
            });
        fetch(`${config.url}/v1/menus/footer`)
            .then((res) => res.json())
            .then((data) => {
                setMneus2(data)
            });
    }, [])
    return (
        <>
           <Head>
                <title>TISS ENGINE 2.1</title>
                <link rel="icon"  type="image/png" href="/oranglogo.png" />

            </Head>
            <Box m={-1} bgcolor={'#333'} textAlign={'center'} >
                <Box>
                    <img src="/logo.png" width={400} />
                </Box>
            </Box>

            <Box >
                <Grid container className={` ${styles.menuleader} `} >
                    <Grid md={12} xs={12} textAlign={'center'} >
                        <Box mt={2}>
                            <Box>
                                {menus != null &&
                                    <>
                                        <ul className={` ${styles.menuheader} `}>
                                            {menus.data.todetail.map((value: any, key: null) => {
                                                return (
                                                    value.subdetail.length == 0 ?
                                                        value.mode != "bloggroup" ?
                                                            <li>
                                                                <Link href={value.url}>
                                                                    <MenuItem >
                                                                        <Typography fontSize={12} color={'black'}> {value.name}</Typography>
                                                                    </MenuItem>
                                                                </Link>
                                                            </li>
                                                            :
                                                            <li>
                                                                <SubmenuItem key={key} items={value}></SubmenuItem>
                                                            </li>
                                                        : <li>
                                                            <CustomizedMenus key={key} items={value}></CustomizedMenus>
                                                        </li>
                                                )
                                            })}

                                        </ul>
                                    </>
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <Box>
                {children}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <CssBaseline />

                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    <Container >
                        <Grid container color={'white'}>

                            <Grid xs={12} md={4}>
                                {data != null &&
                                    <ul className={styles.linkfooter} dir='rtl'>
                                        <li><PhoneEnabled fontSize="small" /> <Link underline="none" color={'white'} href={`tel://${data.setting.ContactUs.phone}`}>
                                            <Typography component={'span'} fontSize={16}>{data.setting.ContactUs.phone}</Typography>
                                        </Link></li>
                                        <li><PhoneAndroid fontSize="small" /> <Link underline="none" color={'white'} href={`tel://${data.setting.ContactUs.phone}`}>{data.setting.ContactUs.mobile}</Link></li>
                                        <li><Email fontSize="small" /> <Link underline="none" color={'white'} href={`tel://${data.setting.ContactUs.email}`}>{data.setting.ContactUs.phone}</Link></li>
                                        <li><Fax fontSize="small" /> <Link underline="none" color={'white'} href={`tel://${data.setting.ContactUs.fax}`}>{data.setting.ContactUs.fax}</Link></li>

                                        <li><Link underline="none" color={'white'} >
                                            <Typography component={'span'} fontSize={12}>{data.setting.ContactUs.address}</Typography>
                                        </Link></li>
                                    </ul>
                                }
                            </Grid>
                            <Grid xs={12} md={4} pt={4} textAlign={'center'} >
                                <img src="/logo2.png" width={250} ></img>
                            </Grid>
                            <Grid xs={12} md={4}  >
                                {menu2 != null &&
                                    <ul className={styles.linkfooter}  >
                                        {menu2.data.todetail.map((item: any) => {
                                            return (
                                                <li>
                                                    <Typography textAlign={'right'} fontSize={'12px'}>
                                                        <Link underline="none" color={'#fff'} textAlign={'right'} href={item.url}>{item.name}</Link>
                                                    </Typography>
                                                </li>
                                            )
                                        })}
                                    </ul>

                                }
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid md={12}>
                                {data != null &&
                                    <Typography textAlign={'center'}>
                                        <Link m={1} color={'white'} underline="none" href={data.setting.SocailNetwork.instagram} ><Instagram /></Link>
                                        <Link m={1} color={'white'} underline="none" href={data.setting.SocailNetwork.google}  ><YouTube /></Link>
                                        <Link m={1} color={'white'} underline="none" href={data.setting.SocailNetwork.linkedin}  ><LinkedIn /></Link>
                                        <Link m={1} color={'white'} underline="none" href={data.setting.SocailNetwork.twitter}  ><Twitter /></Link>
                                        <Link m={1} color={'white'} underline="none" href={data.setting.SocailNetwork.telegram} ><Telegram /></Link>
                                        <Link m={1} color={'white'} underline="none" href={data.setting.SocailNetwork.facebook} ><Facebook /></Link>
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </>
    )
}
function Copyright() {
    return (
        <Typography variant="body2" mt={2} fontSize={11} textAlign={'center'} color="white">
            {'Copyright © '}
            <Link color="inherit" href="https://afrang.dev/">
                Powered By Afrang Developer Team
            </Link>{'  Tiss Engine '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
