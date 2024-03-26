import { Container, Typography } from "@mui/material";
import { config } from "@/config";
import { Chip } from '@mui/material';

export default function ShowImage({ data }: any) {
    return (
        <Container>
            {data.images.length!=0 && <img  title={data.data!=null && data.data.alt} alt={data.data!=null && data.data.alt} src={`${config.url}${data.images[0].url}`} width={'100%'}></img>}
            {data.data!=null && <Chip label={data.data!=null && data.data.caption} ></Chip> }

        </Container>
    )
}