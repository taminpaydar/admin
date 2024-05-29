import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, InputLabel, MenuItem, Paper, Autocomplete, Select, Checkbox, TextField, Switch, Button, FormControl, Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react';

import axios from "axios"
import { getCookies } from "cookies-next";
import cookie from "cookie";
import { config } from "@/config"
import styles from '@/app/template.module.scss'
import i18n from 'i18n';
import changeUrl from "@/hoc/changeurl";
import ErrorDB from "@/components/ErrorDb";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import FileManagerSingle from "@/components/ImageManager/SingleFileManager";
import AdvancedEditor from "@/components/AdavncedEditor/TissEditor";
import FileManagerMultiFile from "@/components/ImageManager/MultiFileManager";
import ALLFileManagerMultiFile from "@/components/ImageManager/AllFileManager";
import Swal from 'sweetalert2'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import { useRouter } from "next/router";
type Repo = any;



export default function ItemEdit({
    repo, company
}: any) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const router = useRouter()
    const [companies, setList] = useState<any>(null);
    const [vehiclelist, setVehiclelist] = useState<any>(null);

    let cookie = getCookies();
    const [groups, setAllGroups] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [specifications, setspecifications] = useState<any>(repo.message.specifications);
    const [Technical, setTechnical] = useState<any>(repo.message.Technical);
    const [Features, setFeatures] = useState<any>(repo.message.Features);


    const [key, setKey] = useState<any>(0);
    const [data, setData] = useState<any>(repo.message);

    const [keyselectgroup, setselectgroup] = useState<any>(null);


    const handleChangeMultiple = (event: any) => {
        console.log(event.target.value);


    };




    const loadallgroup = () => {
        axios.get(`${config.url}/v1/dashboard/pgroup/allgroup`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setAllGroups(res.data.message);
        })
    }
    function ChangeData(e: String) {
        setData({
            name: e,
            url: changeUrl(e),
            parent: data.parent
        })
    }
    function ChangeDataUrl(e: String) {
        setData({
            name: data.name,
            url: changeUrl(e),
            parent: data.parent
        })
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
            name: 'Products list',
            url: '/Dashboard/Products/Items'
        },
        {
            name: repo.message.name,
        }
    ]

    const saveitem = async () => {
        // data.parent = keyselectgroup == null ? '' : keyselectgroup;
        data.specifications = specifications;
        data.Technical = Technical;
        data.Features = Features;
        console.log(data);
        try {
            let res: any = await axios({
                method: 'put',
                url: config.url + '/v1/dashboard/product/' + data.id,
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
            router.push('/Dashboard/Products/Items/' + res.data.data.id)
            Swal.fire(`${i18n.t('Saved Success')}`)
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    }
    const loadcomapny = async () => {
        let res: any = await axios({
            method: 'get',
            url: config.url + '/v1/dashboard/company/all',
            headers: {
                Authorization: 'Bearer ' + cookie['token'],
            }

        });
        setList(res.data.message);
        let res2: any = await axios({
            method: 'get',
            url: config.url + '/v1/dashboard/vehicle/all',
            headers: {
                Authorization: 'Bearer ' + cookie['token'],
            }

        });
        setVehiclelist(res2.data.message);
    }
    useEffect(() => {
        loadcomapny();
    }, []);
    return (
        <Layout>
            <Container dir='rtl'  >
                <Paper>
                    <Box sx={{ width: '100%', typography: 'body1' }}>

                    </Box>
                    <Box p={3}>
                        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                        <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                            {i18n.t('Edit Product')}
                        </Typography>
                        <Container className="mb-12" >
                            <Button onClick={(e) => { saveitem() }} className={styles.buttonblack} variant="contained" >
                                <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Save')}
                            </Button>
                        </Container>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="عمومی" value="1" />
                                    <Tab label="تصاویر" value="2" />
                                    <Tab label="توضیحات" value="3" />
                                    <Tab label="سئو" value="4" />
                                    <Tab label="مشخصات " value="5" />

                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Container>
                                    <Container>

                                        <Typography color={'gray'} m={1}>{i18n.t('Name')} </Typography>
                                        <TextField dir='rtl'
                                            defaultValue={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}


                                            className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                        <Typography color={'gray'} m={1}>{i18n.t('URL')} </Typography>
                                        <TextField
                                            defaultValue={data.url}
                                            onChange={(e) => setData({ ...data, url: e.target.value })}

                                            dir='rtl' className={styles.price} fullWidth id="outlined-basic" variant="outlined" />

                                        <Grid container>
                                            <Grid xs={12} sm={6} >
                                                <Typography color={'gray'} m={1}>{i18n.t('قیمت اصلی')} </Typography>
                                                <TextField
                                                    defaultValue={data.price}
                                                    onChange={(e) => setData({ ...data, price: e.target.value })}

                                                    dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                <Typography color={'gray'} m={1}>{i18n.t('قیمت بدون تخفیف ')} </Typography>
                                                <TextField
                                                    defaultValue={data.precentprice}
                                                    onChange={(e) => setData({ ...data, precentprice: e.target.value })}

                                                    dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                              <Typography color={'gray'} m={1}>{i18n.t('قیمت نمایندگی')} </Typography>
                                                        <TextField
                                                    defaultValue={data.price2}
                                                    onChange={(e) => setData({ ...data, price2: e.target.value })}

                                                    dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />
                                                <Typography color={'gray'} m={1}>{i18n.t('قیمت فروشنده')} </Typography>
                                                <TextField
                                                    defaultValue={data.price3}
                                                    onChange={(e) => setData({ ...data, price3: e.target.value })}

                                                    dir='ltr' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                                <Box textAlign={'center'} pt={3} >
                                                    <Button variant={'contained'} href={`/Dashboard/Products/GroupPrice/${data._id}`}>سایر قیمت گذاری ها</Button>
                                                </Box>
                                                <Typography color={'gray'} m={1}>{i18n.t('technical code')} </Typography>

                                                <TextField
                                                    defaultValue={data.technicalcode}
                                                    onChange={(e) => setData({ ...data, technicalcode: e.target.value })}
                                                    dir='rtl' className={styles.price} fullWidth id="outlined-basic" variant="outlined" />
                                                <Typography color={'gray'} m={1}>{i18n.t('brand')} </Typography>
                                                {companies != null &&
                                                    <Autocomplete
                                                        multiple
                                                        id="tags-standard"
                                                        options={companies}
                                                        onChange={(event, newValue: any) => {
                                                            setData({ ...data, brand: newValue })
                                                        }}
                                                        defaultValue={data.brand}
                                                        // onChange={((e)=>setData(...data,config:e.target.value))}
                                                        // onChange={(e:any) => setData({ ...data, companies: e.target.value })}
                                                        getOptionLabel={(option: any) => option.name}

                                                        renderInput={(params) => (
                                                            <Box dir="rtl" width={'100%'}>
                                                                <TextField

                                                                    {...params}
                                                                    style={{ textAlign: 'right' }}
                                                                    variant="standard"
                                                                    label="انتخاب خودرو"
                                                                    placeholder=""
                                                                />
                                                            </Box>
                                                        )}
                                                    />
                                                }

                                                <Typography color={'gray'} m={1}>{i18n.t('vehicles')} </Typography>
                                                {vehiclelist != null &&
                                                    <Autocomplete
                                                        multiple
                                                        id="tags-standard"
                                                        options={vehiclelist}
                                                        onChange={(event, newValue) => {
                                                            console.log(newValue);
                                                            setData({ ...data, vehicle: newValue })
                                                        }}
                                                        defaultValue={data.vehicle}
                                                        getOptionLabel={(option: any) => option.name}

                                                        renderInput={(params) => (
                                                            <TextField

                                                                {...params}
                                                                style={{ textAlign: 'right' }}
                                                                variant="standard"

                                                                placeholder=""
                                                            />
                                                        )}
                                                    />
                                                }
                                            </Grid>
                                            <Grid xs={12} sm={6} p={3} >
                                                <FileManagerSingle
                                                    parent={data.id}
                                                    component="productimage"
                                                    insermode={false}
                                                ></FileManagerSingle>
                                                <Grid container>
                                                    <Grid xs={2}>

                                                    </Grid>

                                                </Grid>


                                                <Typography color={'gray'} m={1}>{i18n.t('Firstpage')} </Typography>
                                                <Select
                                                    defaultValue={data.firstpage}
                                                    fullWidth
                                                    onChange={(e) => setData({ ...data, firstpage: e.target.value })}

                                                    variant="outlined">
                                                    <MenuItem value='true' >بلی</MenuItem>
                                                    <MenuItem value='false'>خیر</MenuItem>

                                                </Select>
                                                <Typography color={'gray'} m={1}>{i18n.t('Available')} </Typography>

                                                <Select
                                                    defaultValue={data.Available}
                                                    fullWidth
                                                    onChange={(e) => setData({ ...data, Available: e.target.value })}

                                                    variant="outlined">
                                                    <MenuItem value='true' >بلی</MenuItem>
                                                    <MenuItem value='false'>خیر</MenuItem>

                                                </Select>
                                            </Grid>


                                        </Grid>


                                    </Container>
                                </Container>

                            </TabPanel>
                            <TabPanel value="2">
                                <Box p={3} mt={3} >
                                    <Box mt={3}>
                                        <Typography  >سایر تصاویر</Typography>
                                        <FileManagerMultiFile
                                            parent={data.id}
                                            component="products"
                                            insermode={false}
                                            edittable={true}
                                        ></FileManagerMultiFile>
                                      

                                        <Box mt={10} pt={2}>
                                        <hr ></hr>
                                            <Typography > کاتالوگ و فایل</Typography>
                                         
                                            <ALLFileManagerMultiFile
                                                parent={data.id}
                                                component="katalogproducts"
                                                insermode={false}
                                                edittable={true}
                                            ></ALLFileManagerMultiFile>
                                        </Box>
                                    </Box>
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                                <Box mt={3}>
                                    <AdvancedEditor parent={repo.message.id}></AdvancedEditor>

                                </Box>
                            </TabPanel>
                            <TabPanel value="4">

                                <Typography m={1}>{i18n.t('keywords')} </Typography>
                                <TextField dir='rtl'

                                    multiline
                                    rows={2}
                                    maxRows={4}
                                    defaultValue={data.keywords}
                                    onChange={(e) => setData({ ...data, keywords: e.target.value })}

                                    className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                                <Typography m={1}>{i18n.t('description')} </Typography>
                                <TextField
                                    multiline
                                    rows={20}

                                    maxRows={4}
                                    defaultValue={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    dir='rtl' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />


                            </TabPanel>
                            <TabPanel value="5">

                                <Grid pt={3}>
                                    <Box bgcolor={'#333'} color={'#fff'} p={1} textAlign={'center'}>
                                        <Typography  >{i18n.t('specifications')} </Typography>

                                    </Box>
                                    <Grid container>
                                        {
                                            repo.mygr.map((m: any) => {
                                                return (
                                                    <>{m.specifications != undefined && m.specifications.map((map: any) => {
                                                        return (
                                                            <Grid xs={12} md={12} p={2} container>
                                                                <Grid xs={12}>
                                                                    <Typography textAlign={'right'} m={1}>{map}</Typography>

                                                                </Grid>
                                                                <Grid xs={12}>
                                                                    <TextField
                                                                        multiline
                                                                        onChange={(e) => setspecifications({ ...specifications, [map]: e.target.value })}
                                                                        defaultValue={specifications != null ? specifications[map] != false && specifications[map] != undefined ? specifications[map] : '' : ''}
                                                                        fullWidth
                                                                        dir='rtl' className={styles.myformtextfield}
                                                                        id="outlined-basic" variant="outlined" />

                                                                </Grid>
                                                            </Grid>

                                                        )

                                                    })}
                                                    </>
                                                )
                                            })
                                        }

                                    </Grid>
                                </Grid>
                                <Grid pt={3}>
                                    <Box bgcolor={'#333'} color={'#fff'} p={1} textAlign={'center'}>
                                        <Typography  >{i18n.t('Technical')} </Typography>

                                    </Box>

                                    <Grid container>

                                        {
                                            repo.mygr.map((m: any) => {
                                                return (
                                                    <>{m.Technical != undefined && m.Technical.map((map: any) => {
                                                        return (
                                                            <Grid xs={12} md={12} p={2} container>
                                                                <Grid xs={12}>
                                                                    <Typography textAlign={'right'} m={1}>{map}</Typography>

                                                                </Grid>
                                                                <Grid xs={12}>
                                                                    <TextField
                                                                        multiline
                                                                        onChange={(e) => setTechnical({ ...Technical, [map]: e.target.value })}
                                                                        defaultValue={Technical != null ? Technical[map] != undefined ? Technical[map] : '' : ''}
                                                                        fullWidth
                                                                        dir='rtl' className={styles.myformtextfield}
                                                                        id="outlined-basic" variant="outlined" />

                                                                </Grid>
                                                            </Grid>

                                                        )

                                                    })}
                                                    </>
                                                )
                                            })
                                        }




                                    </Grid>
                                    <Grid xs={12} md={4}>

                                    </Grid>
                                </Grid>
                                <Grid pt={3}>
                                    <Box bgcolor={'#333'} color={'#fff'} p={1} textAlign={'center'}>
                                        <Typography  >{i18n.t('Features')} </Typography>

                                    </Box>
                                    <Grid container>
                                        {
                                            repo.mygr.map((m: any) => {
                                                return (
                                                    <>{m.Features != undefined && m.Features.map((map: any) => {
                                                        return (
                                                            <Grid xs={12} md={12} p={2} container>
                                                                <Grid xs={12}>
                                                                    <Typography textAlign={'right'} m={1}>{map}</Typography>

                                                                </Grid>
                                                                <Grid xs={12}>
                                                                    <Switch
                                                                        defaultChecked={Features != null && Features[map] != undefined && Features[map]}
                                                                        onChange={(e) => setFeatures({ ...Features, [map]: e.target.value == 'on' ? true : false })}
                                                                    />


                                                                </Grid>
                                                            </Grid>

                                                        )

                                                    })}
                                                    </>
                                                )
                                            })
                                        }

                                        {/* {
                                    data.togroup.Features != null &&
                                    data.togroup.Features.map((map: any) => {
                                        let x = map.name;
                                        return (

                                            <Grid xs={3} md={3} p={2} container>

                                                <Box sx={{
                                                    border: 'solid 2px #5defed',
                                                    borderRadius: '15px',
                                                    backgroundColor: '#02d3d0',
                                                    width: '100%'

                                                }}>
                                                    <Grid container>
                                                        <Grid xs={8}>
                                                            <Typography color={'#333'} fontWeight={'bold'} textAlign={'right'} m={1}>{map}</Typography>

                                                        </Grid>
                                                        <Grid xs={4}>
                                                            <Switch
                                                                defaultChecked={Features != null && Features[map] != undefined && Features[map]}
                                                                onChange={(e) => setFeatures({ ...Features, [map]: e.target.value == 'on' ? true : false })}
                                                            />


                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Grid>

                                        )
                                    })} */}


                                    </Grid>
                                </Grid>

                            </TabPanel>

                        </TabContext>








                    </Box>
                </Paper>
                {error != null && <ErrorDB key={key} err={error} />}
            </Container >
        </Layout >
    )
}
export const getServerSideProps: GetServerSideProps<{
    repo: Repo
}> = async (context: any) => {

    const cookies = cookie.parse(context.req.headers.cookie);
    const res = await fetch(config.url + '/v1/dashboard/product/' + context.params.id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + cookies['token']

        }
    })
    const res2 = await fetch(config.url + '/v1/dashboard/company/all', {
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
    const company = await res2.json();
    return { props: { repo: repo, company: company } }
}
