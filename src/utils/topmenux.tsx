import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import i18n from 'i18n';
import { Stack } from '@mui/material';
import { menuitem } from './TopMenuItems';
export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
   
    return (
        <React.Fragment>
            <Box dir={'rtl'} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: '100%' }}>

                {menuitem.map((item: any) => {
                    return (
                        <Box dir="lrt" ml={0} mr={1} mt={2}>
                            <Link underline='none' href={item.url}>
                                <Stack direction="row" spacing={1} >
                                    <Box m={1}>
                                        <img src={item.icon} width={'22px'} ></img>

                                    </Box>
                                    <Box pt={1.4}>
                                        <Typography fontSize={'14px'} color={'black'}>{i18n.t(item.name)}</Typography>

                                    </Box>



                                </Stack>
                            </Link>
                        </Box>

                    )
                })}


            </Box>

        </React.Fragment>
    );
}