import { Container, Typography } from "@mui/material";

export default function ShowAricle({ data }: any) {
    return (
        <Container dir="rtl">
            <Typography  dangerouslySetInnerHTML={{ __html:data.data }} >
            </Typography>
        </Container>
    )
}