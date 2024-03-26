import { Stack, Box, Typography } from "@mui/material";
import styles from '../app/template.module.scss'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { Logout } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import i18n from "i18n";
import { useState } from "react";

export default function HeaderProfile({data}:any) {
  
    return (
        <>
        
            <Stack direction="row" spacing={2}>
               
                <Box>
                    <Box className={styles.profileimage} textAlign={'center'}  >
                        <Box pt={1}>
                            <img src="/assets/avatar.svg" />
                        </Box>
                    </Box>

                </Box>
                <Box>
                    <CustomizedMenus data={data}></CustomizedMenus>
                    <Box>
                        <Typography textAlign={'right'} color={'gray'} fontSize={'14px'}>{i18n.t('')}</Typography>
                    </Box>
                </Box>

            </Stack>
        </>
    )
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export function CustomizedMenus({data}:any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box

                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}

                onClick={handleClick}
            >
                <Stack direction="row" spacing={1} >
                    <KeyboardArrowDownIcon />
                  {data!=null &&  <Typography>{data.name} {data.lastname}</Typography> }
                   
                </Stack>
            </Box>
            <StyledMenu
            dir="rtl"
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    <Typography> {i18n.t('profile')}</Typography>

                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem onClick={handleClose} disableRipple>
                    <Stack  direction="row" spacing={2}  >
                    <Logout  />
                    <Typography> {i18n.t('exit')}</Typography>
                   
                    </Stack>
                   

                </MenuItem>
            </StyledMenu>
        </div>
    );
}