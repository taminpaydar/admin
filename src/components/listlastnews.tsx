import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import { Link } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

export default function AlignItemsList({ data }: any) {
    return (
        <Box dir="rtl">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >

                {data.child.map((item: any) => {
                    return <ListItem 
                    component={'a'} href={`/blog/${item.url}`}
                    alignItems="flex-start">
                       
                        <ListItemText
                           
                            sx={{
                                textAlign: 'right',fontSize:'12px',color:'#333'
                            }
                            }
                            primaryTypographyProps={{
                                fontSize: 14,
                              }}
                            primary={item.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item.telegram}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                })}

                <Divider variant="inset" component="li" />


            </List>
        </Box>
    );
}