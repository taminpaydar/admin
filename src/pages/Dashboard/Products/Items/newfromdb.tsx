import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, InputLabel, MenuItem, Paper, Select, TextField, Button, FormControl, Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react';

import axios from "axios"
import { getCookies } from "cookies-next";
import { config } from "@/config"
import styles from '@/app/template.module.scss'
import i18n from 'i18n';
import changeUrl from "@/hoc/changeurl";
import ErrorDB from "@/components/ErrorDb";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import NavigatePrevIcon from '@mui/icons-material/NavigateBefore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Autocomplete from '@mui/material/Autocomplete';

import { useRouter } from "next/router";
import Swal from "sweetalert2";
type Inputs =any;

export default function NewItem() {
    const router = useRouter()

    let cookie = getCookies();
    const [groups, setAllGroups] = useState<any>(null);
    const [level1, setLevel1] = useState<any>(null);
    const [level2, setLevel2] = useState<any>(null);
    const [level3, setLevel3] = useState<any>(null);
    const [level4, setLevel4] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [key, setKey] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [listemplate, setListTemplate] = useState<any>(null);
    const [selectedItem, setSlected] = useState<any>(null);

    const [keyselectgroup, setselectgroup] = useState<any>(null);


    const handleChangeMultiple = (event: any) => {
        console.log(event.target.value);


    };
    const [data, setData] = useState<Inputs>({
        name: '',
        url: '',
        parent: ''

    });
    const level1select = (key: any) => {
        setselectgroup(key.id);
        if (key.ChildGroup != null) {
            setLevel1(key);
            setLevel2(null);
            setLevel3(null);
            setLevel4(null);

        }

    }
    const level2select = (key: any) => {
        setselectgroup(key.id);
        if (key.ChildGroup != null) {
            setLevel2(key);
            setLevel3(null);
            setLevel4(null);

        }

    }
    const level4select = (key: any) => {
        setselectgroup(key.id);
        setLevel4(key);


    }
    const level3select = (key: any) => {
        setselectgroup(key.id);
        if (key.ChildGroup != null) {
            setLevel3(key);
            //   setLevel4(null);

        }

    }
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
            name: 'Products Group',
        }
    ]
    const stylemy = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        minHeight: 188,
        border: 'dashed 1px  #333',
        borderRadius: '15px',
        textAlign: 'right',
        overflow: 'auto',
        maxHeight: 188,
        '& ul': { padding: 0 },
    }
    const saveitem = async () => {
        data.parent = keyselectgroup == null ? '' : keyselectgroup;
        data.AppId=selectedItem.AppId;
        data.BuyPrice=selectedItem.BuyPrice;
        data.SellPrice=selectedItem.SellPrice;

        data.Code=selectedItem.Code;
        data.Stock=selectedItem.Stock;

        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/product/savedfromdata',
                data: data,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            let mydata = res.data;
          //  router.push('/Dashboard/Products/Items/' + res.data.data.id)
          listitems();
          Swal.fire('ذخیره شد');
            return mydata;
        } catch (error: any) {
            let x = key + 1;
            setKey(x);
            setError(error.response);
        }

    }
    const loaditem = async () => {
        setLoading(true);
        try {
            let res: any = await axios({
                method: 'post',
                url: config.url + '/v1/dashboard/getfromapp',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });
            setLoading(false);
            await listitems();
            Swal.fire('بروز رسانی با موفقیت انجام گردید');

            return true;
            // let mydata = res.data;
            // return mydata;
        } catch (error: any) {
            setLoading(false);
            Swal.fire('خطا در بروز رسانی')

        }

    }
    const listitems = async () => {
        setLoading(true);
        try {
            let res: any = await axios({
                method: 'get',
                url: config.url + '/v1/dashboard/listoftemplate',
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });
            setLoading(false);
            setSlected(null);
            setListTemplate(res.data.message);
            return true;
            // let mydata = res.data;
            // return mydata;
        } catch (error: any) {

        }
    }
    useEffect(() => {
        loadallgroup();
        listitems();
    }, []);
    return (
        <Layout>
            <Container  >
                <Paper>

                    <Box p={3}>
                        <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                        <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                            {i18n.t('New Product')}
                        </Typography>
                        <Grid container>
                            <Grid md={3}>
                                <Button onClick={(e) => { loaditem() }} className={styles.buttonblack} variant="contained" >
                                    بروزرسانی از نرم افزار
                                </Button>
                            </Grid>
                            <Grid md={3}>
                                <Button onClick={(e) => { listitems() }} className={styles.buttonblack} variant="contained" >
                                    بروز رسانی لیست موقت ها
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            {
                                loading == true && <Box bgcolor={'red'} color={'white'} p={1} m={1} textAlign={'center'}>در حال بروز رسانی</Box>
                            }
                        </Grid>

                        <Grid xs={12} pt={5}>
                            
                            {listemplate != null &&
                                <Box>
                                    <Typography>انتخاب محصول</Typography>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={listemplate}
                                        sx={{ width: '100%' }}
                                        getOptionLabel={(option: any) => option.Name}
                                        onChange={(event, value) => {
                                            ChangeData(value.Name)
                                            setSlected(value);
                                        }} // prints the selected value

                                        renderOption={(props, option: any) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                                {option.Name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="انتخاب محصول"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'محصول', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            }
                        </Grid>
                        <Grid xs={12} md={6} p={1}>
                            <Typography m={1}>{i18n.t('Name')} </Typography>
                            <TextField dir='rtl'
                                value={data.name}
                                onChange={(e) => ChangeData(e.target.value)}
                                className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                        </Grid>
                        <Grid xs={12} md={6} p={1}>
                            <Typography m={1}>{i18n.t('URL')} </Typography>
                            <TextField
                                value={data.url}
                                onChange={(e) => ChangeDataUrl(e.target.value)}
                                dir='rtl' className={styles.myformtextfield} fullWidth id="outlined-basic" variant="outlined" />

                        </Grid>
                    


                 

                    <Typography fontSize={'14px'} mt={4} mb={3} fontWeight={'bold'}>
                        {i18n.t('Select group')}
                    </Typography>
                    {groups != null && keyselectgroup != null &&
                        <Container>
                            <Stack spacing={2}>
                                {/* <Breadcrumbs
                                        separator={<NavigatePrevIcon fontSize="small" />}>
                                        {groups.find((car: any) => car.id == keyselectgroup).ToSub != null &&
                                            groups.find((car: any) => car.id == keyselectgroup).ToSub.ToSub != null &&
                                            groups.find((car: any) => car.id == keyselectgroup).ToSub.ToSub.ToSub != null &&
                                            <Typography>{groups.find((car: any) => car.id == keyselectgroup).ToSub.ToSub.ToSub.name}</Typography>
                                        }                                        {groups.find((car: any) => car.id == keyselectgroup).ToSub != null &&
                                            groups.find((car: any) => car.id == keyselectgroup).ToSub.ToSub != null &&
                                            <Typography>{groups.find((car: any) => car.id == keyselectgroup).ToSub.ToSub.name}</Typography>
                                        }
                                        {groups.find((car: any) => car.id == keyselectgroup).ToSub != null &&
                                            <Typography>{groups.find((car: any) => car.id == keyselectgroup).ToSub.name}</Typography>
                                        }
                                        <Typography>{groups.find((car: any) => car.id == keyselectgroup).name}</Typography>
                                    </Breadcrumbs> */}
                            </Stack>
                        </Container>
                    }

                    {groups != null &&
                        <Grid container dir={'rtl'}>
                            <Grid xs={12} md={3} p={1}>
                                <List
                                    sx={stylemy}
                                    subheader={<li />}
                                >
                                    {groups.map((item: any) => (
                                        item.subgroup == null &&
                                        <ListItem
                                            onClick={(e) => { level1select(item) }}
                                            style={{ backgroundColor: level1 != null ? level1.id == item.id ? 'gray' : 'white' : 'white', cursor: 'pointer', textAlign: 'right' }} key={item.id}>
                                            <ListItemText primary={`${item.name}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            {
                                level1 != null &&
                                <Grid xs={12} md={3} p={1}>
                                    <List
                                        sx={stylemy}
                                        subheader={<li />}
                                    >
                                        {level1.ChildGroup.map((item: any) => (
                                            <ListItem
                                                onClick={(e) => { level2select(item) }}
                                                style={{ backgroundColor: level2 != null ? level2.id == item.id ? 'gray' : 'white' : 'white', cursor: 'pointer', textAlign: 'right' }} key={item.id}>
                                                <ListItemText primary={`${item.name}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            }
                            {
                                level2 != null &&
                                <Grid xs={12} md={3} p={1}>
                                    <List
                                        sx={stylemy}
                                        subheader={<li />}
                                    >
                                        {level2.ChildGroup.map((item: any) => (
                                            <ListItem
                                                onClick={(e) => { level3select(item) }}
                                                style={{ backgroundColor: level3 != null ? level3.id == item.id ? 'gray' : 'white' : 'white', cursor: 'pointer', textAlign: 'right' }} key={item.id}>
                                                <ListItemText primary={`${item.name}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            }
                            {
                                level3 != null &&
                                <Grid xs={12} md={3} p={1}>
                                    <List
                                        sx={stylemy}
                                        subheader={<li />}
                                    >
                                        {level3.ChildGroup.map((item: any) => (
                                            <ListItem
                                                onClick={(e) => { level4select(item) }}
                                                style={{ backgroundColor: level4 != null ? level4.id == item.id ? 'gray' : 'white' : 'white', cursor: 'pointer', textAlign: 'right' }} key={item.id}>
                                                <ListItemText primary={`${item.name}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            }

                        </Grid>
                    }
                    <Grid xs={12} md={12} p={1}>
                        {                        selectedItem != null && <Container >
                            <Button onClick={(e) => { saveitem() }} className={styles.buttonblack} variant="contained" >
                                <img className={styles.m1} src="/assets/successicon.svg"></img>      {i18n.t('Save')}
                            </Button>
                        </Container>
                        }
                        

                    </Grid>

                </Box>
            </Paper>
            {error != null && <ErrorDB key={key} err={error} />}

        </Container>

        </Layout >
    )
}