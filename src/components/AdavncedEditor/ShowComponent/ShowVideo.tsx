import { Container, Typography } from "@mui/material";

export default function VideoShow({ data }: any) {
    return (
        <Container>
            {
            data.data!=null &&
        
            data.data.model == "Aparat" &&
                data.data.link != "" &&
                <iframe
                    width={'100%'}
                    height={400}
                    src={`https://www.aparat.com/video/video/embed/videohash/${data.data.link}/vt/frame?titleShow=true`}

                ></iframe>
            }
            {  data.data!=null && data.data.model == "YouTube" &&
                data.data.link != "" &&
                <iframe width={'100%'}
                    height={400} src={`https://www.youtube.com/embed/${data.data.link}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>

            }

        </Container>
    )
}