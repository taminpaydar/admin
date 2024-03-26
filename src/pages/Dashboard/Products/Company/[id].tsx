

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
import { Container, TextField, Box, Autocomplete, Chip } from "@mui/material";
import { AddNewCard } from "@/components/Dashboard/cardThumpnailGroup";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import AdvancedEditor from "@/components/AdavncedEditor/TissEditor";
import styles from '@/app/template.module.scss'
import FileManagerSingle from "@/components/ImageManager/SingleFileManager";
import { useState } from "react";
import { useRouter } from "next/router";
import ErrorDB from "@/components/ErrorDb";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = any;
type Addprice = {
  name: String,
  detail: any
};
type PropertiPrice = {
  name: String,
  color: String,
  unit: String
};
export default function GroupPrdocuctEdit({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let cookie = getCookies();
  const router = useRouter()
  const [key, setKey] = useState<any>(0);
  const [key2, setKey2] = useState<any>(0);
  const [editSubAttr, seteditSubAttr] = useState<any>(null);

  const [error, setError] = useState<any>(null);
  const [showaddon, setShow] = useState<boolean>(false);
  const [attrprice, setPrice] = useState<Addprice>
    ({
      name: '',
      detail: [],


    })

  const [subpriceattr, setPrPrice] = useState<PropertiPrice>
    ({
      name: '',
      color: '',
      unit: ''

    })

  const [data, setData] = useState<any>(repo.message);
  const addtodetial = () => {
    if (attrprice.name == '') {
      alert('Please Enter name');

      return false;
    }
    var mydata = data.otherprice;
    if (mydata == null) { mydata = []; }
    mydata.push(attrprice);
    setData({ ...data, otherprice: mydata })

  }
  const EditAttr = (index: any) => {
    // console.log(attrprice.detail[index]);

    let edit = attrprice.detail[index];
    setPrPrice({
      name: edit.name,
      color: edit.color,
      unit: edit.unit
    });
    seteditSubAttr(index);
    let x = key2 + 1;
    setKey2(x);
  }
  const DeleteAttr = (index: any) => {
    var obj = attrprice.detail;
    obj.splice(index, 1);
    setPrice({ ...subpriceattr, detail: obj });
    setPrPrice({
      name: '',
      color: '',
      unit: ''
    })
    let x = key2 + 1;
    setKey2(x);
    seteditSubAttr(null);
  }
  const SaveEditAttr = (index: any) => {
    if (subpriceattr.name == '') {
      alert('Please Enter name');
      return false;
    };

    var obj = attrprice.detail;
    obj[index]['name'] = subpriceattr.name;
    obj[index]['color'] = subpriceattr.color;
    obj[index]['unit'] = subpriceattr.unit;
    setPrice({ ...subpriceattr, detail: obj });
    setPrPrice({
      name: '',
      color: '',
      unit: ''
    })
    let x = key2 + 1;
    setKey2(x);
    seteditSubAttr(null);

  }
  const NewAttr = () => {
    if (subpriceattr.name == '') {
      alert('Please Type name');
      return false;
    }
    let x = key2 + 1;
    setKey2(x);
    var obj = attrprice.detail;

    obj.push(subpriceattr);

    setPrPrice({

      name: '',
      color: '',
      unit: ''
    })


  }

  const save = async () => {

    try {
      let res: any = await axios({
        method: 'put',
        url: config.url + '/v1/dashboard/company/' + repo.message.id,
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
      name: 'Companies',
      url: '/Dashboard/Products/Company'
    },
    {
      name: repo.message.name,
    }
  ]
  const [tags, setTags] = useState([])
  const suggestions = ["Apple", "Air", "Asia", "Mumbai", "Kolkata", "Banana"]

  // tag style
  const TStyle = { background: '#ff0000', color: '#fff', fontSize: '.85em' };

  return (
    <Layout>
      <Container>

        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
        <Typography fontSize={'22px'} mt={4} mb={3} fontWeight={'bold'}>{repo.message.name} </Typography>
        <hr />
        <Box p={3}>
          <Grid container >
            <Grid xs={12} md={8}>
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

              <Grid md={12} textAlign={'center'}>
                <Button onClick={(e) => save()} variant="contained" >{i18n.t('Save')}</Button>
              </Grid>
            </Grid>
            <Grid xs={12} md={4} p={2}>

              <FileManagerSingle
                parent={data.id}
                component="company"
                insermode={false}
              ></FileManagerSingle>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {error != null && <ErrorDB key={key} err={error} />}

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  repo: Repo
}> = async (context: any) => {
  const cookies = cookie.parse(context.req.headers.cookie);
  const res = await fetch(config.url + '/v1/dashboard/company/' + context.params.id, {
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
const top100Films = [
  {},

];