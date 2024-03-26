import { Grid, Box, Typography } from "@mui/material";
import i18n from "i18n";
import { YourSubScript, DayLeftText, NumberDayLeft } from "@/utils/StyleDashboars"

export default function DashboardDays() {
    return (
        <>
            <Box>
                {/* <Grid container pt={2} pb={2}>
                    <Grid xs={12} md={4}>
                        <Grid container pl={1}>
                            <Grid xs={10} >
                                <Typography sx={YourSubScript}>{i18n.t('from your subscribte')}</Typography>
                                <Typography

                                    sx={DayLeftText}
                                >{i18n.t('days left')} </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    sx={NumberDayLeft}
                                >34</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid xs={12} md={4}>
                        <Grid container pl={1}>
                            <Grid xs={10} >
                                <Typography sx={YourSubScript}>{i18n.t('Number of authorized contracts')}</Typography>
                                <Typography
                                    sx={DayLeftText}
                                >{i18n.t('Remaining contracts')} </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    sx={NumberDayLeft}
                                >34</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Grid container p={0}>
                            <Grid xs={10} >
                                <Typography sx={YourSubScript}>{i18n.t('The number of signatures')}</Typography>
                                <Typography
                                    sx={DayLeftText}
                                >{i18n.t('Remaining signatures')} </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    sx={NumberDayLeft}
                                >34</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Box>
        </>
    )
}