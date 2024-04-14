import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from '../app/template.module.scss'

import { CircleProfile, InfoTableLeft, InfoTableRight, BoxDashboard } from "./StyleDashboars";
import i18n from "i18n";
import Logo from "../../public/assets/menuboard.svg";

export function PrfileFirstPage({ data }: any) {
    return (
        <>
            <Box >
                <Box mt={3} mb={3} textAlign={'center'} width={'150px'} marginRight={'auto'} marginLeft={'auto'}>
                    <CircularProgressbarWithChildren value={66}

                        styles={{
                            // Customize the root svg element
                            root: {},
                            // Customize the path, i.e. the "completed progress"
                            path: {
                                // Path color
                                stroke: `orange`,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                strokeWidth: '2',
                                strokeDashoffset: '',
                                // Customize transition animation
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                // Rotate the path
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            // Customize the circle behind the path, i.e. the "total progress"
                            trail: {
                                // Trail color
                                stroke: '#fff',
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',
                                // Rotate the trail
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            // Customize the text
                            text: {
                                // Text color
                                fill: '#f88',
                                // Text size
                                fontSize: '13px',
                            },
                            // Customize background - only used when the `background` prop is true
                            background: {
                                fill: '#3e98c7',
                            },
                        }}
                    >
                        <Box sx={CircleProfile} >
                            <Box pt={4}>
                                <img src="/assets/avatar.svg" width={50} />
                            </Box>
                        </Box>

                    </CircularProgressbarWithChildren>

                </Box>
                <Box>
                    <Typography fontSize={23} fontWeight={'bold'} textAlign={'center'}>{`${data.name} ${data.lastname}`}</Typography>
                </Box>

            </Box>
            <Box>
                <Grid container >
                    <Grid xs={12}>
                        <Box mt={3}>
                            <Button fullWidth variant={'contained'} href="/Dashboard/profile" sx={{ backgroundColor: 'orange' }}>ویرایش پروفایل</Button>
                        </Box>
                        <Box mt={1}>
                            <Button fullWidth variant={'outlined'} href="/logout" color={'error'}>خروج</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}