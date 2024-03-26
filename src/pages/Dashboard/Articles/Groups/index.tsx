
import Layout from "@/layouts/dashboardLayout"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import { Button, Grid } from '@mui/material'
import { Container } from "@mui/material";
import { AddNewCard, EditCard } from "@/components/Dashboard/cardThumpnailGroup";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { config } from "@/config"
import axios from "axios"
import { getCookies } from "cookies-next";
import { Refresh, ArrowBack, ArrowForward } from "@mui/icons-material";
import { BreadcrumbCom } from "@/components/BreadCrumpCom";


import { Folder, Add } from "@mui/icons-material";

export default function ArticleGroup() {
    const router = useRouter()
    const [level, setLevel] = useState<any>(1);

    const [error, setError] = useState<any>(null);
    const [groups, setGroups] = useState<any>(null);
    const [parent, setParent] = useState<any>("");
    const [beforeprant, setBefore] = useState<any>('');

    const [keyitem, setItemKey] = useState<any>(1);

    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Articles',
            url: '/Dashboard/Articles'
        },
        {
            name: 'Article Group',
        }
    ]
    let cookie = getCookies();

    const deleteItem = async (id: String) => {

        try {
            let res: any = await axios({
                method: 'delete',
                url: config.url + '/v1/dashboard/bloggroup/' + id,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });

            LoadGroup();

        } catch (error: any) {
            alert('this group have a article');
        }
    }
    const backtomain = async (parent: any, sub: any) => {
        var z = level - 1;
        if(z<0){
            z=1
        }
        setLevel(z);


        await setBefore(sub);
        await setParent(parent);
        var address = `${config.url}/v1/dashboard/bloggroup?parent=${level==1 ?   "": parent}`;
        axios.get(address, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],
            }
        }).then(function (res) {
            setGroups(res.data.message);
            var i = keyitem + 1;
            setItemKey(i);
        })

    }
    const changeparent = async (parent: any, sub: any) => {

        var z = level + 1;
        setLevel(z);

        await setBefore(sub);
        await setParent(parent);
        var address = `${config.url}/v1/dashboard/bloggroup?parent=${parent}`;
        axios.get(address, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],
            }
        }).then(function (res) {
            setGroups(res.data.message);
            var i = keyitem + 1;
            setItemKey(i);
        })

    }
    const backtotop = async () => {
        setParent(beforeprant)
        LoadGroup();

    }
    const LoadGroup = () => {
        console.log(parent);
        let address = '';
        address = `${config.url}/v1/dashboard/bloggroup?parent=${parent}`;
        axios.get(address, {
            headers: {
                Authorization: 'Bearer ' + cookie['token'],

            }
        }).then(function (res) {
            setGroups(res.data.message);
            var i = keyitem + 1;
            setItemKey(i);
        })
    }
    useEffect(() => {
        LoadGroup();
        console.log(groups);
    }, []);
    return <Layout>
        <Container>
            <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
            {level}
            <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>
                <Refresh onClick={() => LoadGroup()}></Refresh>

                {i18n.t('Article Group')}
            </Typography>
            <Grid container key={keyitem}>
                <Grid xs={12} md={12} p={2}>
                    <Link key={keyitem} underline="none" href={parent == null ? `/Dashboard/Articles/Groups/new` : `/Dashboard/Articles/Groups/new?parent=${parent}`}>
                        <Button variant={`outlined`}>
                            <Add></Add> New Group
                        </Button>


                    </Link>


                    {beforeprant != '' &&
                        <Button onClick={(e) => { backtomain(beforeprant.subgroup, beforeprant) }}>
                            <ArrowForward></ArrowForward>
                        </Button>
                    }
                </Grid>


            </Grid>
            <Grid container >
                {
                    groups != null &&
                    groups.map((item: any) => {
                        return (
                            <Grid xs={6} md={3} p={2}>
                                <EditCard changeparent={changeparent} level={level} deleteItem={deleteItem} item={item}></EditCard>

                            </Grid>
                        )
                    })
                }
            </Grid>



        </Container>
    </Layout>
}