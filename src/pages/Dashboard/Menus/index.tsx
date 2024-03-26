import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { menuitem } from '@/utils/TopMenuItems';
import { Container, Grid, Card, CardMedia, CardContent, Box, Typography, Link } from "@mui/material";
import i18n from 'i18n';
import  Thumpanilpages  from "@/utils/thumpnailpages";
export default function menus() {
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Menus'

        },

    ]
    return (
        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Menus')}</Typography>

                   


                        <Thumpanilpages name="Menus" ></Thumpanilpages>

                   
    
            </Container>
        </Layout>

    )
}