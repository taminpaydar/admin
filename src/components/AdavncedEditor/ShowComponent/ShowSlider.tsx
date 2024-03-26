import { Box, Container, Typography } from "@mui/material";
import { config } from "@/config";
import { Chip } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export default function ShowSlider({ data }: any) {
    return (
        <Container>
            {data.images.length != 0 &&
                <Carousel>
                    {
                        data.images.map((item: any, i: any) => <Item key={i} item={item} />)
                    }
                </Carousel>
            }

            {data.data != null && <Chip label={data.data != null && data.data.caption} ></Chip>}

        </Container>
    )
}
export function Item({ item }: any) {
    return (
        <Box>
            <img width={'100%'} height={250} src={`${config.url}${item.url}`} ></img>
        </Box>
    )
}