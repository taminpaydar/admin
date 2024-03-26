import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HeaderProfile from './headerprofile';
import { Menu } from '@mui/icons-material';
import { menuitem } from './TopMenuItems';
import i18n from 'i18n';

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({

        right: false,
    });

    const toggleDrawer =
        (anchor, open) =>
            (event) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event).key === 'Tab' ||
                        (event).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };



    return (
        <div>
            <React.Fragment key={'right'}>
                <Button onClick={toggleDrawer('right', true)}>
                    <Menu></Menu>
                </Button>
                <SwipeableDrawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                    onOpen={toggleDrawer('right', true)}
                >
                    <Box
                        sx={{ width: 280 }}
                        role="presentation"
                        onClick={toggleDrawer('right', false)}
                        onKeyDown={toggleDrawer('right', false)}
                    >
                        <List>
                            <ListItem >
                                <HeaderProfile></HeaderProfile>
                            </ListItem>

                        </List>
                        <Divider />
                        <List dir='rtl'>
                            {menuitem.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <img width={'25px'} src={item.icon}></img>
                                        </ListItemIcon>
                                        <ListItemText style={{ textAlign: 'right' }} primary={i18n.t(item.name)} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}