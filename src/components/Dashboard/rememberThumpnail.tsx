import { Box, Container, Typography, Grid, Link, Card } from "@mui/material"
import { TitleThumonail, DesciprtionThumonail, BoxDashboard } from "@/utils/StyleDashboars"
import i18n from 'i18n';

export default function rememberThumpnail({ data }: any) {
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
    return (
        <>
            <Container sx={
                {
                    background: 'linear-gradient(0deg, rgba(186,222,177,0.3169642857142857) 0%, rgba(186,222,177,0.3337710084033614) 100%)',
                    borderRadius: '14px',
                    width: '100%',
                    pb: 2,
                    borderTop:'solid 4px orange'

                }
            }>


                <Box sx={
                    {
                        width: '100%',
                        m: 1,

                    }
                }>
                    <Grid container>
                        <Grid xs={12}>
                           <Box >
                           <Typography sx={TitleThumonail} color={'#333'} pt={2} pb={2}> {i18n.t(data.name)} </Typography>
                           </Box>
                        </Grid>

                    </Grid>
                    <Grid container>
                        {data.sub.map((item: any) => {
                            return (
                                <Grid xs={6} sm={3} p={1}>
                                    <Card  style={{ textAlign: 'center',backgroundColor:'',paddingBottom:"10px" ,borderRadius:'30px'}} >


                                        <Link href={item.url} underline="none">
                                            <Box mt={2} mb={2}>
                                                <img src={item.icon} width={'80px'} style={{ margin: 'auto' }} ></img>

                                            </Box>
                                            <Typography

                                                sx={{
                                                    color: '#7B7B7B',
                                                    fontSize: '14px'
                                                }}>{i18n.t(item.name)}</Typography>
                                        </Link>
                                    </Card>
                                </Grid>
                            )
                        })
                        }

                    </Grid>


                </Box>
            </Container>
        </>
    )
}