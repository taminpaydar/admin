

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
        url: config.url + '/v1/dashboard/pgroup/' + repo.message.id,
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
      url: '/Dashboard/Articles'
    },
    {
      name: 'Products Group',
      url: '/Dashboard/Products/Group'
    },
    {
      name: repo.message.name,
    }
  ]

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
              <Grid xs={12} md={12} mb={3}>

                <Typography m={1}>{i18n.t('keywords')} </Typography>
                <TextField
                  multiline
                  rows={2}
                  maxRows={4}
                  defaultValue={data.keywords}
                  onChange={(e) => setData({ ...data, keywords: e.target.value })}
                  className={styles.myformtextfield}
                  fullWidth id="outlined-basic"
                  variant="outlined"
                />
                <Typography m={1}>{i18n.t('descripton')} </Typography>
                <TextField
                  multiline
                  rows={2}
                  maxRows={4}
                  defaultValue={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  className={styles.myformtextfield}
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>

              <Grid md={12} textAlign={'center'}>
                <Button onClick={(e) => save()} variant="contained" >{i18n.t('Save')}</Button>
              </Grid>
            </Grid>
            <Grid xs={12} md={4} p={2}>

              <FileManagerSingle
                parent={data.id}
                component="bloggroup"
                insermode={false}
              ></FileManagerSingle>
            </Grid>

          </Grid>

        </Box>
        <Grid container >


        </Grid>

        <hr />

        <Box dir='' mt={3}>
          <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={data.specifications}
            freeSolo
            onChange={(event, newValue) => {
              setData({ ...data, specifications: newValue })
            }}
            renderInput={(params) => (
              <TextField

                {...params}
                variant="filled"
                label={i18n.t('Attribuite')}
                placeholder=''
              />
            )}
          />
        </Box>
        <Box dir='' mt={3}>
          <Autocomplete
            multiple
            id="tags-filled2"
            options={[]}
            defaultValue={data.Technical}
            freeSolo
            onChange={(event, newValue) => {
              setData({ ...data, Technical: newValue })
            }}
            renderInput={(params) => (
              <TextField

                {...params}
                variant="filled"
                label={i18n.t('Technical')}
                placeholder=''
              />
            )}
          />
        </Box>
        <Grid md={12} >
        </Grid>
        <Box dir='' mt={3}>
          <Autocomplete
            multiple
            id="tags-filled2"
            options={[]}
            defaultValue={data.Features}
            freeSolo
            onChange={(event, newValue) => {
              setData({ ...data, Features: newValue })
            }}
            renderInput={(params) => (
              <TextField

                {...params}

                variant="filled"
                label={i18n.t('Features')}
                placeholder=''
              />
            )}
          />
        </Box>
        <Box m={4}>
          <Paper>
            <Box mb={3} p={3} textAlign={'center'} >
              <Typography onClick={(e) => { console.log('fuck') }}>{i18n.t('Add Detail')}</Typography>
              <Box>
                <form>
                  <Grid container>
                    <Grid xs={12}>
                      <Typography component={'label'}></Typography>
                      <TextField
                        fullWidth
                        defaultValue={data.description}
                        onChange={(e) => setPrice({ ...attrprice, name: e.target.value })}
                        className={styles.myformtextfield}
                        label={i18n.t('name')}
                        id="outlined-basic"
                        variant="outlined"
                      />

                    </Grid>
                  </Grid>
                  <Grid >
                    <Box width={'100%'} textAlign={'center'}>
                      <Grid container key={key2}>
                        <Grid xs={5} p={2}>
                          <Typography component={'label'}></Typography>
                          <TextField
                            fullWidth
                            defaultValue={subpriceattr.name}
                            onChange={(e) => setPrPrice({ ...subpriceattr, name: e.target.value })}
                            className={styles.myformtextfield}
                            label={i18n.t('name')}
                            id="outlined-basic"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid xs={5} p={2} >
                          <Typography component={'label'}></Typography>
                          <TextField

                            fullWidth
                            defaultValue={subpriceattr.unit}
                            onChange={(e) => setPrPrice({ ...subpriceattr, unit: e.target.value })}
                            className={styles.myformtextfield}
                            label={i18n.t('unit')}
                            id="outlined-basic"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid xs={1} p={2} >
                          <Typography component={'label'}></Typography>
                          <TextField
                            type="color"
                            fullWidth
                            defaultValue={subpriceattr.color}
                            onChange={(e) => setPrPrice({ ...subpriceattr, color: e.target.value })}
                            className={styles.myformtextfield}
                            label={i18n.t('unit')}
                            id="outlined-basic"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid xs={1} p={2} pt={3} >
                          {editSubAttr == null ?
                            <Button onClick={(e) => NewAttr()} variant="contained"  >{i18n.t('add')}</Button>
                            :
                            <Button onClick={(e) => SaveEditAttr(editSubAttr)} variant="contained"  >{i18n.t('edit')}</Button>

                          }
                        </Grid>
                      </Grid>

                    </Box>
                    <Grid container key={key2}>
                      <TableContainer component={Paper} dir={'rtl'}>
                        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">{i18n.t('name')}</TableCell>
                              <TableCell align="right">{i18n.t('unit')}</TableCell>
                              <TableCell align="right">{i18n.t('color')}</TableCell>

                              <TableCell align="right">{i18n.t('edit')}</TableCell>
                              <TableCell align="right">{i18n.t('delete')}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              attrprice.detail.length != 0 &&
                              attrprice.detail.map((row: any, index: any) => (
                                <TableRow

                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell align="right" component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.unit}

                                  </TableCell>
                                  <TableCell align="center">
                                    <Box width={20} height={20} bgcolor={row.color}></Box>

                                  </TableCell>
                                  <TableCell align="right" >
                                    <Box onClick={(e) => { EditAttr(index) }}>
                                      <img className={styles.m1} src="/assets/insert.svg"></img>
                                    </Box>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Box onClick={(e) => { DeleteAttr(index) }}>
                                      <img className={styles.m1} src="/assets/trash.svg" width={20}></img>

                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid>
                      <Box textAlign={'center'} mt={1}>
                        <Button onClick={(e) => { addtodetial() }} variant="contained" >Add Detial</Button>

                      </Box>
                    </Grid>

                  </Grid>
                </form>
              </Box>

            </Box>
          </Paper>
          <Paper>
            <Box mt={3}>
              {/* <pre>{JSON.stringify(attrprice, null, 2)}</pre>

              <pre>{JSON.stringify(data.otherprice, null, 2)}</pre>

              <Grid container key={key2}>
                <TableContainer component={Paper} dir={'rtl'}>
                  <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">{i18n.t('name')}</TableCell>

                        <TableCell align="right">{i18n.t('edit')}</TableCell>
                        <TableCell align="right">{i18n.t('delete')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>


                      <TableRow


                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right" component="th" scope="row">

                        </TableCell>

                        <TableCell align="right" >
                          <Box >
                            <img className={styles.m1} src="/assets/insert.svg"></img>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box >
                            <img className={styles.m1} src="/assets/trash.svg" width={20}></img>

                          </Box>
                        </TableCell>
                      </TableRow>

                    </TableBody>
                    <TableBody>


                      <TableRow


                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right" component="th" scope="row">

                        </TableCell>

                        <TableCell align="right" >
                          <Box >
                            <img className={styles.m1} src="/assets/insert.svg"></img>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box >
                            <img className={styles.m1} src="/assets/trash.svg" width={20}></img>

                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow


                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right" colSpan={3} component="th" scope="row">
                          <Box width={'100%'} textAlign={'center'}>
                            <Button>{i18n.t('Add Price Attribute')}</Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid> */}
            </Box>
          </Paper>
        </Box>
        <Box>

        </Box>
        <AdvancedEditor parent={repo.message.id}></AdvancedEditor>
      </Container>
      {error != null && <ErrorDB key={key} err={error} />}

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  repo: Repo
}> = async (context: any) => {
  const cookies = cookie.parse(context.req.headers.cookie);
  const res = await fetch(config.url + '/v1/dashboard/pgroup/' + context.params.id, {
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