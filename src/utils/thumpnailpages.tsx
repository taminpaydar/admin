import { Container, Grid, Card, CardMedia, CardContent, Box, Typography, Link } from "@mui/material";
import i18n from 'i18n';
import { menuitem } from '@/utils/TopMenuItems';

export default function Thumpanilpages({name}:any) {
    return (

        <>
            {
                menuitem.map((item: any) => {

                    return (
                        item.name == name &&

                        <Grid container>
                            { item.sub.map((m:any)=>{
                               return(
                                <Grid xs={6} md={3} p={2}>
                                <Link underline="none" href={m.url}>
                                    <Card sx={{ maxWidth: 345 }}>

                                        <Box p={4} textAlign={'center'}>
                                            <img

                                                height="120"
                                                src={m.icon}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                                                {i18n.t(m.name)}
                                            </Typography>
                                        </CardContent>

                                    </Card>

                                </Link>
                            </Grid>
                               )
                            })}
                            
                        </Grid>

                    )
                })
            }
        </>



    )
}