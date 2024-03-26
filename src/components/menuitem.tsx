import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Link, Typography} from '@mui/material';
import { inspect } from "util";
import styles from '../app/Main.module.scss'

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

export function CustomizedMenus({ items }: any) {
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
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                className={styles.menunews}
                disableElevation
                onClick={handleClick}
                dir='rtl'

            >
               <Typography fontSize={12}>  {items.name}</Typography>
            </Button>
            <StyledMenu

                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}

                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    items.subdetail!=null && items.subdetail.map((value: any, key: number) => {
                        return (
                            value.subdetail == undefined || value.subdetail.length == 0 ?
                                   value.mode != "bloggroup" ?

                                <Link color='white' underline={'none'} href={value.url}>
                                    <MenuItem key={key} className={styles.TextRight} dir={'rtl'} disableRipple>
                                       <Typography fontSize={12} color={'black'}>{value.name}</Typography>
                                    </MenuItem>
                                </Link>
                                :
                                <SubmenuItem key={key} items={value}></SubmenuItem>

                                :
                                
                                <CustomizedMenus key={key} items={value}></CustomizedMenus>

                        )
                    })
                }


            </StyledMenu>
        </div>
    );
}

export function SubmenuItem({ items }: any) {
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
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                className={styles.menunews}
                disableElevation
                onClick={handleClick}
                dir='rtl'

       
            >
                <Typography color={'black'} fontSize={12}>

             {items.name}</Typography>
            </Button>
            <StyledMenu

                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}

                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    items.extra.child.map((value: any, key: number) => {
                        return (
                            <Link color='black' underline={'none'} href={`/blog/${value.url}`}>
                                <MenuItem key={key} className={styles.TextRight} dir={'rtl'} disableRipple>
                                  <Typography color={'black'} fontSize={12}> {value.name}</Typography>
                                </MenuItem>
                            </Link>
                        )
                    })
                }


            </StyledMenu>
        </div>
    );
}