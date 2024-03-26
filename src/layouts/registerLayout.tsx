import { Container, Box } from "@mui/material"
import '../app/globals.css'
import styles from '../app/template.module.scss'

import React from "react";
import Head from "next/head";

export default function RegisterPage({ children }: {
    children: React.ReactNode
}) {
    return <Box className={styles.backgroundcolor} >
        <Container  >
        <Head>
                <title>TISS ENGINE 2.1</title>
                <link rel="icon"  type="image/png" href="/oranglogo.png" />

            </Head>
            <Box textAlign={'center'} sx={{
                paddingTop: {
                    xs: 4,
                    md: 3
                }
            }}>
                <img className={styles.logologin}
                    src='/oranglogo.png'
                    alt='Login'
                    width={10}
                    loading="lazy"
                />
            </Box>
            <Box sx={{
                p: 1,

            }} className={styles.outurLoginBox}>
                <Box >

                    {children}
                </Box>
            </Box>
        </Container>
    </Box>
}