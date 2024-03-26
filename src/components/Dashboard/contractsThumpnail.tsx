import { Box, Container, Link, Typography } from "@mui/material"
import { TitleThumonail, DesciprtionThumonail, BoxDashboard } from "@/utils/StyleDashboars"
export default function constractThumpnail({ data }: any) {
    return (
        <>
            <Container sx={
                {
                    backgroundColor: '#fff',
                    borderRadius: '14px',
                    width: '100%'

                }
            }>


                <Box sx={
                    {
                        p: 1,
                        m: 1,

                    }
                }>


                    <Typography sx={TitleThumonail} pt={2} pb={2}></Typography>

                    <Typography sx={DesciprtionThumonail} mt={1} >
   

                        <Link>
                            <img src="/assets/penedit.svg"></img>

                        </Link>


                    </Typography>

                </Box>
            </Container>
        </>
    )
}