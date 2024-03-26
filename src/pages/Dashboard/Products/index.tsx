import Layout from "@/layouts/dashboardLayout"
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { menuitem } from '@/utils/TopMenuItems';
import { Container, Grid, Card, CardMedia, CardContent, Box, Typography, Link } from "@mui/material";
import i18n from 'i18n';
import  Thumpanilpages  from "@/utils/thumpnailpages";
export default function product() {
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Products'

        },

    ]
    return (
        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Products')}</Typography>

                   


                        <Thumpanilpages name="Products" ></Thumpanilpages>

                   
    
            </Container>
        </Layout>

    )
}