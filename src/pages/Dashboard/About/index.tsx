import Layout from "@/layouts/dashboardLayout"
import i18n from 'i18n';
import Typography from '@mui/material/Typography';
import { BreadcrumbCom } from "@/components/BreadCrumpCom";
import { Container, Grid, Card, CardMedia, CardContent, Box, Paper } from "@mui/material";
import Thumpanilpages from "@/utils/thumpnailpages";

export default function Aritlcemanager() {
    const breadcrump = [
        {
            name: 'home',
            url: '/Dashboard'
        },
        {
            name: 'About US',

        }
    ]
    return (

        <Layout>
            <Container>
                <BreadcrumbCom data={breadcrump}></BreadcrumbCom>

                <Box mt={5}>
                    <Paper >
                        <Box p={4}>
                            <Box textAlign={'center'}>
                                <img src='/assets/logo.svg' width={'30%'}></img>

                            </Box>
                            <Typography fontSize={12} textAlign={'justify'} dir={'rtl'}>
                                "TISS ENGINE is a user-friendly CMS designed for creating and managing engaging content. With powerful features such as media management, interactive elements, and SEO tools, TISS ENGINE helps you optimize your content for maximum impact. Our flexible and customizable platform allows you to extend the functionality of your CMS and meet your unique needs. Whether you're a small business, large enterprise, or nonprofit organization, TISS ENGINE can help you achieve your content goals. Contact us today to learn more.                        </Typography>

                            <Typography fontSize={12} textAlign={'justify'} dir={'rtl'}>
                                TISS ENGINE© is licensed by Afrang Developer Team and developed by Esmail Poryosef. For more information, please visit our website at www.afrang.dev.

                            </Typography>
                            <Typography fontSize={12} textAlign={'justify'} dir={'rtl'}>
                                <ul>

                                    <strong> TISS ENGINE 2.0 features:</strong>
                                    <li>Changed admin panel from NUXT to NEXT.js</li>
                                    <li>Implemented new API system and improved security</li>
                                    <li>Added new TISS Advanced Editor and Image Uploader system</li>
                                    <li>Updated MongoDB driver to the latest version</li>
                                    <li>Fixed bugs in managing images and articles</li>
                                    <li>Added new product manager and product entry functionality</li>
                                    <li>Updated Express.js router system</li>
                                    <li>Implemented Material UI design system</li>

                                </ul>
                            </Typography>
                            <Typography fontSize={12} textAlign={'justify'} dir={'rtl'}>
                                <p>&copy; 2023 Afrang. All rights reserved.</p>
                                <p>TISS ENGINE &copy; is a proprietary content management system developed by Afrang. The software, design, and all content on the TISS ENGINE website are protected under international copyright laws. Unauthorized use, distribution, or copying of the software, design, or content is strictly prohibited and may result in legal action.</p>
                                <p>Any trademarks, service marks, and logos used in connection with TISS ENGINE are the proprietary marks of Afrang or its licensors. Use of any such marks without the express written consent of Afrang or the trademark owner is strictly prohibited.</p>
                                <p>By using TISS ENGINE, you agree to comply with all copyright laws and other applicable laws and regulations. If you have any questions about the use of TISS ENGINE or its copyright, please contact us at <a href="mailto:afrangart@gmail.com">afrangart@gmail.com</a>.</p>
                            </Typography>
                            <Grid container>
                                <Grid md={1} xs={1}>
                                    <img src='/assets/mongodb-svgrepo-com.svg' width={'50'}></img>
                                </Grid>
                                <Grid md={1} xs={1}>
                                    <img src='/assets/node-js-svgrepo-com (1).svg' width={'50'}></img>
                                </Grid>

                                <Grid md={1} xs={1}>
                                    <img src='/assets/nextjs-svgrepo-com.svg' width={'50'}></img>
                                </Grid>
                                <Grid md={1} xs={1}>
                                    <img src='/assets/express-svgrepo-com.svg' width={'50'}></img>
                                </Grid>
                                <Grid md={1} xs={1}>
                                    <img src='/assets/material-ui-svgrepo-com.svg' width={'50'}></img>
                                </Grid>
                            </Grid>

                        </Box>
                    </Paper>
                </Box>
            </Container>

        </Layout>
    );
}