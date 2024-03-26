import Layout from "@/layouts/dashboardLayout"
import i18n from 'i18n';
import Typography from '@mui/material/Typography';
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import  Thumpanilpages  from "@/utils/thumpnailpages";

export default function Galleryemanager() {
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Articles',

        }
    ]
    return (

        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Article Manager')}</Typography>
                <Thumpanilpages name="Gallery" ></Thumpanilpages>

            </Container>

        </Layout>
    );
}