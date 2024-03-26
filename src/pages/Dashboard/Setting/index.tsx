import Layout from "@/layouts/dashboardLayout"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import i18n from 'i18n';
import Typography from '@mui/material/Typography';
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { AddNewCard } from "@/components/Dashboard/cardThumpnailGroup";
import  Thumpanilpages  from "@/utils/thumpnailpages";

export default function Aritlcemanager() {
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'Settings',

        }
    ]
    return (

        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>
                <Typography fontSize={'28px'} mt={4} mb={3} fontWeight={'bold'}>  {i18n.t('Setting')}</Typography>
                <Thumpanilpages name="Settings" ></Thumpanilpages>

            </Container>

        </Layout>
    );
}
export function ButtonsSetting(){
    return(
        <Grid container dir="rtl">
        <Grid xs={2} md={2} p={2}>
                <Link underline="none" href="/Dashboard/Setting/General">
                    <Card sx={{ maxWidth: 200 }}>

                        <Box p={4} textAlign={'center'}>
                            <img

                                height="40"
                                src="/assets/settings-svgrepo-com.svg"
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                                {i18n.t('Market Setting')}
                            </Typography>
                        </CardContent>

                    </Card>

                </Link>
            </Grid>
            <Grid xs={2} md={2} p={2}>
                <Link underline="none" href="/Dashboard/Setting/Contactus">
                    <Card sx={{ maxWidth: 200 }}>

                        <Box p={4} textAlign={'center'}>
                            <img

                                height="40"
                                src="/assets/contac-com.svg"
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                                {i18n.t('Contact us')}
                            </Typography>
                        </CardContent>

                    </Card>

                </Link>
            </Grid>
            <Grid xs={2} md={2} p={2}>
                <Link underline="none" href="/Dashboard/Setting/Social">
                    <Card sx={{ maxWidth: 200 }}>

                        <Box p={4} textAlign={'center'}>
                            <img

                                height="40"
                                src="/assets/share-svgrepo-com.svg"
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                                {i18n.t('Social Networks')}
                            </Typography>
                        </CardContent>

                    </Card>

                </Link>
            </Grid>
            <Grid xs={2} md={2} p={2}>
                <Link underline="none" href="/Dashboard/Setting/Market">
                    <Card sx={{ maxWidth: 200 }}>

                        <Box p={4} textAlign={'center'}>
                            <img

                                height="40"
                                src="/assets/market.svg"
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                                {i18n.t('Market Setting')}
                            </Typography>
                        </CardContent>

                    </Card>

                </Link>
            </Grid>
        </Grid>
    )
}