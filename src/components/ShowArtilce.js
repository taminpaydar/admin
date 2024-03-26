import styles from '../app/Main.module.scss'
import Carousel from 'react-material-ui-carousel'
import { Paper, Box, Grid, Card, CardContent, Typography, Fade } from '@mui/material'
import CarouselElement from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { styled } from '@mui/material/styles';
import {ImageListItem,ImageList,ImageListItemBar } from "@mui/material";
import * as React from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useInView } from 'react-intersection-observer';
import { InView } from 'react-intersection-observer';

import { config } from '@/config';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
export function ShowArtilce({ data, ShowTitle = true,padding=2, Metatag = true, Tags = true, BreadCrump = true }) {

    return (
        <>

            <Grid container>

                {data.tocomponent.map((item, key) => {
                    switch (item.mode) {
                        case 'vtexteditor':
                            return <Grid p={padding} xs={12} md={item.cols}><ArticleShow data={item.data}></ArticleShow></Grid>
                            break;
                        case 'vmovieplayer':
                            return <Grid p={padding} xs={12} md={item.cols}> <VmoviePlayer data={item.data}></VmoviePlayer></Grid>
                            break;
                        case 'vcarousel':
                            return <Grid p={padding} xs={12} md={item.cols}><Vcarsoul data={item.data}></Vcarsoul></Grid>
                            break;
                        case 'vgallery':
                            return <Grid p={padding} xs={12} md={item.cols}><Vgallery data={item.data}></Vgallery></Grid>
                            break;
                        case 'vimage':
                            return <Grid p={padding} xs={12} md={item.cols}><ImageShow data={item}></ImageShow></Grid>
                            break;
                        case 'vprogressbar':
                            return <Grid p={padding} xs={12} md={item.cols}> <VprogressBar data={item.data}></VprogressBar></Grid>
                            break;
                        default: return `<>${item.mode}</>`

                    }
                })}
            </Grid>
        </>
    )
}
function  ImageShow({data}){
    return(
        <>
            {data.wallpaper!=null &&

                <img src={config.url+data.wallpaper.url}  width={'100%'}/>

            }
            {data.data.caption!=null &&
                <ImageListItem>
                <ImageListItemBar  title={data.data.caption} />
                </ImageListItem>
            }

            </>


    )
}
function LineProgress({ data }) {
    const [progress, setProgress] = React.useState(0);
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: data.color,
        },
    }));
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                return Math.min(data.percent, 100);
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <Box>
            <Typography m={2}>{data.title}</Typography>
            <BorderLinearProgress variant="determinate" value={progress} />

        </Box>

    )
}
function VprogressBar({ data }) {


    return (
        <>
            <Typography fontSize={20} fontWeight={'bold'}>{data.progress.title}</Typography>
            <hr />
            {
                data.progress.item != null &&
                data.progress.item.map((i, key) => {
                    return (

                        <>

                            <LineProgress key={key} data={i}></LineProgress>

                        </>


                    )
                })

            }
        </>
    )
}
function Vcarsoul({ data }) {
    return (

        <Carousel>
            {
                data.image != null &&
                data.image.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}
function Vgallery({ data }) {
    return (

        <>
            <CarouselElement responsive={responsive}>
                {data.image.map((item, key) => {
                    return (
                        <Card sx={{ maxWidth: 200 }}>

                            <CardContent>
                                <img width={'100%'} src={`${config.url}${item}`} />

                            </CardContent>
                        </Card>
                    )
                })}

            </CarouselElement>
        </>
    )
}
function Item(props) {
    const [checked, setChecked] = React.useState(false);

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });
    return (
        <InView as="div" onChange={(inView, entry) => setChecked(inView)}>

                <div>
                    <Paper className={styles.bg1}>

                        <img width={'100%'} src={`${config.url}${props.item}`} />

                    </Paper>
                </div>

        </InView>
    )
}
function ArticleShow({ data }) {
    const [checked, setChecked] = React.useState(false);

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });
    return (
        <>
            <InView as="div" onChange={(inView, entry) => setChecked(inView)}>
                <Fade in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 1500 } : {})}
                    unmountOnExit >

                    <div dangerouslySetInnerHTML={{ __html: data.text }} ></div>
                </Fade>
            </InView>
        </>
    )
}
function VmoviePlayer({ data }) {
    const [checked, setChecked] = React.useState(false);

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });
    return (
        <>
            <InView as="div" onChange={(inView, entry) => setChecked(inView)}>

                    <div>
                        {data.movie.model == "aparat" &&

                            <>
                                <div className={styles.videoshow}><span ></span><iframe src={`https://www.aparat.com/video/video/embed/videohash/${data.movie.aparat}/vt/frame`} ></iframe></div>
                            </>
                        }
                    </div>
                    <div>
                        {data.movie.model == "uploadlist" &&

                            <>
                                <video   width="100%" controls>
                                    <source src={config.url+data.movie.url} type="video/mp4" />

                                </video>
                            </>
                        }
                    </div>




            </InView>
        </>
    )
}