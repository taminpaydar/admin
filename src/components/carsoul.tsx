import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Box } from '@mui/material'
import styles from '../app/Main.module.scss'
import { config } from '@/config';
export function CarsoulSlider({ data }: any) {

    return (
        <>
        <div >
            
        <Carousel
        
            fullHeightHover={true}
            indicators={false}
            >
                {
                    data.images.map((item: any, i: Number) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>
           
        </>

    )
}

function Item(props: any) {
    return (
        <Paper className={styles.bg1} >
            <Box >
                <>
                    <div className={styles.slidermr} dangerouslySetInnerHTML={{ __html: props.item.text }} ></div>
                </>
            </Box>
          <img width={'100%'} src={`${config.url}${props.item.url}`} />

        </Paper>
    )
}