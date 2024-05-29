import { config } from "@/config";
import axios from "axios";
import { getCookies } from "cookies-next";
import cookie from "cookie";

import Layout from "@/layouts/dashboardLayout"
import Typography from '@mui/material/Typography';
import i18n from 'i18n'; 
import { Button, Grid, Paper } from '@mui/material'
import { Container, TextField, Box, FormControl, InputLabel, MenuItem, Select, Autocomplete } from "@mui/material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import styles from '@/app/template.module.scss'
import FileManagerMultiFile from "@/components/ImageManager/MultiFileManager";
import { useRouter } from "next/router";
import ErrorDB from "@/components/ErrorDb";
import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowDropUp } from "@mui/icons-material";
import { ArrowDropDown } from "@mui/icons-material";
import { Edit, Delete, Add, ArrowCircleLeft as ArrowBack } from "@mui/icons-material";
import FileManagerSingle from "@/components/ImageManager/SingleFileManager";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
const componentlist = ['bloggroup', 'articles', 'productsgroups', 'products', 'gallery', 'url'];

type Repo = any;
export default function EditGroup({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    let cookie = getCookies();
    const router = useRouter()
    const [key, setKey] = useState<any>(0);
    const [key2, setKey2] = useState<any>(0);
    const [key3, setKey3] = useState<any>(0);

    const [show, showitem] = useState<any>(false);
    const [show2, showitem2] = useState<any>(false);

    const [parent, setParent] = useState<any>(0);
    const [edit, setEdit] = useState<any>(null);

    const [error, setError] = useState<any>(null);

    const [data, setData] = useState<any>(repo.message);

    const reloaditem = async () => {
        try {
            let res: any = await axios({
                method: 'GET',
                url: config.url + '/v1/dashboard/mgroup/' + repo.message.id,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            setData(mydata.message);
            return mydata;
        } catch (error: any) {

        }
    }
    const deleteon = async (params: any) => {
        try {
            let res: any = await axios({
                method: 'delete',
                url: config.url + '/v1/dashboard/mdetail/' + params.id,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            refresh();

        } catch (error: any) {

        }
    }
    const Arrowup = async (item: any) => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/dashboard/mdetail/ordettop/' + item,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            refresh();
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            //  setKey(x);
            //  setError(error.response);
        }
    }
    const ArrowDown = async (item: any) => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/dashboard/mdetail/orderdown/' + item,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            refresh();
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            //  setKey(x);
            //  setError(error.response);
        }
    }
    const save = async () => {
        console.log('xxx');
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/dashboard/mgroup/' + repo.message.id,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            refresh();
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
            name: 'Menus',
            url: '/Dashboard/Menus'
        },
        {
            name: 'Menu Group',
            url: '/Dashboard/Menus/Group'
        },
        {
            name: repo.message.name
        },
    ]
    const AddItems = ({ id }: any) => {
        setParent(id);
        var e = key2 + 1;
        setKey2(e);

        showitem(true);


    }
    const Edititem = ({ id }: any) => {
        reloaditem();
        var e = key3 + 1;
        setKey3(e);
        showitem(false);
        setEdit(id);
        setParent(id);
        var e = key2 + 1;

        showitem(true);
    }
    const refresh = () => {
        reloaditem();
        var e = key3 + 1;
        setKey3(e);
        showitem(false);

    }
    const loop = (times: number) => {
        return [...Array(4)].forEach((item, i) => { return <>Sak</> });


    };
    const RowEdit = ({ item, level }: any) => {

        return (

            <>

                <TableRow key={1}>
                    <TableCell align="right">
                        <Button onClick={(e) => { Arrowup(item.id) }}><ArrowDropUp ></ArrowDropUp></Button>
                        <Button onClick={(e) => { ArrowDown(item.id) }} ><ArrowDropDown ></ArrowDropDown></Button>
                    </TableCell>

                    <TableCell align="right" component="th" scope="row">
                        <Typography>
                            <Box
                                display={'inline-block'}
                                width={30 * level}
                                height={10}
                                pl={3}
                                textAlign={'left'}
                            > {level != 0 && <ArrowBack></ArrowBack>} </Box>
                            {item.name} </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Button onClick={(e) => {

                            AddItems({ id: item.id })
                        }} > <Add></Add></Button>

                    </TableCell>
                    <TableCell align="right"> {item.component}</TableCell>
                    <TableCell dir='rtl' align="left">{item.data != null && item.data.url}</TableCell>
                    <TableCell align="center">
                        <Grid container>
                            <Grid xs={6}>
                                <Button onClick={(e) => {
                                    Edititem({ id: item })
                                }} >  <Edit  ></Edit></Button>
                            </Grid>
                            <Grid xs={6} onClick={(e) => deleteon({ id: item.id })} >
                                <Delete></Delete>
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableRow>
                {
                    item.subdetail != null && item.subdetail.map((item2: any) => {

                        return (

                            <RowEdit item={item2} level={level + 1} ></RowEdit>
                        )
                    })
                }
            </>
        )
    }
    useEffect(() => {

    }, []);

    return (
        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'22px'} mt={4} mb={3} fontWeight={'bold'}>{repo.message.name} </Typography>
                <hr />

                <Box p={3}>
                    <Grid container >
                        <Grid xs={12} md={6} p={2}>
                            <Typography m={1}>{i18n.t('name')} </Typography>
                            <TextField
                                defaultValue={data.name}
                                className={styles.myformtextfield}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                fullWidth id="outlined-basic"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={12} md={6} p={2}>

                            <Typography m={1}>{i18n.t('url')} </Typography>
                            <TextField
                                className={styles.myformtextfield}
                                //onChange={(e) => setData(e.target.value)}
                                onChange={(e) => setData({ ...data, url: e.target.value })}
                                defaultValue={data.url}

                                fullWidth id="outlined-basic"
                                variant="outlined"
                            />


                        </Grid>
                        <Grid md={12} mt={4} textAlign={'center'}>
                            <Button onClick={(e) => save()} variant="contained" >{i18n.t('Save')}</Button>
                        </Grid>

                    </Grid>

                </Box>


                <hr />
                {show == true &&
                    <Box key={key2} >
                        <AddItem child={parent} key={key3} edit={edit} refresh={refresh} parent={repo.message.id} ></AddItem>
                    </Box>
                }
                {show == false &&
                    <Box mb={4} mt={3} >
                        <Grid container >
                            <Grid md={2}>
                                <Button

                                    onClick={(e) => {
                                        setEdit(null)
                                        AddItems({ id: 0 })
                                    }}
                                    className={styles.buttonblack} variant="contained"  >{i18n.t('Add')}</Button>
                            </Grid>
                            <Grid md={2}>
                                <Button
                                    onClick={(e) => { refresh() }}
                                    className={styles.buttonblack} variant="contained"  >{i18n.t('Refresh')}</Button>
                            </Grid>
                        </Grid>

                    </Box>}
                {show == false && <Paper>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">{i18n.t('sort')}</TableCell>
                                        <TableCell align="right">{i18n.t('name')}</TableCell>
                                        <TableCell align="right">{i18n.t('Add Child')}</TableCell>
                                        <TableCell align="right">{i18n.t('component')}</TableCell>
                                        <TableCell align="right">{i18n.t('url')}</TableCell>
                                        <TableCell align="center">{i18n.t('status')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody key={key3}>
                                    {data != null && data.todetail.map((item: any) => {

                                        return (
                                            item.child == '0' &&
                                            <RowEdit level={0} item={item}></RowEdit>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>}

            </Container>

            {error != null && <ErrorDB key={key} err={error} />}

        </Layout>
    )
}
export function AddItem({ parent, child, refresh, edit }: any) {
    const [data, setData] = useState<any>({});
    const [key, setKey] = useState<any>(1);
    const [component, setComonent] = useState<any>(1);
    let cookie = getCookies();

    const [error, setError] = useState<any>(null);
    const chanagecomponent = (event: any) => {
        var item = event.target.value as string;
        setData({ ...data, component: item })
        var x = key + 1;
        setComonent(item);
        setKey(x);
    }

    const Saveitem = async () => {

        data.parent = parent;
        data.child = child;
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/mdetail',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            alert('saved');
            refresh();
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            console.log(error);
            setError(error.response);
        }





    }
    const UpdateData = async () => {
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + `/v1/dashboard/mdetail/${edit._id}`,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            alert('saved');
            refresh();
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            console.log(error);
            setError(error.response);
        }
    }
    useEffect(() => {
        if (edit != null) {
            setComonent(edit.component);
            setData(edit);


        }



    }, []);
    return (
        <Box>
            <form>
                <Grid container>
                    <Grid xs={12} md={6} p={2}>
                        <Typography m={1}>{i18n.t('name')} </Typography>
                        <TextField
                            className={styles.myformtextfield}
                            //onChange={(e) => setData(e.target.value)}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            defaultValue={edit != null ? edit.name : ''}

                            fullWidth id="outlined-basic"
                            variant="outlined"
                        />


                    </Grid>
                    <Grid xs={12} md={6} p={2}>
                        <FormControl fullWidth dir='rtl'>
                            <Typography m={1}>{i18n.t('select component')} </Typography>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Group"
                                onChange={chanagecomponent}
                                defaultValue={edit != null ? edit.component : ''}
                            >
                                {componentlist.map((item: any) => {
                                    return <MenuItem value={item}>{item}</MenuItem>

                                })}

                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid xs={12} md={12} p={2}>
                        {component == 'url' && <UrlComponent edit={edit} key={key} data={data} setData={setData}></UrlComponent>}
                        {component == 'bloggroup' && <BlogGroupComponent edit={edit} key={key} data={data} setData={setData} />}
                        {component == 'articles' && <ArticleComponent edit={edit} key={key} data={data} setData={setData} />}
                        {component == 'productsgroups' && <GroupSelect edit={edit} key={key} data={data} setData={setData} />}
                        {component == 'gallery' && <GallerySelect edit={edit} key={key} data={data} setData={setData} />}


                    </Grid>
                    <Grid xs={6} md={6} p={2}>

                        {edit != null &&
                            <Box width={'100%'} p={3}>
                                <FileManagerSingle
                                    parent={edit._id}
                                    component={'menudetail'}
                                    insermode={false}



                                ></FileManagerSingle>
                            </Box>
                        }
                    </Grid>
                    <Grid xs={12} md={12} p={2} textAlign={'center'}>
                        {edit != null ? <Button
                            onClick={(e) => { UpdateData() }}
                            className={styles.buttonblack} variant="contained"  >{i18n.t('Update Menu')}</Button>
                            : <Button
                                onClick={(e) => { Saveitem() }}
                                className={styles.buttonblack} variant="contained"  >{i18n.t('Save Menu')}</Button>

                        }

                    </Grid>

                </Grid>
            </form>
            {error != null && <ErrorDB key={key} err={error} />}

        </Box>
    )
}
export function GallerySelect({ edit, setData, data }: any) {
    let cookie = getCookies();
    const [group, setGroup] = useState<any>(null);
    const [key, stkey] = useState<any>(0);

    const callgroup = async () => {

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/gallery/all',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data.message;
            setGroup(mydata);
        } catch (error: any) {

        }
    }


    useEffect(() => {
        callgroup();

    }, []);
    return (
        <Box>
            <Grid container>

                <Grid xs={12} md={6} p={4} >
                    <Typography m={1}>{i18n.t('select group')} </Typography>
                    {group != null &&
                        <Autocomplete
                            onChange={(event: any, newValue: any | null) => {
                                var x = key + 1;
                                setData({ ...data, data: { url: '/gallery/' + newValue.url, data: newValue.id } })
                                stkey(x);

                            }}
                            defaultValue={edit != null ? group.find((element: any) => element._id == edit.data.data) : null}

                            id="combo-box-demo"
                            options={group}
                            fullWidth
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option: any) => (
                                <Box style={{ textAlign: 'right' }} textAlign={'right'} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField style={{ textAlign: 'right' }} {...params} label="controlled" variant="standard" />
                            )}

                        />
                    }

                </Grid>
                <Grid xs={12} md={6} >
                    <Typography m={1}>{i18n.t('url')} </Typography>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        dir='rtl'
                        key={key}
                        className={styles.myformtextfield}
                        //onChange={(e) => setData(e.target.value)}
                        defaultValue={data.data != null ? data.data.url : ''}
                        fullWidth id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        </Box>
    )
}
export function ProdcutSelect({ edit, setData, data }: any) {
    let cookie = getCookies();
    const [group, setGroup] = useState<any>(null);
    const [key, stkey] = useState<any>(0);

    const callgroup = async () => {

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/product/all',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data.message;
            setGroup(mydata);
        } catch (error: any) {

        }
    }


    useEffect(() => {
        callgroup();

    }, []);
    return (
        <Box>
            <Grid container>

                <Grid xs={12} md={6} p={4} >
                    <Typography m={1}>{i18n.t('select group')} </Typography>
                    {group != null &&
                        <Autocomplete
                            onChange={(event: any, newValue: any | null) => {
                                var x = key + 1;
                                setData({ ...data, data: { url: '/detail/' + newValue.url, data: newValue.id } })
                                stkey(x);

                            }}
                            id="combo-box-demo"
                            options={group}
                            fullWidth
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option: any) => (
                                <Box style={{ textAlign: 'right' }} textAlign={'right'} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField style={{ textAlign: 'right' }} {...params} label="controlled" variant="standard" />
                            )}

                        />
                    }

                </Grid>
                <Grid xs={12} md={6} >
                    <Typography m={1}>{i18n.t('url')} </Typography>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        dir='rtl'
                        key={key}
                        className={styles.myformtextfield}
                        //onChange={(e) => setData(e.target.value)}
                        defaultValue={data.data != null ? data.data.url : ''}
                        fullWidth id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        </Box>
    )
}
export function GroupSelect({ edit, setData, data }: any) {
    let cookie = getCookies();
    const [group, setGroup] = useState<any>(null);
    const [key, stkey] = useState<any>(0);

    const callgroup = async () => {

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/pgroup/all',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data.message;
            setGroup(mydata);
        } catch (error: any) {

        }
    }


    useEffect(() => {
        callgroup();

    }, []);
    return (
        <Box>
            <Grid container>

                <Grid xs={12} md={6} p={4} >
                    <Typography m={1}>{i18n.t('select group')} </Typography>

                    {group != null &&
                        <Autocomplete
                            onChange={(event: any, newValue: any | null) => {
                                var x = key + 1;
                                setData({ ...data, data: { url: '/group/' + newValue.url, data: newValue.id } })
                                stkey(x);

                            }}
                            id="combo-box-demo"
                            options={group}
                            fullWidth

                            defaultValue={edit != null ? group.find((element: any) => element._id == edit.data.data) : null}

                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option: any) => (
                                <Box style={{ textAlign: 'right' }} textAlign={'right'} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField style={{ textAlign: 'right' }} {...params} label="controlled" variant="standard" />
                            )}

                        />
                    }

                </Grid>
                <Grid xs={12} md={6} >
                    <Typography m={1}>{i18n.t('url')} </Typography>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        dir='rtl'
                        key={key}
                        className={styles.myformtextfield}
                        //onChange={(e) => setData(e.target.value)}
                        defaultValue={data.data != null ? data.data.url : ''}
                        fullWidth id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        </Box>
    )
}
export function UrlComponent({ edit, setData, data }: any) {
    useEffect(() => {
        if (edit != null) {
            setData({ ...data, data: { url: edit.data.url } })
        }

    }, []);
    return (
        <Box >
            <Typography m={1}>{i18n.t('url')} </Typography>
            <TextField
                className={styles.myformtextfield}
                //onChange={(e) => setData(e.target.value)}
                onChange={(e) => setData({ ...data, data: { url: e.target.value } })}
                defaultValue={edit == null ? data.url : edit.data.url}
                fullWidth id="outlined-basic"
                variant="outlined"
                dir="ltr"
                style={{ textAlign: 'left' }}
            />
        </Box>
    )
}
export function ArticleComponent({ edit, setData, data }: any) {
    let cookie = getCookies();
    const [group, setGroup] = useState<any>(null);
    const [key, stkey] = useState<any>(0);

    const callgroup = async () => {

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/blog/all',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data.message;
            setGroup(mydata);
        } catch (error: any) {

        }
    }


    useEffect(() => {
        callgroup();

    }, []);
    return (
        <Box>
            <Grid container>

                <Grid xs={12} md={6} p={4} >
                    <Typography m={1}>{i18n.t('select group')} </Typography>
                    {group != null &&
                        <Autocomplete
                            onChange={(event: any, newValue: any | null) => {
                                var x = key + 1;
                                setData({ ...data, data: { url: '/article/' + newValue.url, data: newValue.id } })
                                stkey(x);

                            }}
                            id="combo-box-demo"
                            options={group}
                            fullWidth
                            defaultValue={edit != null ? group.find((element: any) => element._id == edit.data.data) : null}

                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option: any) => (
                                <Box style={{ textAlign: 'right' }} textAlign={'right'} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField style={{ textAlign: 'right' }} {...params} label="controlled" variant="standard" />
                            )}

                        />
                    }

                </Grid>
                <Grid xs={12} md={6} >
                    <Typography m={1}>{i18n.t('url')} </Typography>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        dir='rtl'
                        key={key}
                        className={styles.myformtextfield}
                        //onChange={(e) => setData(e.target.value)}
                        defaultValue={data.data != null ? data.data.url : ''}
                        fullWidth id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        </Box>
    )
}
export function BlogGroupComponent({ edit, setData, data }: any) {
    let cookie = getCookies();
    const [group, setGroup] = useState<any>(null);
    const [key, stkey] = useState<any>(0);

    const callgroup = async () => {

        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/bloggroup',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data.message;
            setGroup(mydata);
        } catch (error: any) {

        }
    }


    useEffect(() => {
        callgroup();

    }, []);
    return (
        <Box>
            <Grid container>

                <Grid xs={12} md={6} p={4} >
                    <Typography m={1}>{i18n.t('select group')} </Typography>

                    {group != null &&
                        <Autocomplete
                            onChange={(event: any, newValue: any | null) => {
                                var x = key + 1;
                                setData({ ...data, data: { url: '/' + newValue.url, data: newValue.id } })
                                stkey(x);

                            }}
                            defaultValue={edit != null ? group.find((element: any) => element._id == edit.data.data) : null}

                            id="combo-box-demo"
                            options={group}
                            fullWidth
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option: any) => (
                                <Box style={{ textAlign: 'right' }} textAlign={'right'} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField style={{ textAlign: 'right' }} {...params} label="controlled" variant="standard" />
                            )}

                        />
                    }

                </Grid>
                <Grid xs={12} md={6} >
                    <Typography m={1}>{i18n.t('url')} </Typography>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        dir='rtl'
                        key={key}
                        className={styles.myformtextfield}
                        //onChange={(e) => setData(e.target.value)}
                        defaultValue={data.data != null ? data.data.url : ''}
                        fullWidth id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        </Box>
    )
}
export const getServerSideProps: GetServerSideProps<{
    repo: Repo
}> = async (context: any) => {
    const cookies = cookie.parse(context.req.headers.cookie);
    const res = await fetch(config.url + '/v1/dashboard/mgroup/' + context.params.id, {
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
