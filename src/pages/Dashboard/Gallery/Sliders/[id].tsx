import { config } from "@/config";
import axios from "axios";
import { getCookies } from "cookies-next";
import cookie from "cookie";

import Layout from "@/layouts/dashboardLayout"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import { Button, Grid } from '@mui/material'
import { Container, TextField, Box } from "@mui/material";
import { AddNewCard } from "@/components/Dashboard/cardThumpnailGroup";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import AdvancedEditor from "@/components/AdavncedEditor/TissEditor";
import styles from '@/app/template.module.scss'
import FileManagerMultiFile from "@/components/ImageManager/MultiFileManager";
import { useState } from "react";
import { useRouter } from "next/router";
import ErrorDB from "@/components/ErrorDb";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = any;
export default function EditGroup({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let cookie = getCookies();
  const router = useRouter()
  const [key, setKey] = useState<any>(0);

  const [error, setError] = useState<any>(null);

  const [data, setData] = useState<any>(repo.message);
  const save = async () => {
    console.log('xxx');
    try {
      let res: any = await axios({
        method: 'put',
        url: config.url + '/v1/dashboard/gallery/' + repo.message.id,
        data: data,
        headers: {
          Authorization: 'Bearer ' + cookie['token'],
        }
      });

      let mydata = res.data;
      alert('saved');
      return mydata;
    } catch (error: any) {
      let x = key + 1;
      setKey(x);
      setError(error.response);
    }
  }
  const component = [
    {
      'bloggroup': {
          url:''
      }
    }
  ]
  const breadcrump = [
    {
      name: 'home',
      url: '/Dashboard'
    },
    {
      name: 'Gallery',
      url: '/Dashboard/Gallery'
    },
    {
      name: 'Sliders',
      url: '/Dashboard/Gallery/Sliders'
    },
    {
      name: repo.message.name,
    }
  ]
  return (
    <Layout>
      <Container>
        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
        <Typography fontSize={'22px'} mt={4} mb={3} fontWeight={'bold'}>{repo.message.name} </Typography>
        <hr />
        <Box p={3}>
          <Grid container >
            <Grid xs={12} md={12}>
              <Typography m={1}>{i18n.t('name')} </Typography>
              <TextField
                defaultValue={data.name}
                className={styles.myformtextfield}
                onChange={(e) => setData({ ...data, name: e.target.value })}

                fullWidth id="outlined-basic"
                variant="outlined"
              />
              <Typography m={1}>{i18n.t('url')} </Typography>
              <TextField
                className={styles.myformtextfield}
                //onChange={(e) => setData(e.target.value)}
                onChange={(e) => setData({ ...data, url: e.target.value })}
                defaultValue={data.url}

                fullWidth id="outlined-basic"
                variant="outlined"
              />

              <Grid md={12} mt={4} textAlign={'center'}>
                <Button onClick={(e) => save()} variant="contained" >{i18n.t('Save')}</Button>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} p={2}>
              <FileManagerMultiFile
                parent={data.id}
                component="gallery"
                insermode={false}
                edittable={true}
                fullwidth={true}
                overlytext={true}
              ></FileManagerMultiFile>
            </Grid>

          </Grid>

        </Box>


        <hr />



      </Container>
      {error != null && <ErrorDB key={key} err={error} />}

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  repo: Repo
}> = async (context: any) => {
  const cookies = cookie.parse(context.req.headers.cookie);
  const res = await fetch(config.url + '/v1/dashboard/slider/' + context.params.id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + cookies['token']

    }
  })
  if (res.status != 200) {
    return {
      notFound: true, //redirects to 404 page
    };
  }
  const repo = await res.json()
  return { props: { repo } }
}
