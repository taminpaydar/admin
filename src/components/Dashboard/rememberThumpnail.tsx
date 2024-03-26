import { Box, Container, Typography, Grid, Link } from "@mui/material"
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
                    backgroundColor: '#fff',
                    borderRadius: '14px',
                    width: '100%',
                    pb: 2

                }
            }>


                <Box sx={
                    {
                        width: '100%',
                        m: 1,

                    }
                }>
                    <Grid container>
                        <Grid xs={10}>
                            <Typography sx={TitleThumonail} pt={2} pb={2}>{i18n.t(data.name)} </Typography>

                        </Grid>
                        <Grid xs={2} pt={2}>
                            <img src={data.icon} width={30}></img>
                        </Grid>
                    </Grid>
                    <Grid container>
                        {data.sub.map((item: any) => {
                            return (
                                <Grid xs={6}>
                                    <Link href={item.url} underline="none">
                                        <Typography

                                            sx={{
                                                color: '#7B7B7B',
                                                fontSize: '14px'
                                            }}>{i18n.t(item.name)}</Typography>
                                    </Link>

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