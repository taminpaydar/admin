import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link, Box, Grid, Button } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Delete, Edit, Folder } from '@mui/icons-material';
import { config } from '@/config';
import { useRouter } from "next/router";

import i18n from 'i18n';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function AddNewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345,border:'dashed 1px lightblue' }}>
      <Box p={8}>

      <CardMedia
        component="img"
        height="125"
        image="/assets/addnew.jpg"
      />
    
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign={'center'}>
          {i18n.t('New')}
        </Typography>
      </CardContent>

    </Card>
  );
}
export function EditCard({ item,deleteItem,changeparent,level }: any) {
  const router = useRouter()

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box p={8}>
        <CardMedia
          component="img"
          height="115"
          image={item.masterimage == null ? "/assets/justify.svg" : `${config.url}${item.masterimage.url}`}
        />
      </Box>
      <CardContent>

        <Grid container>
          <Grid xs={12} pb={3}>
            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
              {item.name}
            </Typography>
          </Grid>
          <Grid xs={4}  textAlign={'center'}>
            <Box onClick={(e)=>{deleteItem(item.id)}}>
            <Delete></Delete>

            </Box>
          </Grid>
          <Grid xs={4}  textAlign={'center'} >
            <Link underline='none' href={`/Dashboard/Articles/Groups/Edit/${item.id}`}>
              <Edit></Edit>
            </Link>
          </Grid>
          <Grid xs={4} textAlign={'center'}>
            {
              level!=2 &&  <Button  onClick={(e)=>{ changeparent(item.id,item) }}  >
              <Folder></Folder>
            </Button>
            }
         
          </Grid>

        </Grid>
      </CardContent>



    </Card>
  );
}