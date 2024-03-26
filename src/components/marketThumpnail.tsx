import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Star } from '@mui/icons-material';
export default function MultiActionAreaCard({ data }: any) {
    const numbers = [];

    for (let i = 1; i <= data.star; i++) {
        numbers.push(i);
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/noimage.jpg"
                    alt={data.name}
                />
                <CardContent>
                    <Typography>
                        {numbers.map((number) => (
                            <Star htmlColor='gold' />
                        ))}



                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography   >
                        کد : {data.registernumber}

                    </Typography>
                    <Typography fontSize={14} color={'gray'}  >
                        شماره تماس : {data.phone}

                    </Typography>
                    <Typography fontSize={14} color={'gray'}  >
                        منطقه : {data.zone}

                    </Typography>
                    <Typography fontSize={14} color={'gray'}  >
                        حوزه کاری : {data.togroup.name}

                    </Typography>
                    <Typography fontSize={14} color={'gray'}  >
                        مدیریت : {data.touser.name} {data.touser.lastname}

                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href={`/users/${data.id}`}>
                    اطلاعات بیشتر
                </Button>
            </CardActions>
        </Card>
    );
}