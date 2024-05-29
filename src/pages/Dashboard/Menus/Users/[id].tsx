
import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Box, Button, Container, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import i18n from 'i18n';
import { config } from "@/config";
import axios from "axios";
import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import cookie from "cookie";
import { useSearchParams } from 'next/navigation'
import Swal from "sweetalert2";
type Repo = any;
export default function EditGroup({ current }: any) {
    const [error, setError] = useState<any>(null);

    const [data, setData] = useState<any>(null);
    let cookie = getCookies();

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
    function loadUsers() {
        axios.get(`${config.url}/v1/dashboard/users/${current}`, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setData(res.data.message);
        })
    }
    function save(){
        axios.put(`${config.url}/v1/dashboard/users/${current}`, 
            data,{
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            Swal.fire('دخیره سازی شد')
        })
    }
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
                    <Grid container>
                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>نام</Typography>

                            </Box>

                            <TextField size="small" fullWidth
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                defaultValue={data.name}></TextField>
                        </Grid>
                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>نام خانوادگی</Typography>

                            </Box>

                            <TextField
                                onChange={(e) => setData({ ...data, lastname: e.target.value })}

                                size="small" fullWidth defaultValue={data.lastname}></TextField>
                        </Grid>
                        <Grid xs={6}>
                            <Box p={1}>
                                <Typography fontSize={14}>سمت</Typography>

                            </Box>

                            <Select
                            
                                //usertype
                                defaultValue={data.usertype}
                                onChange={(e) => setData({ ...data, usertype: e.target.value })}

                                size="small" fullWidth dir="rtl">
                                <MenuItem value={1} dir="rtl">ادمین</MenuItem>
                                <MenuItem value={2} dir="rtl">کاربر عادی</MenuItem>
                                <MenuItem value={3} dir="rtl">کاربر نمایندگی</MenuItem>
                                <MenuItem value={4} dir="rtl">فروشنده</MenuItem>

                            </Select>
                        </Grid>
                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>شماره همراه</Typography>

                            </Box>

                            <TextField
                                onChange={(e) => setData({ ...data, mobile: e.target.value })}

                                size="small" fullWidth defaultValue={data.mobile}></TextField>
                        </Grid>
                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>نام کاربری</Typography>

                            </Box>

                            <TextField size="small"
                                onChange={(e) => setData({ ...data, email: e.target.value })}

                                fullWidth defaultValue={data.email}></TextField>
                        </Grid>

                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>ایمیل</Typography>

                            </Box>

                            <TextField size="small"
                                onChange={(e) => setData({ ...data, email2: e.target.value })}

                                fullWidth defaultValue={data.email2}></TextField>
                        </Grid>

                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>کدملی</Typography>

                            </Box>

                            <TextField size="small"
                                onChange={(e) => setData({ ...data, nantionalcode: e.target.value })}

                                fullWidth defaultValue={data.nantionalcode}></TextField>
                        </Grid>
                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>تاریخ تولد</Typography>

                            </Box>

                            <TextField size="small" fullWidth

                                defaultValue={data.birthday}></TextField>
                        </Grid>
                        <Grid xs={12} sm={6} p={1}>
                            <Box p={1}>
                                <Typography fontSize={14}>شغل</Typography>
                            </Box>

                            <TextField size="small"
                                onChange={(e) => setData({ ...data, job: e.target.value })}

                                fullWidth defaultValue={data.job}></TextField>
                        </Grid>
                        <Grid textAlign={'center'} xs={12} pt={4} pb={2}>
                            <Button onClick={(e)=>{save()}} size="small" variant="contained" color="primary">ویرایش</Button>
                        </Grid>
                        <Grid xs={12} >

                            <Typography>آدرس ها</Typography>
                        </Grid>

                    </Grid>
                }
                {data != null &&
                    <Box>
                        <Container>
                            {data.toaddress.map((item: any) => {
                                return (
                                    <Box bgcolor={'#eee'} p={3} mt={2} borderRadius={4} borderBottom={'solid 1px #333'}>
                                        <Grid container>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    <span style={{ color: 'gray' }}>  نام گیرنده :  </span>{item.recivername}  {item.lastnamereciver}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    <span style={{ color: 'gray' }}>   شماره همراه : </span>
                                                    {item.recivermobile}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    <span style={{ color: 'gray' }}> شهر : </span>
                                                    {item.city}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={12}>
                                                <Typography fontSize={14}>
                                                    <span style={{ color: 'gray' }}> آدرس : </span>
                                                    {item.address}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    منطقه : {item.zone}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    پلاک : {item.plaque}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    واحد : {item.unint}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} sm={3}>
                                                <Typography fontSize={14}>
                                                    نقشه : {item.latlng}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} pt={1} textAlign={'center'}>
                                                <Button href={`/Dashboard/Menus/Address/${item.id}`} size="small" variant="contained" color="primary">ویرایش</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                )
                            })}

                        </Container>
                    </Box>
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